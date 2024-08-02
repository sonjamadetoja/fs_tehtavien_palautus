const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const { config } = require('dotenv')

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

after(async () => {
    await mongoose.connection.close()
})