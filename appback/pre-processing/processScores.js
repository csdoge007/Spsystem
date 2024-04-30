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

async function solveTraffic() {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
      SELECT DISTINCT fclass
      FROM traffic;
    `;
    const result = await pool_client.query(query);
    console.log(result.rows.length, result.rows);
    
    const streetClass = {
      'footway': 1,
      'cycleway': 1,
      'track': 1,
      'path': 1,
      'bridleway': 1,
      'steps': 1,
      'unclassified': 1,
      'unknown': 1,
      'residential': 3,
      'living_street': 3,
      'primary': 5,
      'secondary': 5,
      'tertiary': 5,
      'motorway': 7,
      'trunk': 7,
      'motorway_link': 7,
      'trunk_link': 7,
      'primary_link': 7,
      'secondary_link': 7,
      'tertiary_link': 7,
    };
    const query2 = `
      SELECT COUNT(*) AS count
      FROM traffic WHERE fclass = $1;
    `;
    const queryArr = Object.keys(streetClass).map(type => {
      return pool_client.query(query2, [type]);
    });
    const results = await Promise.all(queryArr);
    console.log(results.map(item => item.rows[0].count));
    const quantitys = [
      '4617', '328',  '326',       
      '662',  '3',    '393',       
      '3189', '52',   '5068',      
      '905',  '1993', '2938',      
      '5012', '1419', '1444',      
      '1314', '888',  '378',       
      '291',  '368',
    ];
    const streetQuantitys = {
      footway: '4617',
      cycleway: '328',
      track: '326',
      path: '662',
      bridleway: '3',
      steps: '393',
      unclassified: '3189',        
      unknown: '52',
      residential: '5068',
      living_street: '905',        
      primary: '1993',
      secondary: '2938',
      tertiary: '5012',
      motorway: '1419',
      trunk: '1444',
      motorway_link: '1314',       
      trunk_link: '888',
      primary_link: '378',
      secondary_link: '291',       
      tertiary_link: '368',
    };
    Object.keys(streetClass).forEach((type,idx) => {
      streetQuantitys[type] = quantitys[idx];
    });
    console.log(streetQuantitys);
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

function calTraffic() {
  const streetQuantitys = {
    footway: '4617',
    cycleway: '328',
    track: '326',
    path: '662',
    bridleway: '3',
    steps: '393',
    unclassified: '3189',        
    unknown: '52',
    residential: '5068',
    living_street: '905',        
    primary: '1993',
    secondary: '2938',
    tertiary: '5012',
    motorway: '1419',
    trunk: '1444',
    motorway_link: '1314',       
    trunk_link: '888',
    primary_link: '378',
    secondary_link: '291',       
    tertiary_link: '368',
  };
  const streetDensity = {
    footway: 0.7009260664946106, 
    cycleway: 0.049795050857750114,
    track: 0.0494914224988614,   
    path: 0.10050098679216639,   
    bridleway: 0.0004554425383330803,
    steps: 0.05966297252163352,  
    unclassified: 0.4841354182480644,
    unknown: 0.007894337331106725,
    residential: 0.769394261424017,
    living_street: 0.1373918323971459,
    primary: 0.3025656596326097, 
    secondary: 0.44603005920752997,
    tertiary: 0.7608926673751328,
    motorway: 0.21542432063154698,
    trunk: 0.219219675117656,    
    motorway_link: 0.19948383178988918,
    trunk_link: 0.13481099134659177,
    primary_link: 0.057385759829968117,
    secondary_link: 0.04417792621830879,
    tertiary_link: 0.055867618035524515,
  };
  // Object.keys(streetQuantitys).forEach(type => {
  //   streetDensity[type] = parseInt(streetQuantitys[type]) / 6587;
  // })
  const streetClass = {
    'footway': 1,
    'cycleway': 1,
    'track': 1,
    'path': 1,
    'bridleway': 1,
    'steps': 1,
    'unclassified': 1,
    'unknown': 1,
    'residential': 3,
    'living_street': 3,
    'primary': 5,
    'secondary': 5,
    'tertiary': 5,
    'motorway': 7,
    'trunk': 7,
    'motorway_link': 7,
    'trunk_link': 7,
    'primary_link': 7,
    'secondary_link': 7,
    'tertiary_link': 7,
  };
  const density = Object.keys(streetClass).reduce((prev, cur) => {
    return prev + streetClass[cur] * streetDensity[cur];
  }, 0);
  console.log(density);
  return density; //18.20525277060878
  // console.log(streetDensity);
}

async function traffic() {
  let pool_client;
  try {
    pool_client = await pool.connect();
    const query = `
    SELECT COUNT(*) AS count
    FROM traffic
    WHERE fclass='trunk' OR fclass='primary';
    `;
    const { rows } = await pool_client.query(query);
    console.log('qu', rows[0].count);
  } catch (err) {
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
// await solveCompetitor();
// await solveTraffic();
calTraffic();
await traffic();