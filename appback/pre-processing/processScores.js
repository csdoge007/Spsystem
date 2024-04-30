import pool from '../config.js';
function solveRent () {
  // 单位: 月/m^2
  const rents = {
    '高淳区': 63.7,
    '建邺区': 126,
    '江宁区': 91.9,
    '溧水区': 45.6,
    '六合区': 52.9,
    '浦口区': 71.1,
    '栖霞区': 117,
    '秦淮区': 204,
    '玄武区': 169,
    '雨花台区': 81.8,
    '鼓楼区': 119,
  };
  const sortedDistricts = Object.keys(rents).sort((a, b) => rents[a] - rents[b]);
  const rentScores =  {};
  sortedDistricts.forEach((district, idx) => {
    rentScores[district] = 100 - idx * 5;
  });
  console.log(rentScores);
}

async function solveCompetitor() {
  const areas = 6587;
  const types = ["摩托车服务","购物服务","道路附属设施","通行设施","医疗保健服务","住宿服务","地名地址信息","汽车销售","风景名胜","汽车服务","餐饮服务","公共设施","交通设施服务","生活服务","金融保险服务","体育休闲服务","商务住宅","事件活动","室内设施","汽车维修","公司企业","政府机构及社会团体","科教文化服务"];
  let pool_client;
  const typeRes = {};
  try {
    pool_client = await pool.connect();
    const query = `
      SELECT COUNT(*) AS count
      FROM njpoi_2020_new WHERE substring(type FROM '([^;]+)') = $1;
    `;
    const resArr = types.map(async (type, idx) => {
      return await pool_client.query(query, [type]);
    })
    const results = await Promise.all(resArr);
    results.forEach((result,idx) => {
      typeRes[types[idx]] = parseInt(result.rows[0].count) / areas;
    });
    console.log(typeRes);
    return typeRes;
  }catch (err) {
    // next(err);
    console.error(err);
  } finally {
    // 无论是正常结束还是异常结束，都释放数据库连接
    if (pool_client) {
        try {
            pool_client.release(); // 释放数据库连接
        } catch (err) {
            console.error('Error releasing pool client:', err);
        }
    }
  }
}

solveRent();
await solveCompetitor();