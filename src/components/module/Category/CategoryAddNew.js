
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { db } from "../../../firebase-app/firebase-config";
import Button from "../../button/Button";
import { Radio } from "../../checkbox";
import Field from "../../field/Field";
import Input from "../../input/Input";
import Label from "../../label/Label";
import DashboardHeading from "../Dashboard/DashBoardHeading";
import { toast } from "react-toastify";

const CategoryAddNew = () => {
  const {
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid},
    handleSubmit
  } = useForm({
    mode: "onChange",
    defaultValues:{
      name:"",
      title:"",
      slug:"",
      status:1,
      createdAt: new Date()
    }
  });
  const handleAddNewCategory=async (values)=>{
    if (!isValid) return;
    const newValues = { ...values };

 newValues.slug = slugify(values.slug || values.name,{lower:true})
    newValues.status = Number(newValues.status) 
    const colRef=collection(db,"categories")
  try {
    await addDoc(colRef,{
      ...newValues,
      createdAt:serverTimestamp()
    })
    toast.success("Create new category successfully!")
  } catch (error) {
    toast.success(error.message)
  } finally{
    reset({
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    })
  }
  }
  const watchStatus = watch("status")
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
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
        <Button kind="primary" className="mx-auto w-[200px]" type="submit"   disabled={isSubmitting} isLoading={isSubmitting}>
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;