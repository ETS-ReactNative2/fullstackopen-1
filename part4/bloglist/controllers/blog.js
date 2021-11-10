const express = require('express')
require('express-async-errors')
const Blog = require('../models/blog')

const blogsRouter = express();

blogsRouter.get('/', async (request, response,next) => {
/*Blog.find({})
    .then(blogs => {
      response.status(200).json(blogs)
    })
    .catch(error => next(error))
*/
console.log("get request")
  try{
      const blogs = await Blog.find({})
      if (blogs)
        response.status(200).json(blogs)
    } catch(exception) {
      next(exception)
    }
})

/*
blogsRouter.get('/:id', async (request, response, next) => {
  console.log("get id request")
  try{        
      const blog = await Blog.findById(request.params.id)        
      if (blog)
      response.status(200).json(blog)  
    } catch(exception) {
      next(exception)
    }    
})

*/
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  console.log("post request")
  const blog = new Blog(request.body)
  try{      
      const blogSave = await blog.save()
      console.log("blog.id: ", blogSave.id)
      if (blogSave) 
        response.status(201).json(blogSave)
    } catch(exception) {
      next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
  console.log("put id request")
  try {
    await Blog.findByIdAndUpdate(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    console.log("delete api")
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter