const doctorModel = require('../models/doctorModels');
const appointmentModel= require('../models/appointmentModel');
const userModel = require('../models/userModels');


const getDoctorInfoController =async(req,res)=>{
    try{
        const doctor = await doctorModel.findOne({userId: (req.body && req.body.userId) || req.query.userId});
        res.status(200).send({
            success:true,
            message:"doctor data Fetch Successfully",
            data:doctor,
        });


    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Fetching Doctor Details",
            error,
        });

    }
};

const updateProfileController =async(req,res)=>{
    try{

        const doctor= await doctorModel.findOneAndUpdate({userId: req.body.userId},
            req.body
        );
        res.status(201).send({
            success:true,
            message:"Doctor Profile updated",
            data:doctor,
        });
    } catch (error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Doctor Profile Update issues",
            error,
        
    });
}
};

// get doctor ById information
const getDoctorByIdController =async(req,res)=>{
    try{
        const doctor= await doctorModel.findOne({_id:req.body.doctorId});
        res.status(200).send({
            success:true,
            message:"Single Doc Info Featched",
            data:doctor,
        });

    }catch (error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in singl doctor ingoramation",
            error,
        });

    }

};

// doctorAppointments ctrl
const doctorAppointmentsController= async(req,res)=>{
    try{
         const doctor = await doctorModel.findOne({userId: req.userId});
        //const doctor = await doctorModel.findOne({ userId: req.body.userId });
        if (!doctor) {
            return res.status(200).send({
                success: false,
                message: "Doctor profile not found",
            });
        }

        const appointments = await appointmentModel.find({
             doctorId: doctor._id,
        });
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.status(200).send({
            success:true,
            message:"Doctor Appointments featch Successfully",
            data:appointments,
        });
        
    } catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Doc Appointments",
            error,


        });
    }

};


//update dtatus ctrl
const updateStatusController=async(req,res)=>{
    try{
        const { appointmentsId, status } = req.body;
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId, { status });
        const user = await userModel.findOne({ _id: appointments.userId });
        const notification = user.notification;
        notification.push({
            type: "status-updated",
            message: `your appointment has been ${status}`,
            onClickPath: "/doctor-appointments",
        });

    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
      //data: appointments,
    });




    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Update Status",
            error,
        });
    }
};



module.exports ={ getDoctorInfoController,updateProfileController,getDoctorByIdController,doctorAppointmentsController, updateStatusController};
