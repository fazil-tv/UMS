export const validateadminLogin = (values) => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Invalid email format';
    }
  
    if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 5) {
        errors.password = 'Password must be at least 6 characters long';
      }  
    return errors;
  };