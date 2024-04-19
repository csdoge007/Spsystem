import Mock from 'mockjs';
const layers = [
  // {
  //   type: 'group',
  //   name: '商店',
  //   faGroup: '',
  //   quantity: 1,
  //   children: [
  //     {
  //       type: 'pointLayer',
  //       name: '高级商店',
  //       faGroup: '商店',
  //       quantity: 0,
  //       children: [],
  //     }
  //   ],
  // },
  {
    type: 'point',
    name: '高级餐厅',
    group: ' ',
    quantity: 0,
    children: [],
  },
];
// function getLayers() {
//   return layers;
// }
function getGroups() {
  const groups = [];
  return groups;
};
function addLayer(req) {
  const { layerInfo } = JSON.parse(req.body);
  layers.push(layerInfo);
  console.log(layerInfo);
}
// Mock.mock('http://localhost:3000/getLayers', getLayers); 
Mock.mock('http://localhost:3000/getGroups', getGroups);
Mock.mock('http://localhost:3000/addLayer', addLayer);