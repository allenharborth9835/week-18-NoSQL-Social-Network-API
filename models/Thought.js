const {Schema, model} = require('mongoose');

const reactionSchema = new Schema({
  reationId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId() 
  },
  reationBody:{
    type: String,
    required: true,
    trim: true
  },
  username:{
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
},
{
  toJson:{
    virtuals: true
  },
  id: false
})

const thoughtSchema = new Schema({
  thought:{
    type: String,
    required: true,
    min: 1,
    max: 280
  },
  createdAt:{
    type: Date,
    default:  Date.now,
  },
  username:{
    type: String,
    required: true
  },
  reactions: [reactionSchema]
})

thoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length();
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought