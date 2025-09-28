import { useEffect, useState } from "react";

function useForm(initialValues, validationSchema, submitHandler,mode) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});



   useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);


  const changeValue = (event) => {
    let { name, value } = event.target;
    setValues((prev) => {
      let updated = { ...prev, [name]: value };
      if (name === "Account" && updated.TransferTo === value)
        updated.TransferTo = "";
      return updated;
    });
  };

 

  const handleSubmit = async (event) => {
    event.preventDefault();

    //validate schema
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      submitHandler(values);
    } catch (error) {
      console.log(error)
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  return { values, errors, changeValue, handleSubmit };
}

export default useForm;
