import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { db } from '../../../firebase-app/firebase-config';
import {toast} from "react-toastify"
import DashboardHeading from '../Dashboard/DashBoardHeading';
import { Label } from '../../label';
import Input from '../../input/Input';
import Field from '../../field/Field';
import { Radio } from '../../checkbox';
import Button from '../../button/Button';

const TopicUpdate = () => {
    const { control,watch, setValue ,handleSubmit,getValues,reset,formState:{isSubmitting}} = useForm({
        mode: "onChange",
        defaultValues: {
       
        },
      });
   const [params] = useSearchParams();
   const navigate=useNavigate()
   const topicId=params.get("id");
   useEffect(()=>{
    async function fetchData(){
      const  colRef= doc(db,"topic",topicId)
      const singleDoc=await getDoc(colRef)
      reset(singleDoc.data())
     }
     fetchData()
   },[topicId,reset])
 
  const watchStatus=watch("status")
  const handleUpdate= async (values)=>{
   const colRef = doc(db, "topic", topicId);
   await updateDoc(colRef, {
     topic: values.name,
     status: Number(values.status),
   });
   toast.success("Update topic successfully!");
   navigate("/manage/topic");
  }
  if (!topicId) return null
    return (
        <div>
            <DashboardHeading title="Update topic" desc={`Update your topic id: ${topicId}`}></DashboardHeading>
    <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your topic name"
            ></Input>
          </Field>
      
        </div>
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
        <Button kind="primary" className="w-[200px] mx-auto" type="submit" disabled={isSubmitting}
          isLoading={isSubmitting}>
          Update topic
        </Button>
      </form>
        </div>
    );
};

export default TopicUpdate;