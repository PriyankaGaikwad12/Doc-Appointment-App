const express =require("express");
const { loginController, registerController, 
    authController , applyDoctorController, 
    getAllNotificationController,deleteAllNotificationController,
    getAllDoctorsController, getDoctorByIdController,
bookAppointmentController,bookAvailabilityController,
userAppointmentsController} = require("../controllers/userCtrl");

const authMiddleware = require("../middlewares/authMiddleware");



// router boject
const router = express.Router();

//routes
//login ||post

router.post("/login",loginController);

//register post

router.post("/register",registerController);

// Auth ||Post

router.post('/getUserData',authMiddleware,authController);

//Apply Doctor ||post

router.post('/apply-doctor', authMiddleware, applyDoctorController);
// module.exports =router;


//Notification Doctor ||post

router.post('/get-all-notification', authMiddleware, getAllNotificationController);



//Notification Doctor Delete || post

router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);


//GET ALL DOC
router.get('/getAllDoctors',authMiddleware,getAllDoctorsController);

//BOOK APPOINTMENT
router.post('/getDoctorById', authMiddleware, getDoctorByIdController);

//  BOOK APPOINTMENT
router.post('/book-appointment',authMiddleware,bookAppointmentController);

// BOOKING AVAILABILITY

router.post('/booking-availability',authMiddleware,bookAvailabilityController);

// Appointment List
 router.get('/user-appointments',authMiddleware,userAppointmentsController);
module.exports =router;