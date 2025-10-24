"use client";

import * as React from "react";
import { useController } from "react-hook-form";
import { cn } from "@/lib/utils";

export const FormFieldContext = React.createContext<{
  name: string;
}>({
  name: "",
});

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const { getFieldState, formState } = useController({
    name: fieldContext.name,
  });

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id: fieldContext.name,
    name: fieldContext.name,
    error: !!fieldState.error,
    errorMessage: fieldState.error?.message,
  };
};

export const FormField = ({ name, control, render, ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => render({ field, ...props })}
      />
    </FormFieldContext.Provider>
  );
};