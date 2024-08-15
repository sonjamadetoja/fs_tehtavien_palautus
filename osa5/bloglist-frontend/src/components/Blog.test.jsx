import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Blog component renders blog title', () => {
  const testBlog = {
    title: 'Test Blog Name',
    author: 'Test Blog Author',
    url: 'www.blogi3.com',
    likes: 300,
    user: { username: 'testuser' }
  }

  const testUser = { username: 'testuser' }

  render(<Blog blog={testBlog} user={testUser} />)

  const element = screen.getByText('Test Blog Name', { exact: false })
  expect(element).toBeDefined()
})