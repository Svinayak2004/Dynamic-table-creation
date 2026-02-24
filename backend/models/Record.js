import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    table : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Table',
        required : true
    },
    
    data : {
        type:mongoose.Schema.Types.Mixed,
        required : true
    },
},
{timestamps: true}
);

export default mongoose.model("Record", recordSchema);