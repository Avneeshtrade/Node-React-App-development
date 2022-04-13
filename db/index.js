// $ npm install sequelize pg
const fs = require('fs');
const Sequelize = require('sequelize');
const {connection} = require('./config');
const MediaFile = require('./mediafile');
// const User = require('./mediafile');


const sequelize = new Sequelize({
  database: connection.database,
  username: connection.user,
  host: connection.host,
  port: connection.port,
  password: connection.password,
  dialect: connection.dialect,
//   operatorsAliases: false
});


const mediaFile = MediaFile(sequelize,Sequelize);

const db = {
    Sequelize,
    sequelize,
    MediaFile:mediaFile
}
sequelize.sync({force:false}).then(async (model) =>{
    console.log("database is in sync now");
    let res = await db.MediaFile.findOne({
        where:{
            title:'Sri Valli Song'
        }
    });
    if(!res){
        db.MediaFile.create({
            title:'Sri Valli Song',
            image:fs.readFileSync(`D:\\noderolebasedauth\\chat-server\\public\\files\\vediotest.mp4`)
        })
    }
    
}).catch(err=>{
console.log("Unable to sync with model"+err);
});

module.exports = db