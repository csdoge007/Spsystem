export default [
  {
    url: "/api/getGroups",
    method: "get",
    statusCode: 200,
    response: () => {
      return  ["tom", "jerry"];
    }
  },
  {
    url: '/api/getGroupsData',
    method: 'get',
    statusCode: 200,
    response: () => {
      return   [
        {
            id: 1,
            isFile: true,
            groupName: '栖霞区餐饮',
            isCollapse: false,
            quantity: 2,
            children: [
              {
                id: 2,
                isFile: true,
                groupName: '仙林大学城餐厅',
                isCollapse: false,
                quantity: 2,
                children:[
                  {
                    id: 4,
                    isFile: true,
                    groupName: '南邮餐厅',
                    isCollapse: false,
                    quantity: 0,
                    children: [],
                  },
                  {
                    id: 5,
                    isFile: true,
                    groupName: '南财餐厅',
                    isCollapse: false,
                    quantity: 0,
                    children: [],
                  }
                ],
              },
              {
                id: 3,
                isFile: false,
                isCollapse: true,
                quantity: 1,
                items: [
                  {
                    id: 1001,
                    name: '栖霞区奶茶店',
                    type: 'point',
                    group_name: '栖霞区餐饮',
                    children: [
                      {
                        title: '栖霞奶茶店1号',
                        address: '',
                        category: '餐饮服务',
                        corporation: '易图',
                        description: '',
                        id: 2001,
                        isupload: false,
                        layer: '栖霞区奶茶店',
                        locationx: '118.910725',
                        locationy: '32.1129836',
                      },
                      {
                        title: '栖霞奶茶店2号',
                        address: '',
                        category: '餐饮服务',
                        corporation: '易图',
                        description: '',
                        id: 2002,
                        isupload: false,
                        layer: '栖霞区奶茶店',
                        locationx: '118.910736',
                        locationy: '32.1129829',
                      },
                    ],
                    isviewed: true,
                    quantity: 2,
                  }
                ],
              }
            ],
          },
        ];;
    }
  }
];