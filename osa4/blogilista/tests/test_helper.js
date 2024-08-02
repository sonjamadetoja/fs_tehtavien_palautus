const Blog = require('../models/blog')

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

module.exports = {
    initialBlogs
}