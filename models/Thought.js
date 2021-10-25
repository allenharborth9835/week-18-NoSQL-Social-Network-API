const {Schema, model, Types} = require('mongoose');

//reaction schema that sets up a reaction
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId() 
  },
  reactionBody:{
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
    get: createdAtVal => dateFormat(createdAtVal)
  }
},
{
  toJSON:{
    getters: true
  },
  id: false
})

//thought schema that sets up a thought
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
    get: createdAtVal => dateFormat(createdAtVal)
  },
  username:{
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
  toJson:{
    virtuals: true,
    getters: true
  },
  id: false
})

//sets up a reaction count for thoughts
thoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length();
});

//sets up thought model and exports it
const Thought = model("Thought", thoughtSchema);
module.exports = Thought