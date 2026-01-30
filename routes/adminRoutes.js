const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUsersController, getAllDoctorsController ,changeAccountStatusController } = require('../controllers/adminCtrl');


//Get method ||  USERS

router.get('/getAllUsers',authMiddleware,getAllUsersController );
//GET METHOD || DOCTORS  // this is call backe function caled getAllDoctorsController
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController);

//POST ACCOUNT STATUS

router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController);

module.exports = router;