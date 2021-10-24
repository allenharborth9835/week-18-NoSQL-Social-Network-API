const {User, Thought} = require('../models/index')

const thoughtController = {
  getAllThoughts(req, res){
    Thought.find({})
    .sort({_id: -1})
    .select("-__v")
    .then(db => res.json(db))
    .catch(err =>{
      console.log(err);
      res.status(400).json(err)
    })
  },

  getThoughtById({params}, res){
    Thought.find({ _id: params.id})
    .populate({
      path: 'reactions',
      select: "-__v"
    })
    .select('-__v')
    .then(db =>{
      if(!db){
        res.status(404).json({message: 'No thought found with this id!'});
        return;
      }
      res.json(db)})
    .catch(err =>{
      console.log(err);
      res.status(400).json(err)
    })
  },

  createThought({ params, body }, res){
    Thought.create(body)
      .then(({ _id })=>{
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(db =>{
        if(!db){
          res.status(404).json({message: 'No user found with this id!'});
          return;
        }
        res.json(db)})
      .catch(err =>{
        console.log(err);
        res.status(400).json(err)
      })
  },

  updateThought({params, body}, res){
    Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runvalidators: true})
      .then (db =>{
        if(!db){
          res.status(404).json({message: 'No thought found with this id!'});
          return;
        }
        res.json(db)
      })
      .catch(err =>{
        console.log(err);
        res.status(400).json(err)
      })
  },

  deleteThought({ params }, res){
    Thought.findOneAndDelete({ _id: params.id})
      .then (db =>{
        if(!db){
          res.status(404).json({message: 'No thought found with this id!'});
          return;
        }
        res.json(db)
      })
      .catch(err =>{
        console.log(err);
        res.status(400).json(err)
      })
  },

  addReaction({ params, body }, res){
    Thought.findByIdAndUpdate(
      {_id: params.id},
      {$addToSet:{ reactions: body}},
      {new: true, runValidators: true}
    )
    .then (db =>{
      if(!db){
        res.status(404).json({message: 'No user found with this id!'});
        return;
      }
      res.json(db)
    })
    .catch(err =>{
      console.log(err);
      res.status(400).json(err)
    })
  },

  removeReaction({ params }, res){
    Thought.findByIdAndUpdate(
      {_id: params.id},
      {$pull:{ reactions: params.reactionId}},
      {new: true}
    )
    .then (db => res.json(db))
    .catch(err =>{
      console.log(err);
      res.status(400).json(err)
    })
  }
};

module.exports = thoughtController;