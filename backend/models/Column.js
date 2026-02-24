import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema({
    // main column data
    table : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Table',
        required : true
    },
    columnName : {
        type:String,
        required : true
    },
    
    dataType : {
        type:String,            
        enum : ['string', 'number', 'boolean', 'date'],
        required : true
    },
    constraints : {
        required : {
            type : Boolean,
            default :false,
        },
        unique : {
            type : Boolean,
            default : false
        },
    },

    //for form creation
    inputType : {
        type:String,
        required : true
    },
    label : {
        type:String,
        required : true
    },
},
{timestamps: true}
);

columnSchema.index({ columnName: 1, table: 1 }, { unique: true });

export default mongoose.model("Column", columnSchema);