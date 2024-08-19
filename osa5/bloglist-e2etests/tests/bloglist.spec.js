
const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith } from './helper'

const username = 'mluukkai'
const password = 'salainen'

describe('Bloglist', () => {
  beforeEach(async ({ page, request}) => {
    const response = await request.post('http://localhost:3003/api/testing/reset')
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
})
