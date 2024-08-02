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
  const hasIds = []
  blogs.forEach((blog) => {hasIds.push(Object.keys(blog).includes('id'))})
  const trueArr = new Array(blogs.length).fill(true);
  assert.deepStrictEqual(hasIds, trueArr)
})

after(async () => {
    await mongoose.connection.close()
})