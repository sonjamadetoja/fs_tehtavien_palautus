
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Bloglist', () => {
  beforeEach(async ({ page, request}) => {
    const response = await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
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
    expect(locatorPageTitle).toBeVisible()
    expect(locatorUsernameBox).toBeVisible()
    expect(locatorPasswordBox).toBeVisible()
    expect(locatorLoginButton).toBeVisible()
  })
})