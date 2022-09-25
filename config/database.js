const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
  'u610117377_mestri_demo',
  // 'manthan',
  // 'admin1234',
  'u610117377_Manthansutar99',
  'Mdev932942$',
  {
    host: 'manthansutar.in',
    logging: false,
    dialect: 'mysql'
  });


  // sequelize-auto -o "./models" -d u610117377_mestri_demo -h manthansutar.in -u u610117377_Manthansutar99 -p 5432 -x Mdev932942$ -e mysql
