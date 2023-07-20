"use client"
import { FormBuilder } from "@formio/react";
import { useState, useEffect } from "react";

import "@styles/FormBuilder.module.css";
const CreateForm = () => {

  const [jsonSchema, setSchema] = useState({ components: [] });
  const [form, setForm] = useState()
  const onFormChange = (schema) => {
    setSchema({ ...schema, components: [...schema.components] });
  };
  const handelSave = async ()=>{
    try {
        const response = await fetch("/api/form-builder", {
          method: "POST",
          body: JSON.stringify(jsonSchema)
        });
  
        if (response.ok) {
       console.log('Form Saved Successfully');
        }
      } catch (error) {
        console.log(error);
      }
  }
  const getForm = async()=>{
    try {
      const response = await fetch("/api/fill-form"); 
      if (response.ok) {
        const formData = await response.json();
        setForm({...formData.formJson});
      } else {
        console.log("Failed to fetch form data. Status:", response.status);
      }
    } catch (error) {
      console.log("Error fetching form data:", error);
    }
  }
  useEffect(()=> {
    getForm()
  },[])
  return (
    <>
      <FormBuilder form={form ? form : jsonSchema} onChange={onFormChange}/>
      <button onClick={handelSave} className="btn btn-primary">Save</button>
    </>
  );
};
export default CreateForm;