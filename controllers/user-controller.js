const {User} = require('../models/index')

//user controller that contains all of the routes
const userController = {
  getAllUsers(req, res){
    User.find({})
    .select('-__v')
    .then(db => res.json(db))
    .catch(err =>{
      console.log(err);
      res.status(400).json(err)
    })
  },

  getUserById({params}, res){
    User.find({ _id: params.id})
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
    })
    .select('-__v')
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

  createUser({ body }, res){
    User.create(body)
      .then(db => res.json(db))
      .catch(err => res.status(400).json(err));
  },

  updateUser({params, body}, res){
    User.findOneAndUpdate({ _id: params.id}, body, { new: true, runvalidators: true})
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

  deleteUser({ params }, res){
    User.findOneAndDelete({ _id: params.id})
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

  addFriend({ params }, res){
    User.findByIdAndUpdate(
      {_id: params.id},
      {$push:{ friends: params.friendId}},
      {new: true}
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

  removeFriend({ params }, res){
    User.findByIdAndUpdate(
      {_id: params.id},
      {$pull:{ friends: params.friendId}},
      {new: true}
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
  }
};
//exports the user controller
module.exports = userController;