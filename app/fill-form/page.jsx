"use client"
import { Form } from "@formio/react";
import { useEffect, useState } from "react";

const FillForm = () => {
  const [form, setForm] = useState()
  const getForm = async () => {
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
  }, [])
  return (
    <div className="max-w-md mx-auto mt-8 p-4 shadow-md rounded">
      {form ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Fill the Form</h2>
          <Form form={form} />
        </>
      ) : (
        <p>Loading form...</p>
      )}
    </div>
  );
}

export default FillForm