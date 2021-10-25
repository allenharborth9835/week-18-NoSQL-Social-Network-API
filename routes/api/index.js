//a file to give all the routes in the api folder
const router = require('express').Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require('./thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes)

module.exports = router;