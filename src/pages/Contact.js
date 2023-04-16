import React from "react";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import { Label } from "../components/label";
import Header from "../components/layout/Header";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/button/Button";
import Textarea from "../components/textArea/Textarea";
import { Dropdown } from "../components/Dropdown";
import { useState } from "react";
import { useEffect } from "react";
import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-app/firebase-config";
import {toast} from "react-toastify"
const ContactStyled = styled.div`
  h1 {
    text-align: center;
  }
`;
const schema = yup.object({
  name:yup.string().required("Please enter your name"),
  email: yup
  .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
  phone: yup
    .number()
    .required("required")
    .min(10, "to short")
    .max(10, "to long"),
  comment: yup.string().min(10, "At least 6 characters").required(),
});
const Contact = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues:{
      name:"",
        email:"",
        phoneNumber:"",
        topic:"",
        comment:"",
      createdAt: new Date()
    }
  });
  const [topic, setTopic] = useState("");
  const [selectTopic, setSelectTopic] = useState("");
  const [loading,setLoading]=useState(false)
  const handleSendPost = async (values) => {
    console.log("dsdsd")
   if(!isValid) return;
    setLoading(true)
    try {
      console.log("sasssa")
      const cloneValues={...values}
      const colRef=collection(db,"support");
      await addDoc(colRef,{
        ...cloneValues,
        createAt:serverTimestamp()
      })
      toast.success("send support succesfully")
      console.log(cloneValues)
      
    } catch (error) {
      setLoading(false)
      toast.error("error message")
      
    }

  };
  useEffect(() => {
    document.title = "Stussy Blogging-Update Topic";
    const colref = collection(db, "topic");
    onSnapshot(colref, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTopic(results);
    });
  }, []);

  const handleClickOption = async (item) => {
    const colRef = doc(db, "topic", item.id);
    const docData = await getDoc(colRef);
    setValue("topic", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectTopic(item);
  };

  return (
    <ContactStyled>
      <Header></Header>
      <div className="container">
        <div className="MainContact">
          <h1>CONTACT</h1>
          <form onSubmit={handleSubmit(handleSendPost)}>
            <Field>
              <Label htmlFor="name">Name (required)</Label>
              <Input
                name="name"
                placeholder="Please Enter your name"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="email">Email (required)</Label>
              <Input
                name="email"
                control={control}
                placeholder="Please Enter your email"
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="phoneNumber">NumberPhone (required)</Label>
              <Input
                name="phoneNumber"
                placeholder="Please Enter your phoneNumber"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="topic">
                <Dropdown>
                  <Dropdown.Select
                    placeholder={`${
                      selectTopic.topic || "please select category"
                    }`}
                  ></Dropdown.Select>
                  <Dropdown.List>
                    {topic.length > 0 &&
                      topic.map((item) => (
                        <Dropdown.Option
                          key={item.id}
                          onClick={() => handleClickOption(item)} 
                        >
                          {item.topic}
                        </Dropdown.Option>
                      ))}
                  </Dropdown.List>
                </Dropdown>
              </Label>
            </Field>
            <Field>
              <Label htmlFor="comment">Content (required)</Label>
              <Textarea
                placeholder="please enter problem"
                name="comment"
                control={control}
              ></Textarea>
            </Field>
            <Button
              type="submit"
              style={{
                maxWidth: 500,
                margin: "0 auto",
              }}
              kind="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </ContactStyled>
  );
};

export default Contact;
