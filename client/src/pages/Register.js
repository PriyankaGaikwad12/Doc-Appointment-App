// import React from 'react';
// import '../style/RegisterStyle.css';
// import {Form,Input,message} from 'antd';
// import axios from 'axios';
// import {Link,useNavigate} from 'react-router-dom';
// const Register = () => {

// const navigate = useNavigate();


//   //form handler
//   const onFinishHandler = async (values) => {
//     try{
//       const res = await axios.post("/api/v1/user/register", values);

// //const res = await axios.post("/api/v1/user/register",values);
// if(res.data.success){
//   // message.success("Register Successfuly!");
//     message.success(res.data.message);
//   navigate('/login');
// }else{
//   message.error(res.data.message);
// }
//     } catch(error){
//       console.log(error);
//       message.error('Somthing Went Wrong');
//     }
  
//   };
//   return (
//    <>
//     <div className="form-container">
//       <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
//         <h3 className="text-center"> Register Form</h3>
//         <Form.Item label="Name" name= "name"  rules={[{ required: true, message: "Please enter your name" }]}>
//           <Input type="text" required />
//         </Form.Item>

//       <Form.Item label="Email" name="email" rules={[
//             { required: true, message: "Please enter your email" },
//             { type: "email", message: "Please enter a valid email" },
//           ]}
// >
//            < Input type ="email" required/>
//        </Form.Item>

//         <Form.Item label="Password" name ="password"  rules={[{ required: true, message: "Please enter your password" }]}>
//           <Input type="password" required/> 
//         </Form.Item>
//         <Link to="/login" className="ms-2">Already user login here</Link>
//         <button className="btn btn-primary" type="submit"> Register</button>
//       </Form>

//     </div>
   
//    </>
//   );
// };

// export default Register;
import React from 'react';
import '../style/RegisterStyle.css';
import { Form, Input, message } from 'antd';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { showLoading,hideLoading } from '../redux/features/alertSlice';

const Register = () => {
  const navigate = useNavigate();
const dispatch= useDispatch();

  // form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
       dispatch(hideLoading());
      if (res.data.success) {
         message.success("Register Successfuly!");   // ✅ use backend message
        navigate('/login');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      message.error('Something went wrong');
    }
  };

  return (
    <>
      <div className="form-container">
        <Form 
          layout="vertical" 
          onFinish={onFinishHandler} 
          className="register-form"
        >
          <h3 className="text-center">Register Form</h3>

          <Form.Item 
            label="Name" 
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input type="text" required />
          </Form.Item>

          <Form.Item 
            label="Email" 
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input type="email" required />
          </Form.Item>

          <Form.Item 
            label="Password" 
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input type="password" required />
          </Form.Item>

          <Link to="/login" className="ms-2">Already user? Login here</Link>
          <button className="btn btn-primary" type="submit">Register</button>
        </Form>
      </div>
    </>
  );
};

export default Register;
