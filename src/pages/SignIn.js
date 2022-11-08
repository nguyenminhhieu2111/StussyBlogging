import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import Field from '../components/field/Field';
import Input from '../components/input/Input';
import Label from '../components/label/Label';
import { useAuth } from '../contexts/auth-context';
import AuthenticationPage from './AuthenticationPage';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-app/firebase-config';
import InputPasswordToggle from '../components/input/InputPasswordToggle';



const schema=yup.object({
  
    email:yup.string().email("Please enter valid email address").required("Please enter your email address"),
    password:yup.string().min(8,'Your password must be at least 8 characters or greater').required("Please enter your password")
  })
const SignIn = () => {
    const {handleSubmit,control,formState:{isSubmitting,isValid,errors}}=useForm({
        mode:"onChange",
        resolver:yupResolver(schema)
    })
    useEffect(()=>{
        const arrError=Object.values(errors)
        if (arrError.length > 0){
          toast.error(arrError[0]?.message,{
            pauseOnHover:false,
            delay:0,
  
          })
        }
      })

    const {userInfo}=useAuth()
    console.log(userInfo)
    const navigate=useNavigate()
     useEffect(()=>{
         document.title="Login Page"
        if(userInfo?.email) navigate("/")
    },[userInfo]) 

    const handleSignIn= async (values)=>{
        if(!isValid) return
        await signInWithEmailAndPassword(auth,values.email,values.password)
        navigate("/")
    }
    return (
        <AuthenticationPage>
             <form className="form" onSubmit={handleSubmit(handleSignIn)}>
             <Field>
             <Label htmlFor='email'>Email address</Label>
             <Input type='email' name='email' placeholder="Enter your email address" control={control} ></Input>
             </Field>
            
             <Field>
             <Label htmlFor='password'>Password</Label>
             <InputPasswordToggle control={control}></InputPasswordToggle>   
             </Field>
             <div className='have-acc'>You have not had an account? <NavLink to={"/sign-up"}>Register an account</NavLink></div>
             <Button type="submit"
            style={{
              maxWidth: 300,
              margin: "0 auto",
            }}
            isLoading={isSubmitting}
            disabled={isSubmitting}
              >Sign In</Button>
              </form>
        </AuthenticationPage>
    );
};

export default SignIn;