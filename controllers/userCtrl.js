const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require("../models/doctorModels");
const appointmentModel =require("../models/appointmentModel");
const moment = require('moment');



const registerController = async (req,res) => {
    try{
        const existingUser = await userModel.findOne({ email:req.body.email });
        if(existingUser){
            return res.status(200).send({message : ' User Already Exists', success:false });
        }
        const password = req.body.password;
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        req.body.password =hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({ message: "Register Sucessfully", success: true });
    } catch (error) {
console.log(error);
res.status(500).send({success:false, message: `Register Controller ${error.message}`});
    }
    

};


const loginController = async (req,res) => {
    try {
        const user = await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({message:'user not found',success:false});
        }
const isMatch = await bcrypt.compare(req.body.password, user.password);
if(!isMatch){
    return res.status(200).send({message:'Invalid Email or Password', success: false});

}
const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '1d'});
res.status(200).send({message: 'Login Sucess', success:true,token});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: `Error in Login CTRL ${error.message}`})
    }
};

const authController  = async (req,res) => {
    try{
        const user = await userModel.findById({_id: req.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message:'user not found',
                success : false,

            });
        } else {
            res.status(200).send({
                success: true,
                data: user,   
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "auth error",
            success:false,
            error,
        });

        
    }
};
//apply doctor ctrl

const applyDoctorController = async (req,res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: 'pending' });

// const newDoctor =  await doctorModel({...req.body, status: 'pending'});
await newDoctor.save();
const adminUser = await userModel.findOne({isAdmin: true});
const notification = adminUser.notification;
notification.push({
    type:'apply-doctor-request',
    message: `${newDoctor.firstName}  ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",

      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while Applying For Doctor'
        })
    }
}

//notification ctrl
const getAllNotificationController = async (req,res) => {
    try{
        const user= await userModel.findOne({_id:req.userId});
        const  seennotification = user. seennotification;
        const notification =user.notification; //get notification
        //push notification
         seennotification.push(...notification);
        user.notification = [];
        user. seennotification = notification;
        const updatedUser= await user.save();

        res.status(200).send({
            success:true,
            message:"all notification marked as read",
            data:updatedUser,
        });


    } catch (error){
        console.log(error);
        res.status(500).send({
          message:"Error in notification",
          success:false,
          error,
          
        });
    }
};
 


// delete notification ctrl 
const deleteAllNotificationController = async(req,res)=>{
    try{
        const user = await userModel.findOne({_id:req.userId});
        user.notification =[];
        user.seennotification =[];
        const updatedUser =await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success:true,
            message:"Notification Deleted successfully",
            data:updatedUser,

        })
        

    } catch(error){
        console.log(error);
        res.status(500).send
({
    success:false,
    message:'unable to delete all notification',
    error,
}) ;

}
};

//get all doctors
 const getAllDoctorsController =async(req,res)=>{
    try{
        const doctors = await doctorModel.find({status:'approved'})
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.status(200).send({
            success:true,
            message:"Doctor List Featched Succsefully",
            data:doctors,
        })

    } catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while Featching Doctor",
        });

        
    }

 };

 const getDoctorByIdController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
        res.status(200).send({
            success: true,
            message: "Single Doc Info Fetched",
            data: doctor,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Single doc info",
        });
    }
};


//bookAppointmentController

// const bookAppointmentController =async(req,res)=>{
//     try{
//         req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
//         req.body.time = moment(req.body.time, "HH:mm").toISOString();
//         req.body.status="pending";
//         const newAppointment= new appointmentModel(req.body);
//         await newAppointment.save();
//         const user = await userModel.findOne({_id: req.body.doctorInfo.userId});
//         user.notification.push({
//             type:"New-appointment-request",
//             message:`A New Appointment Request from ${req.body.userinfo.name}`,
//             onClickPath:'/user/appointments'
//         });
//         await user.save();
//         res.status(200).send({
//             success:true,message:'Appointment Book Successfully'
//         });



//     }catch(error){
//         console.log(error);
//         res.status(500).send({
//             success:false,
//             message:"Error while Booking Appointment",
//             error,
//         });

//     }

// };

const bookAppointmentController = async (req, res) => {
  try {
    // format date & time
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const time = moment(req.body.time, "HH:mm").toISOString();

    // find doctor using doctorInfo.userId
    const doctor = await doctorModel.findOne({
      userId: req.body.doctorInfo.userId,
    });

    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    // // create appointment correctly
    // const newAppointment = new appointmentModel({
    //   userId: req.userId,          // logged-in user
    //   doctorId: doctor._id,        // ✅ IMPORTANT FIX
    //   userInfo: req.body.userInfo,
    //   doctorInfo: req.body.doctorInfo,
    //   date,
    //   time,
    //   status: "pending",
    // });
    const newAppointment = new appointmentModel({
  userId: req.userId,
  doctorId: doctor._id,
  userinfo: req.body.userinfo,
  doctorInfo: req.body.doctorInfo,
  date,
  time,
  status: "pending",
});


    await newAppointment.save();

    // send notification to doctor (doctor's USER account)
    const user = await userModel.findOne({ _id: doctor.userId });

    user.notification.push({
      type: "New-appointment-request",
      message: `A New Appointment Request from ${req.body.userinfo.name}`,
      onClickPath: "/doctor/appointments",
    });

    await user.save();

    res.status(200).send({
      success: true,
      message: "Appointment Booked Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Booking Appointment",
      error,
    });
  }
};




//bookAvailabilityControlleR

const bookAvailabilityController =async(req,res)=>{
    try{
        const date= moment(req.body.date, "DD-MM-YYYY").toISOString();
        const fromTime = moment(req.body.time, 'HH:mm').subtract(1,'hours').toISOString();
        const toTime = moment(req.body.time, 'HH:mm').add(1,'hours').toISOString();
        const doctorId= req.body.doctorId;
        const appointments = await appointmentModel.find({
            doctorId,date,time:{
                $gte:fromTime,
                $lte:toTime
            },
        });
        if(appointments.length >0){
            return res.status(200).send({
                message:'Appointments not Availaible at this time',
                success:true,
            });

        }else{
            return res.status(200).send({
                message:'Appointments Available',
                success:true,
            });
        }
         

    } catch (error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Booking Availability",
            error,
        });

    }

};

//userappointment ctrl

const userAppointmentsController = async (req, res) => {
    try{
        const appointments = await appointmentModel.find({ userId: req.userId });
        res.status(200).send({
            success:true,
            message:"Users Appointments Fetch Successfully",
            data :appointments,
        });

    }catch(error){
        console.log(error);
        res.status(500).send
      ({
        success:false,
        error,
        message:"Error in user Appointments",

      });

    }

};
module.exports ={loginController,registerController,authController,
    applyDoctorController,getAllNotificationController,
     deleteAllNotificationController,getAllDoctorsController, 
     getDoctorByIdController,bookAppointmentController,bookAvailabilityController,userAppointmentsController};