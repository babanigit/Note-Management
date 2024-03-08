

import mongoose from "mongoose";
const jwt =require("jsonwebtoken");



const userSchema= new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    passwd:{
        type:String,
        require:true
    },

    cPasswd:{
        type:String,
        require:true
    },

},{
    timestamps:true,
})

// // generate token   '
// userSchema.methods.generateToken=async function () {

//     const accessToken = jwt.sign(
//           {
//             user: {
//               name: user.name,
//               email: user.email,
//               userId: user._id.toString(),
//             },
//           },
//           process.env.ACCESS_TOKEN_SECRET!,
//           { expiresIn: "20d" }
//         );
    

//     return
// }



const User = mongoose.model("User",userSchema)
export default User;