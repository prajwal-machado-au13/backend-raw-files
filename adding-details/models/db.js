const mongoose = require('mongoose')
const dbURL = 'mongodb+srv://admin:admin@cluster0.bbmdu.mongodb.net/adding-details?retryWrites=true&w=majority'

mongoose.connect(dbURL,{ useNewUrlParser: true,  useUnifiedTopology: true  },(err)=>{
    if(!err) {
        console.log("Connected to mongodb")
    }
    else {
        console.log('Error in connection : '+err)
    }
})

require('./Employee')