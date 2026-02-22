import { useState } from "react";

export const useBasicForm =<T extends Record<string,any>>(iniState:T) => {

  const [state, setstate] = useState<T>(iniState)


    const handleChange = <K extends keyof T>(
    field: K, 
    value: T[K] // El tipo se infiere del campo
  ) => {
    setstate((val) => ({
      ...val,
      [field]: value
    }));
  };

    const resetForm =(InitialState:T)=>{
        setstate(InitialState)
    }

    return{
        state,
        handleChange,
        resetForm
    }
}
