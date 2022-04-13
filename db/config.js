const {database,user,host,dbport,dialect,password} = process.env
module.exports = {
    connection:{
        database,
        user,
        host,
        port:dbport,
        password,
        dialect
    }
}