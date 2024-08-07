const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog identifier is called \'id\'', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const ids = blogs.map(blog => blog.id)
  const titles = blogs.map(blog => blog.title)

  const blogPromiseArray = ids.map(id => Blog.findById(id))
  const newBlogs = await Promise.all(blogPromiseArray)
  const newTitles = newBlogs.map(blog => blog.title)

  assert.deepStrictEqual(titles, newTitles)
})

test('a new blog can be added', async () => {
  const newBlog = {
    title: "Testi3",
    author: "Mina3",
    url: "www.blogi3.com",
    likes: 300
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogs = response.body.map(b => b.title)

  assert.equal(response.body.length, helper.initialBlogs.length + 1)
  assert(blogs.includes('Testi3'))
})

test('if \'likes\' is empty it is set to zero', async () => {
  const newBlog = {
    title: "Testi3",
    author: "Mina3",
    url: "www.blogi3.com"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const blogs = response.body

    let likes;

    for (x in blogs) {
      if (blogs[x].title == "Testi3") {
        likes = blogs[x].likes
      }
    }

    assert.equal(likes, 0)
})

test('if \'title\' is empty, respond with \'400 Bad Request\'', async () => {
  const newBlog = {
    author: "Mina3",
    url: "www.blogi3.com",
    likes: 300
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    assert.strictEqual(response.status, 400)
})

test('if \'url\' is empty, respond with \'400 Bad Request\'', async () => {
  const newBlog = {
    title: "Testi3",
    author: "Mina3",
    likes: 300
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    assert.strictEqual(response.status, 400)
})

test('deletion of a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAfterDeletion = await helper.blogsInDb()
  const titles = blogsAfterDeletion.map(b => b.title)

  assert.strictEqual(blogsAfterDeletion.length, blogsAtStart.length - 1)
  assert(!titles.includes(blogToDelete.title))

})

test('changing a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToChange = blogsAtStart[0]

  const newBlog = {
    title: blogToChange.title,
    author: blogToChange.author,
    url: blogToChange.url,
    likes: blogToChange.likes + 1
  }

  await api
    .put(`/api/blogs/${blogToChange.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const upDatedBlog = await Blog.findById(blogToChange.id)

  assert.strictEqual(upDatedBlog.likes, blogToChange.likes + 1)
})

describe('when there is initially one user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "alant",
      name: "Alan Turing",
      password: "machine"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})


after(async () => {
    await mongoose.connection.close()
})
