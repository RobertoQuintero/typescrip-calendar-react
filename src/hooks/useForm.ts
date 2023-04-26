import { ChangeEvent, useEffect, useMemo, useState } from "react";

// react hook form

export const useForm = <T extends Object>(initialState:T  ) => {
  const [formState, setFormState] = useState(initialState);
  const [ formValidation, setFormValidation ] = useState<any>({});

  useEffect(() => {
    // createValidators();
}, [ formState ])

useEffect(() => {
    setFormState( initialState );
}, [ initialState ])

const isFormValid = useMemo( () => {
  for (const formValue of Object.keys( formValidation )) {
      if ( formValidation[formValue] !== null ) return false;
  }
  return true;
}, [ formValidation ])


  const onInputChange = ({ target }:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => setFormState(initialState);

//   const createValidators = () => {
        
//     const formCheckedValues:any = {};
    
//     for (const formField of Object.keys( formValidations )) {
//         const [ fn, errorMessage ] = formValidations[formField];

//         formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
//     }

//     setFormValidation( formCheckedValues );
// }


  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    isFormValid
  };
};
