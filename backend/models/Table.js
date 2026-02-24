import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    tableName : {
        type:String,
        required : true,
        unique : true 
    },
    description : {
        type:String,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
},
{timestamps: true}
);

export default mongoose.model("Table", tableSchema);