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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    
    const authorMultiples = blogs.map(blog => blog.author)
    const authors = authorMultiples.reduce((acc, current) => {
        return {...acc, [current]: (acc[current] || 0) + 1}
    }, {})
    const authorMostProductive = Object.keys(authors).reduce((a, b) => {
        return authors[a] > authors[b]
        ? a
        : b
    }, '')
    const result = {
        author: authorMostProductive,
        blogs: authors[authorMostProductive]
      }
    return result
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return undefined
    }
    const authorMultiplesAndLikes = blogs.map(blog => {author: blog.author; likes: blog.likes})
    const authors = blogs.reduce((acc, current) => {

        return {...acc, [current.author]: (acc[current.author] || 0) + current.likes}
    }, {})
    const authorMostLiked = Object.keys(authors).reduce((a, b) => {
        return authors[a] > authors[b]
        ? a
        : b
    }, '')
    const result = {
        author: authorMostLiked,
        likes: authors[authorMostLiked]
      }
    return result
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}