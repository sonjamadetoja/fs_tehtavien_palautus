const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs
    .map(blog => blog.likes)
    .reduce((sum, blog) => sum+blog, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    let mostLikes = 0
    let biggest;
    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > mostLikes) {
            mostLikes = blogs[i].likes
            biggest = blogs[i]
        }
    }
    const result = 
    {
        title: biggest.title,
        author: biggest.author,
        likes: biggest.likes
    }
    return result
}
  
module.exports = {
  dummy, totalLikes, favoriteBlog
}
