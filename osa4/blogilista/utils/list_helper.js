const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs
    .map(blog => blog.likes)
    .reduce((sum, blog) => sum+blog, 0)
}
  
module.exports = {
  dummy, totalLikes
}
