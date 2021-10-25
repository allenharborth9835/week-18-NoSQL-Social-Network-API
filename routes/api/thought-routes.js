const router = require('express').Router();
const { 
  getAllThoughts, 
  createThought, 
  getThoughtById, 
  updateThought, 
  deleteThought, 
  addReaction,
  removeReaction 
} = require('../../controllers/thought-controller');

//routes to get all thoughts and add a thought
//link:"localhost:3001/api/thoughts"
//expeceted JSON body to create thought:
//{
//	"thought": "",
//	"username": "",
//	"userId": ""
//}
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

//routes to get single thought, update thought and delete thought
//link: "localhost:3001/api/thoughts/thoughtId"
//ecpected JSON body only requires updated data to update thought
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

//routes to add reaction to a thought
//link: "localhost:3001/api/thoughts/thoughtId/reaction"
//expeceted JSON body to create reaction:
//{
//	"reactionBody": "",
//	"username": ""	
//}
router
  .route('/:id/reactions')
  .post(addReaction)

//routes to create reaction to a thought
//link: "localhost:3001/api/thoughts/thoughtId/reaction/reactionId"
//no JSON body required
router
  .route('/:id/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;
