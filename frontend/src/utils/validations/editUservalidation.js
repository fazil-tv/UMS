export const edituservalidation = (values) => {
    const errors = {};

  

    console.log("valuess",values)
  
    if (!values.name) {
        errors.name = 'Name is required';
      }
  
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email format';
      }  
    return errors;
  };