import validator from 'validator'
import { useState } from 'react';

const Validate = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordValidation = (value) => {
    if (validator.isStrongPassword(value, {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })) {
      setErrorMessage('Is Strong Password')
    } else {
      setErrorMessage('Is Not Strong Password')
    }
  }
  return { handlePasswordValidation, errorMessage };
}

export default Validate