// appfront/src/api/api.js
import axiosInstance from './index'

const axios = axiosInstance

export const getBooks = () => {return axios.get(`http://localhost:3000/api/books/`)}

export const postBook = (bookName, bookAuthor) => {return axios.post(`http://localhost:3000/api/books/`, {'name': bookName, 'author': bookAuthor})}

export const getPoi = () => axios.get('http://localhost:3000/');

export const searchPoi = (name) => axios.get('http://localhost:3000/searchPoi', {
  params: {
    query: name
  }
});

export const boxSelectPoi = (polygon) => axios.post('http://localhost:3000/boxSelectPoi', { 
  polygon 
});

export const login = (userInfo) => axios.post('http://localhost:3000/login', {
  userInfo
})
