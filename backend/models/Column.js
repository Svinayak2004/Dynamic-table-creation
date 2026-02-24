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
        required : true,
        unique : true
    },
    
    dataType : {
        type:String,
        enum : ['text', 'number', 'boolean', 'date'],
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
    required : {
        type:Boolean,
        defalt : false
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