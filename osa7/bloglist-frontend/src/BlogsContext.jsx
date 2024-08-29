import { createContext, useReducer, useContext } from 'react';

const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const newBlog = action.payload
      return state.concat(newBlog)
    }
    case 'GET':
      return state
  }
}

const BlogsContext = createContext();

export const BlogsContextProvider = (props) => {
  const [blogs, dispatch] = useReducer(blogsReducer, [])

  return (
    <BlogsContext.Provider value={[blogs, dispatch]}>
      {props.children}
    </BlogsContext.Provider>
  )
}

export const useBlogsValue = () => {
  const blogsValueAndDispatch = useContext(BlogsContext)
  return blogsValueAndDispatch[0]
}

export const useBlogsDispatch = () => {
  const blogsValueAndDispatch = useContext(BlogsContext)
  return blogsValueAndDispatch[1]
}

export default BlogsContext