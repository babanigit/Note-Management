import mongoose, { InferSchemaType, Schema } from "mongoose";
// import jwt from "jsonwebtoken";

const noteSchema= new mongoose.Schema({
    userId:{
        type:Schema.Types.ObjectId,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    text:{
        type:String,
        require:true
    },
    // passwd:{
    //     type:String,
    //     require:true
    // },

    // cPasswd:{
    //     type:String,
    //     require:true
    // },

},{
    timestamps:true,
})

type Note= InferSchemaType<typeof noteSchema>;

// // generate token
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


const User = mongoose.model<Note>("notesData",noteSchema);

export default User;