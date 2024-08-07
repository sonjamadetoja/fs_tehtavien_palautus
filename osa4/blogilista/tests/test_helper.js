const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "Testi1",
    author: "Mina1",
    url: "www.blogi1.com",
    likes: 100
  },
  {
    title: "Testi2",
    author: "Sina2",
    url: "www.blogi2.com",
    likes: 200
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}