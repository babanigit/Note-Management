import mongoose,{InferSchemaType,model,Schema} from "mongoose";
const jwt =require("jsonwebtoken");

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    passwd:{
        type:String,
        require:true
    },

    // cPasswd:{
    //     type:String,
    //     require:true
    // },

},{
    timestamps:true,
})

type user= InferSchemaType<typeof userSchema>;


const User = mongoose.model<user>("UserData",userSchema)
export default User;