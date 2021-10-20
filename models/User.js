const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username:{
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  },
  thoughts:[
    {
      type: Schema.Types.ObjectId,
      ref: "Thought"
    }
  ],
  freinds: [],
},
{
  toJSON:{
    virtuals: true
  },
  id: false
}
)

userSchema.virtual('freindCount').get(function(){
  return this.freinds.length()
})

const User = model('User', userSchema);

module.exports = User;