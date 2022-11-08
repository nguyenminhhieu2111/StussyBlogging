import React, { useState } from 'react';
import IconEyesClose from '../icon/IconEyesClose';
import IconEyesOpen from '../icon/IconEyesOpen';
import Input from './Input';

const InputPasswordToggle = ({control}) => {
    const [togglePassword,setToggePassword]=useState(false)
    if (!control) return null;
    return (
        <>
             <Input name='password' type={togglePassword ? 'text' : 'password'}  placeholder="Enter your password" control={control}>
                      {!togglePassword ? (
                        <IconEyesClose onClick={()=>setToggePassword(true)}></IconEyesClose>
                      ):(
                        <IconEyesOpen onClick={()=>setToggePassword(false)}></IconEyesOpen>
                      ) }
                  </Input>         
        </>
    );
};

export default InputPasswordToggle;