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
solveRent();
