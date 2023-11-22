import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import validator from "validator";

const userSchema=mongoose.Schema(
    {
        email:{
            type:String,
            required:[true,"email address is required"],
            unique:true,
            trim: true , //to remove white spaces around
            validate: {
                validator: function(value) {
                  return validator.isEmail(value);
                },
                message: props => `${props.value} is not a email!`
              },
        },
        username:{
            type:String,
            required:[true,"please enter username"],
            unique:true,
            trim: true
        },
        password:{
            type:String,
            required:[true,"please enter password"],
            trim: true
        },
        createdAt:{
            type:Date,
            default:new Date()
        }
    }
)

userSchema.pre('save', async function(){
    const hash=await bcrypt.hash(this.password, 12);
    this.password=hash
})


export const User=mongoose.model('User',userSchema);