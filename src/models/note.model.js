import mongoose from "mongoose"



const noteSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true, "Title is required"],
        trim : true,
        maxlength : [100, "Title cannot exceed 100 characters"]
    },
    content : {
         type : String,
        required : [true, "Content is required"],
        trim : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }
},
{
    timestamps : true
})

noteSchema.index({ user : 1 , createdAt : -1})

const Note = mongoose.model("Note", noteSchema)

export default Note