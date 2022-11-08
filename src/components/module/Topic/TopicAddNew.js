import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from '../../../firebase-app/firebase-config';
import Button from '../../button/Button';
import Field from '../../field/Field';
import Label from '../../label/Label';
import Input from "../../input/Input"
import DashboardHeading from '../Dashboard/DashBoardHeading';
import { toast } from "react-toastify";
import { Radio } from '../../checkbox';

const TopicAddNew = () => {
    const {control,watch,reset,handleSubmit,formState:{isSubmitting,isValid}}=useForm({
        mode:"onChange",
        defaultValues:{
            title:"",
            createdAt:new Date()
        }
    })
    const watchStatus = watch("status")
    const handleAddNewTopic=async (values)=>{
        if(!isValid) return;
        const newValues={...values}
        const colRef=collection(db,"topic")
        try {
            await addDoc(colRef,{
                ...newValues,
                createdAt:serverTimestamp()
            })
            toast.success("Create new topic successfully!")
        } catch (error) {
            toast.success(error.message)
        }finally{
            reset({
                name:"",
                status: 1,
                createdAt:new Date()
            })
        }
    }
    return (
        <div>
            
            <DashboardHeading
        title="New topic"
        desc="Add new topic"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewTopic)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
          <Input control={control} name="topic" ></Input>
          </Field>        
          <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio name="status" control={control} checked={Number(watchStatus) === 1}
              value={1}>
                Approved
              </Radio>
              <Radio name="status" control={control} checked={Number(watchStatus) === 2}
              value={2}>
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        </div>      
        <Button kind="primary" className="mx-auto w-[200px]" type="submit"   disabled={isSubmitting} isLoading={isSubmitting}>
          Add new Topic
        </Button>
      </form>
    </div>
  );
};


export default TopicAddNew;