import Mock from 'mockjs';
function getLayers() {
  const layers = [
    {
      type: 'group',
      name: '商店',
      faGroup: '',
      quantity: 0,
      children: [
        {
          type: 'layer',
          name: '高级商店',
          faGroup: '商店',
        }
      ],
    },
    {
      type: 'layer',
      name: '高级餐厅',
      faGroup: '',
    },
  ];
  return layers;
}
Mock.mock('http://localhost:3000/getLayers', getLayers); 
