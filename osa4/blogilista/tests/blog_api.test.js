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

test.only('blog identifier is called \'id\'', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  const ids = blogs.map(blog => blog.id)
  const titles = blogs.map(blog => blog.title)

  const blogPromiseArray = ids.map(id => Blog.findById(id))
  const newBlogs = await Promise.all(blogPromiseArray)
  const newTitles = newBlogs.map(blog => blog.title)

  assert.deepStrictEqual(titles, newTitles)
})

after(async () => {
    await mongoose.connection.close()
})