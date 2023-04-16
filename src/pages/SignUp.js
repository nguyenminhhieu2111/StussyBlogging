import React, { useEffect} from 'react';
import styled from 'styled-components'
import Input from '../components/input/Input';
import Label from '../components/label/Label';
import {useForm} from "react-hook-form";
import Field from '../components/field/Field';
import Button from '../components/button/Button';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {auth, db} from '../firebase-app/firebase-config';
import { NavLink, useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import AuthenticationPage from './AuthenticationPage';
import InputPasswordToggle from '../components/input/InputPasswordToggle';
import slugify from 'slugify';
import { userRole, userStatus } from '../utils/constants';
const SignUpPageStyles=styled.div`
min-height: 100vh;
padding: 40px;

`

const schema=yup.object({
  fullname:yup.string().required("please enter your fullname"),
  email:yup.string().email("Please enter valid email address").required("Please enter your email address"),
  password:yup.string().min(8,'Your password must be at least 8 characters or greater').required("Please enter your password")
})
const SignUp = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver:yupResolver(schema)
  });
    const handledSignUp=async (values)=>{
       if (!isValid) return;
       await createUserWithEmailAndPassword(auth, values.email, values.password);
       await updateProfile(auth.currentUser, {
         displayName: values.fullname,
         photoURL:
         "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
   
       });
   
       await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.fullname, { lower: true }),
        avatar:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
      });
  
      toast.success("Register successfully!!!");
      navigate("/");
    };
    useEffect(()=>{
      document.title="Register Page"
      const arrError=Object.values(errors)
      if (arrError.length > 0){
        toast.error(arrError[0]?.message,{
          pauseOnHover:false,
          delay:0,

        })
      }
    },[errors])
    return (
        <SignUpPageStyles>
        <AuthenticationPage>
             
              <form className="form" onSubmit={handleSubmit(handledSignUp)}>

              <Field>
                  <Label htmlFor="fullname" >Fullname</Label>
                  <Input name='fullname' type="text"  placeholder="Enter your fullname" control={control}/>                  
              </Field>

              <Field>
                  <Label htmlFor="email" >email</Label>
                  <Input name='email' type="email"  placeholder="Enter your email" control={control}/>                  
              </Field>

              <Field>
                  <Label htmlFor="password" >password</Label>
                 <InputPasswordToggle control={control}></InputPasswordToggle>         
              </Field>
              <div className='have-acc'>You already have an account? <NavLink className="text-green-400 underline" to={"/sign-in"}>Login</NavLink></div>
              <Button type="submit"
            style={{
              maxWidth: 300,
              margin: "0 auto",
            }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
              >Sign Up</Button>
              </form>
        </AuthenticationPage>
        </SignUpPageStyles>
    );
};

export default SignUp;