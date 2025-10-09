import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomId:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: {
        type: String, 
        trim: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.Mixed, 
        ref: "User"
    },
    participants: [{ 
        type: mongoose.Schema.Types.Mixed,
        ref: "User"
    }],
    videoUrl: { 
        type: String, 
        default: "" 
    },
    isPrivate: { 
        type: Boolean, 
        default: false 
    },
    roomPassword: {
        type: String,
        required: function () {
            return this.isPrivate;
        },
    },
}, {timestamps: true});

const CreateRoom = mongoose.model('Room', roomSchema);

export default CreateRoom;