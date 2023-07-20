"use client"
import { FormBuilder } from "@formio/react";
import { useState } from "react";
import {useRouter} from 'next/navigation';

import "@styles/FormBuilder.module.css";
const CreateForm = () => {
  const router = useRouter()

  const [jsonSchema, setSchema] = useState({ components: [] });

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
        window.location.href = "/dashboard"
        }
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <>
      <FormBuilder form={jsonSchema} onChange={onFormChange}/>
      <button onClick={handelSave} className="btn btn-primary">Save</button>
    </>
  );
};
export default CreateForm;