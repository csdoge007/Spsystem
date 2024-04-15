import Mock from 'mockjs';
function getLayers() {
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
      type: 'pointLayer',
      name: '高级餐厅',
      // faGroup: '',
      quantity: 0,
      children: [],
    },
  ];
  return layers;
}
function getGroups() {
  const groups = [];
  return groups;
};
Mock.mock('http://localhost:3000/getLayers', getLayers); 
Mock.mock('http://localhost:3000/getGroups', getGroups);