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

export const deleteLayer = (layerName) => axios.delete('/deleteLayer', {
  params: {
    layerName,
  }
});

export const reLayerName = (layerInfo) => axios.put('/reLayerName', {
  layerInfo,
});

export const registerUser = (userInfo) => axios.post('/registerUser', {
  userInfo,
});

export const getThermalData = (boxInfo, type, radius) => axios.post('/getThermalData', {
  boxInfo,
  type,
  radius,
})

export const deletePoint = (pointInfo) => axios.delete('/deletePoint', {
  params: {
    pointInfo,
  }
});

export const getNewLayers = () => axios.get('/getNewLayers');

export const getTotal = () => axios.get('/getTotal');

export const getCurrentItems = (itemInfo)  => axios.get('/getCurrentItems', {
  params: {
    itemInfo,
  }
});

export const getEditData = () => axios.get('/getEditData');

export const updateLayerData = (layerData) => axios.post('/updateLayerData', {
  layerData,
});

export const deleteNewLayer = (layerName) => axios.delete('/deleteNewLayer', {
  params: {
    layerName,
  }
});

export const getUserInfo = () => axios.get('/getUserInfo');

export const updateUserInfo = (userInfo) => axios.put('/updateUserInfo', {
  userInfo
});

export const getUserName = () => axios.get('/getUserName');