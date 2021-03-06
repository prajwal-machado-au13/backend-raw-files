const mongoose = require('mongoose')

var employeeSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true
    },
    lastname : {
        type:String,
        required:true
    },
    email : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required:true
    },
    address: String,
    pancard : {
        type: String,
        required: true
    },
    cloudinary_id: String,
    basicsalary : {
        type: Number,
        required: true,
    },
    da: {
        type: Number,
        required: true,
    },
    hra : {
        type: Number,
        required: true
    },
    medical : {
        type : Number,
        required: true
    },
    proftax : {
        type: Number,
        required: true,
    },
    incometax : {
        type: Number,
        enum: [10, 20, 30],
        required : true
    },
    providentfund : {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Employee',employeeSchema)