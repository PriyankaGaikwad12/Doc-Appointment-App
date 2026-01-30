const express =require('express')
const authMiddleware = require('../middlewares/authMiddleware');
const { getDoctorInfoController, updateProfileController,
    doctorAppointmentsController, getDoctorByIdController,
updateStatusController} = require('../controllers/doctorCtrl');

const router = express.Router();



//post SINGLE DOC INFOMARATION
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController);

//POST UPDATE PROFILE
router.post('/updateProfile',authMiddleware,updateProfileController );

//POST GET SINGLE DOC INFO
// router.post('/getDoctorById',authMiddleware,getDoctorByIdController);
router.post('/getDoctorById', authMiddleware, getDoctorByIdController);

//Get Appointments
router.get('/doctor-appointments',authMiddleware, doctorAppointmentsController);
//  post update status

router.post('/update-status',authMiddleware,updateStatusController);
module.exports = router;