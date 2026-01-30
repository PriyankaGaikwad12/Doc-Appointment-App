// // import React, { useEffect, useState } from 'react'; 
// // import Layout from '../../components/Layout';
// //  import { useSelector } from 'react-redux'; 
// //  import axios from 'axios';
// //   import { useParams } from 'react-router-dom';

// //   const Profile = () => { 
// //     const {user} = useSelector(state => state.user);
// //    const [doctor,setDoctor] = useState(null);
// //     const Params = useParams(); 
// //    //get doc details function 
// //    const getDoctorInfo = async()=>
// //     { try{ const res = await axios.get('/api/v1/doctor/getDoctorInfo',
// //     {userId: Params.id},
// //      {
// //          header:{ 
// //             Authorization: Bearer ${localStorage.getItem('token')},
// //       },
// //      } 
// //     ); 
// //     if(res.data.success)
// //         {
// //              setDoctor(res.data.data); 
// //             } 
// //         } catch(error)
// //         { 
// //             console.log(error);
// //          } 
// //         }; 
// //         useEffect(()=> 
// //             { 
// //                 getDoctorInfo();
// //              },[getDoctorInfo]);
// //               return (
// //                  <Layout> 
// //                  <h1> Manage Profile</h1>
// //                   </Layout>
// //                  )
// //                  }
// //  export default Profile;

 

// import React, { useEffect, useState } from 'react';
// import Layout from '../../components/Layout';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Col, Form, Input, Row, TimePicker, message } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { showLoading, hideLoading } from "../../redux/features/alertSlice"
// //import moment from "moment";


// const Profile = () => {
//   const [doctor, setDoctor] = useState(null);
//   const { id } = useParams();
//   const dispatch= useDispatch();
//   const navigate=useNavigate();
//   const { user } = useSelector((state) => state.user);


//   //updateprofile 
  
//     const handleFinish = async (values) => {
//       try {
//         dispatch(showLoading());
//         const timings = [
//           values.timings[0].format("HH:mm"),
//           values.timings[1].format("HH:mm")
//         ];
  
//         const res = await axios.post(
//           "/api/v1/doctor/updateProfile",
//           { ...values, timings, userId: user._id },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
  
//         dispatch(hideLoading());
//         if (res.data.success) {
//           message.success(res.data.message);
//           navigate('/');
//         } else {
//           message.error(res.data.message);
//         }
//       } catch (error) {
//         dispatch(hideLoading());
//         console.log(error);
//         message.error("Something went wrong");
//       }
//     };
//     // updateProfile

//   useEffect(() => {
//     const getDoctorInfo = async () => {
//       try {
//         const res = await axios.post(
//           '/api/v1/doctor/getDoctorInfo',
//           { userId: id },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           }
//         );

//        if (res.data.success) {
//           setDoctor(res.data.data);
//         }
        
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getDoctorInfo();
//   }, [id]);

//   return (
//     <Layout>
//       <h1>Manage Profile</h1>

//       {doctor && (
//         <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={doctor}>
//         <h4>Personal Details :</h4>
//         <Row gutter={20}>
//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
//               <Input type="text" placeholder="your name" />
//             </Form.Item>
//           </Col>

//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
//               <Input type="text" placeholder="your surname" />
//             </Form.Item>
//           </Col>

//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label="Phone No" name="phone" rules={[{ required: true }]}>
//               <Input type="text" placeholder="your clinic phone" />
//             </Form.Item>
//           </Col>

//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label="Email" name="email" rules={[{ required: true }]}>
//               <Input type="text" placeholder="your clinic email" />
//             </Form.Item>
//           </Col>

//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label="Website" name="website" rules={[{ required: true }]}>
//               <Input type="text" placeholder="your clinic website" />
//             </Form.Item>
//           </Col>

//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label="Address" name="address" rules={[{ required: true }]}>
//               <Input type="text" placeholder="your clinic address" />
//             </Form.Item>
//           </Col>
//         </Row>

//         <h4>Professional Details :</h4>
//         <Row gutter={20}>
//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label="Specialization" name="specialization" rules={[{ required: true }]}>
//               <Input type="text" placeholder="your specialization" />
//             </Form.Item>
//           </Col>

//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label="Experience" name="experience" rules={[{ required: true }]}>
//               <Input type="text" placeholder="your experience" />
//             </Form.Item>
//           </Col>

//           <Col xs={24} md={24} lg={8}>
//             <Form.Item label="Fees Per Consultation" name="feesPerConsultation" rules={[{ required: true }]}>
//               <Input type="text" placeholder="your fees" />
//             </Form.Item>
//           </Col>

//           {/* <Col xs={24} md={24} lg={8}>
//             <Form.Item label="Timings" name="timings" rules={[{ required: true }]}>
//               <TimePicker.RangePicker format="HH:mm" />
//             </Form.Item>
//           </Col> */}

//           <Col xs={24} md={24} lg={8}></Col>

//           <Col xs={24} md={24} lg={8}>
//             <button className="btn btn-primary form-btn" type="submit">
//               Update
//             </button>
//           </Col>
//         </Row>
//       </Form>
//       )}
//     </Layout>
//   );
// };

// export default Profile;




import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import dayjs from "dayjs";

const Profile = () => {
  const [doctor, setDoctor] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // ✅ UPDATE PROFILE
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());

      const timings = values.timings
        ? [
            values.timings[0].format("HH:mm"),
            values.timings[1].format("HH:mm"),
          ]
        : doctor.timings;

      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          timings,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };


  // ✅ GET DOCTOR INFO
  useEffect(() => {
    const getDoctorInfo = async () => {
      try {
        const res = await axios.post(
          "/api/v1/doctor/getDoctorInfo",
          { userId: id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          setDoctor(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDoctorInfo();
  }, [id]);

  return (
    <Layout>
      <h1>Manage Profile</h1>

      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-3"
          key={doctor._id}
          initialValues={{
            ...doctor,
            timings: doctor.timings
              ? [
                  dayjs(doctor.timings[0], "HH:mm"),
                  dayjs(doctor.timings[1], "HH:mm"),
                ]
              : [],
          }}
        >
          <h4>Personal Details</h4>
          <Row gutter={20}>
            <Col lg={8}>
              <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item name="website" label="Website">
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <h4>Professional Details</h4>
          <Row gutter={20}>
            <Col lg={8}>
              <Form.Item name="specialization" label="Specialization" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item name="experience" label="Experience" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item name="feesPerConsultation" label="Fees" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item name="timings" label="Timings" rules={[{ required: true }]}>
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
