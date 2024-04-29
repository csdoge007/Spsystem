// appfront/src/api/api.js
import axiosInstance from './index'

const axios = axiosInstance

export const getBooks = () => {return axios.get(`/api/books/`)}

export const postBook = (bookName, bookAuthor) => {return axios.post(`/api/books/`, {'name': bookName, 'author': bookAuthor})}

export const getPoi = () => axios.get('/');

export const searchPoi = (name) => axios.get('/searchPoi', {
  params: {
    query: name
  }
});

export const boxSelectPoi = (polygon) => axios.post('/boxSelectPoi', { 
  polygon 
});

export const login = (userInfo) => axios.post('/login', {
  userInfo
});

export const pointInfoSub = (pointInfo) => axios.post('/addPoint' ,{
  pointInfo
});

export const getAccessibility = (selectInfo) => axios.get('/getAccessibility', {
  params: {
    ...selectInfo
  }
});

export const getLayers = () => axios.get('/getLayers');
export const getGroups = () => axios.get('/getGroups');
export const addLayer = (layerInfo) => axios.post('/addLayer', {
  layerInfo,
});

export const updateView = (name) => axios.post('/updateView', {
  name,
});
export const getScores = (pointInfo) => axios.get('/getScores', {
  params: {
    ...pointInfo
  }
});