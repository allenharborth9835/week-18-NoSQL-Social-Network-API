const { Schema, model } = require('mongoose');
const { Thought } = require('./index');

//user schema that sets up a user
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
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
},
{
  toJSON:{
    virtuals: true
  },
  id: false
}
)

//sets up a friend count for users
userSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});

//sets up a thought count for users
userSchema.virtual("thoughtCount").get(function(){
  return this.thoughts.length;
})

//BONUS: deletes all of the thoughts of a user before deleting the user
// userSchema.pre("findOneAndDelete", { document: false, query: true }, async function(){
//   const account = await this.model.findOne(this.getFilter());
//   console.log(Thought)
//   console.log(User)
//   await Thought.deleteMany({ username: account.username})
// });

//sets up user model and exports it
const User = model('User', userSchema);
module.exports = User;