import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('blogform calls addBlog with correct information', async () => {
  const user = userEvent.setup();
  const addBlog = vi.fn();

  const { container } = render(<BlogForm addBlog={addBlog} />);

  const titleInput = container.querySelector('#title-input');
  const authorInput = container.querySelector('#author-input');
  const urlInput = container.querySelector('#url-input');
  const saveButton = screen.getByText('save');

  await user.type(titleInput, 'Test Title Input');
  await user.type(authorInput, 'Test Author Input');
  await user.type(urlInput, 'Test Url Input');
  await user.click(saveButton);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe('Test Title Input');
  expect(addBlog.mock.calls[0][0].author).toBe('Test Author Input');
  expect(addBlog.mock.calls[0][0].url).toBe('Test Url Input');
});
