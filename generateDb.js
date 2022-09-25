const SequelizeAuto = require('sequelize-auto');
const Sequelize = require('sequelize');

// const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize(
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
const options = { caseFile: 'l', caseModel: 'p', caseProp: 'c' };

const auto = new SequelizeAuto(sequelize, null, null, options);
auto.run();