// bringing in express router
const router = require('express').Router();

// this imports all of the api routes being created in the sub folder
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;
