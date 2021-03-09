const mongoose = require('mongoose')
const validator = require('validator')
var employeeSchema = new mongoose.Schema({
    firstname : {
        type:String,
        trim:true,
        required:[true,"Enter the firstname"]
    },
    lastname : {type: String, trim:true},
    email : {
        type: String,
        trim:true,
        required: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error ("Email is inValid")
            }
        }

        // validate(value){
        //     if(value<0){
        //         throw new Error("Check the email you entered")
        //     }
        // }
    },
    phone : {
        type: String,
        required: false,
        validate: /\d{5}([- ]*)\d{6}/
    },
    address: String,
    pancard : {
        type: String,
        trim:true,
        required: [true,"enter the pancard number"]
    },
    cloudinary_id: String,
    basicsalary : {
        type     : Number,
        required : true,
        trim:true,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    da: {
        type     : Number,
        required : true,
        trim:true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    hra : {
        type     : Number,
        required : true,
        trim:true,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    medical : {
        type     : Number,
        required : true,
        trim:true,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    proftax : {
        type     : Number,
        required : true,
        trim:true,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    },
    incometax : {
        type: Number,
        enum: [10, 20, 30],
        required : true
    },
    providentfund : {
        type     : Number,
        required : true,
        trim:true,
        validate : {
          validator : Number.isInteger,
          message   : '{VALUE} is not an integer value'
        }
    }
})

module.exports = mongoose.model('Employee',employeeSchema)