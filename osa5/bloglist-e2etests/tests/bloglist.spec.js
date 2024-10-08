
const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith, addNewBlog } from './helper'

const username = 'mluukkai'
const password = 'salainen'

describe('Bloglist', () => {
  beforeEach(async ({ page, request}) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: username,
        password: password
      }
    })

    await page.goto('http://localhost:5174')
  })

  test('Login form is shown', async ({ page }) => {
    const locatorPageTitle = await page.getByText('Log in to application')
    const locatorUsernameBox = await page.getByTestId('username')
    const locatorPasswordBox = await page.getByTestId('password')
    const locatorLoginButton = await page.getByRole('button', { name: 'login' })

    await locatorPageTitle.waitFor()
    await locatorUsernameBox.waitFor()
    await locatorPasswordBox.waitFor()
    await locatorLoginButton.waitFor()

    expect(locatorPageTitle).toBeVisible()
    expect(locatorUsernameBox).toBeVisible()
    expect(locatorPasswordBox).toBeVisible()
    expect(locatorLoginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, username, password)
      await expect(page.getByText('Matti Luukkainen is logged in.')).toBeVisible()
    })

    test('fails with wrong username', async ({ page }) => {
      await loginWith(page, 'mluu', password)

      const notificationDiv = await page.locator('.notification')
      await expect(notificationDiv).toContainText('Login failed. Wrong password or username.')
      await expect(notificationDiv).toHaveCSS('border-style', 'solid')

      await expect(page.getByText('Matti Luukkainen is logged in.')).not.toBeVisible()
    })

    test('fails with wrong password', async ({ page }) => {
      await loginWith(page, username, 'salai')

      const notificationDiv = await page.locator('.notification')
      await expect(notificationDiv).toContainText('Login failed. Wrong password or username.')
      await expect(notificationDiv).toHaveCSS('border-style', 'solid')

      await expect(page.getByText('Matti Luukkainen is logged in.')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, username, password)
    })
    test('a new blog can be created', async ({ page }) => {
      await addNewBlog(page, 'Do Dolphins Give Each Other… Names?', 'Arik Kershenbaum', 'https://lithub.com/do-dolphins-give-each-other-names/')

      const notificationDiv = await page.locator('.notification')
      await expect(notificationDiv).toContainText('You successfully added blog Do Dolphins Give Each Other… Names?')

      const blogDiv = await page.locator('.blogInfo')
      await expect(blogDiv).toContainText('Do Dolphins Give Each Other… Names? Arik Kershenbaum')

    })

    describe('And a blog has been added', () => {
      beforeEach(async ({ page }) => {
        await addNewBlog(page, 'Do Dolphins Give Each Other… Names?', 'Arik Kershenbaum', 'https://lithub.com/do-dolphins-give-each-other-names/')
      })

      test('Blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        const detailDiv = await page.locator('.togglableDetails')
        await expect(detailDiv).toContainText('likes 0')
        await page.getByRole('button', { name: 'like' }).click()
        await expect(detailDiv).toContainText('likes 1')
      })

      test('Blog can be removed by user who added it',  async ({ page }) => {
        const blogDiv = await page.locator('.loggedIn')
        await expect(blogDiv).toContainText('Do Dolphins Give Each Other… Names? Arik Kershenbaum')
        await page.getByRole('button', { name: 'view' }).click()
        await page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(blogDiv).not.toContainText('Do Dolphins Give Each Other… Names? Arik Kershenbaum')
      })

      test('Remove button not visible to other users',  async ({ page, request }) => {
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Another User',
            username: 'another',
            password: 'another'
          }
        })
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'another', 'another')
        const blogDiv = await page.locator('.loggedIn')
        await expect(blogDiv).toContainText('Do Dolphins Give Each Other… Names? Arik Kershenbaum')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
    })
  })
})
