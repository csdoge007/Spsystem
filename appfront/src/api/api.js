// appfront/src/api/api.js
import axiosInstance from './index'

const axios = axiosInstance

export const getBooks = () => {return axios.get(`http://localhost:3000/api/books/`)}

export const postBook = (bookName, bookAuthor) => {return axios.post(`http://localhost:3000/api/books/`, {'name': bookName, 'author': bookAuthor})}

export const getPoi = () => axios.get(`http://localhost:3000/`);
