import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const testBlog = {
  title: 'Test Blog Name',
  author: 'Test Blog Author',
  url: 'www.blogi3.com',
  likes: 300,
  user: { username: 'testuser', name: 'User Name' },
};

const testUser = { username: 'testuser' };

const mockHandler = vi.fn();

let container;

beforeEach(() => {
  container = render(
    <Blog blog={testBlog} increaseLikes={mockHandler} user={testUser} />,
  ).container;
});

test('Blog component renders blog title', () => {
  const title = screen.getByText('Test Blog Name', { exact: false });
  expect(title).toBeDefined();
});

test('at the start url, likes and user are not displayed', () => {
  const div = container.querySelector('.togglableDetails');
  expect(div).toHaveStyle('display: none');
});

test('clicking the view-button shows url, likes and user', async () => {
  const user = userEvent.setup();
  const button = screen.getByText('view');
  await user.click(button);

  const div = container.querySelector('.togglableDetails');
  expect(div).not.toHaveStyle('display: none');
});

test('clicking the like button twice alls the event handler twice', async () => {
  const user = userEvent.setup();
  const button = screen.getByText('like');

  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
