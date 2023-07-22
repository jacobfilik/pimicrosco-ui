import { useState } from "react";
import { ExposureModel } from "./camera";

// useForm functional componen
export const useForm = (
  callback: any,
  setModel: React.Dispatch<ExposureModel>,
  initialState: ExposureModel
) => {
  // onChange
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var value: any = event.target.value;
    const name = event.target.name;
    if (name === "exposure_speed") {
      value = parseInt(value);
      console.log(value);
    }
    setModel({ ...initialState, [name]: value });
  };

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    var value: any = event.target.value;
    const name = event.target.name;
    if (name === "iso") {
      value = Number(value);
    }

    setModel({
      ...initialState,
      [name]: value,
    });
  };

  // onSubmit
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await callback(); // triggering the callback
  };

  // return values
  return {
    onChange,
    onSelect,
    onSubmit,
  };
};
