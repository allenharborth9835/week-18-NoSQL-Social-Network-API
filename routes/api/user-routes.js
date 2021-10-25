const router = require('express').Router();
const {
  getAllUsers,
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

//routes to get all users and add a user
//link:"localhost:3001/api/users"
//expeceted JSON body to create user:
//{
//	"username": "",
//	"email": "",
//}
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

//routes to get single user, update user and delete user
//link: "localhost:3001/api/users/userId"
//ecpected JSON body only requires updated data to update user
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

//routes to add/remove friends
//link: "localhost:3001/api/users/userId/friends/friendId"
//no JSON body required
router
  .route('/:id/friends/:friendId')
  .put(addFriend)
  .delete(removeFriend)

module.exports = router;

