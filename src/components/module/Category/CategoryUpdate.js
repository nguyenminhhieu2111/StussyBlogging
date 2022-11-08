import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../button/Button";
import { Radio } from "../../checkbox";
import Field from "../../field/Field";
import Input from "../../input/Input";
import { Label } from "../../label";
import DashboardHeading from "../Dashboard/DashBoardHeading";
import {collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc} from "firebase/firestore"
import {db} from "../../../firebase-app/firebase-config"
import slugify from "slugify"
import {toast} from "react-toastify"

const CategoryUpdate = () => {
    const { control,watch, setValue ,handleSubmit,getValues,reset,formState:{isSubmitting}} = useForm({
       mode: "onChange",
       defaultValues: {
      
       },
     });
  const [params] = useSearchParams();
  const navigate=useNavigate()
  const categoryId=params.get("id");
  useEffect(()=>{
   async function fetchData(){
     const  colRef= doc(db,"categories",categoryId)
     const singleDoc=await getDoc(colRef)
     reset(singleDoc.data())
    }
    fetchData()
  },[categoryId,reset])

 const watchStatus=watch("status")
 const handleUpdate= async (values)=>{
  const colRef = doc(db, "categories", categoryId);
  await updateDoc(colRef, {
    name: values.name,
    slug: slugify(values.slug || values.name, { lower: true }),
    status: Number(values.status),
  });
  toast.success("Update category successfully!");
  navigate("/manage/category");
 }
 if (!categoryId) return null
  return <div>
    <DashboardHeading title="Update Category" desc={`Update your category id: ${categoryId}`}></DashboardHeading>
    <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
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
          Update category
        </Button>
      </form>
  </div>;
};

export default CategoryUpdate;