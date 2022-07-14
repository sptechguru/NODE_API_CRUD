// const  data = require('./src/routes/student')
const option = {

    definitions:{
        info:{
            title:"Swagger Api Deocumentaion for CRUD API For Node js",
            description:"Demo for the swagger in Exsting Express with open Api",
            version:"1.0.0",
        }
    },

    apis:["./src/routes/student"]
    
}

module.exports = option;