import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import { MenuItem, Select, Switch, TextField } from "@mui/material";
import { Value } from "../../../../types";

import { ButtonItemChecklist } from "./styles";

type registerInputProps = {
  register: UseFormRegister<FieldValues>;
  nameRegister: string;
  indexRegister: number;
  isClosed: boolean;
  control?: Control;
};

type InputButtonProps = {
  labelName: string;
  register: UseFormRegister<FieldValues>;
  nameRegister: string;
  indexRegister: number;
  isClosed: boolean;
  onClick?: () => void;
};
type InputSelectProps = {
  opts: string[] | [];
  register: UseFormRegister<FieldValues>;
  nameRegister: string;
  indexRegister: number;
  isClosed: boolean;
  control?: Control;
};

function InputButton({ labelName, isClosed, onClick }: InputButtonProps) {
  return (
    <ButtonItemChecklist
      color="primary"
      size="small"
      variant="contained"
      disabled={isClosed}
      onClick={onClick}
    >
      {labelName}
    </ButtonItemChecklist>
  );
}
function InputSwitch({
  register,
  nameRegister,
  indexRegister,
  isClosed,
  control,
}: registerInputProps) {
  return (
    <Controller
      control={control}
      name={`${nameRegister}.${indexRegister}.inputs`}
      render={({ field }) => {
        return (
          <Switch
            checked={field.value}
            disabled={isClosed}
            {...field}
            inputProps={{ "aria-label": "controlled" }}
          />
        );
      }}
    />
  );
}
// function InputSwitch({
//   register,
//   nameRegister,
//   indexRegister,
//   isClosed,
// }: registerInputProps) {
//   return (
//     <Switch
//       defaultChecked={false}
//       disabled={isClosed}
//       {...register(`${nameRegister}.${indexRegister}.inputs`)}
//     />
//   )
// }
function InputText({
  register,
  nameRegister,
  indexRegister,
  isClosed,
}: registerInputProps) {
  return (
    <TextField
      type="text"
      fullWidth
      size="small"
      disabled={isClosed}
      {...register(`${nameRegister}.${indexRegister}.inputs`)}
    />
  );
}
function InputNumber({
  register,
  nameRegister,
  indexRegister,
  isClosed,
}: registerInputProps) {
  return (
    <TextField
      type="number"
      fullWidth
      size="small"
      disabled={isClosed}
      {...register(`${nameRegister}.${indexRegister}.inputs`)}
    />
  );
}

function InputSelect({
  opts,
  indexRegister,
  nameRegister,
  register,
  isClosed,
  control,
}: InputSelectProps) {
  return (
    <Controller
      control={control}
      name={`${nameRegister}.${indexRegister}.inputs`}
      render={({ field }) => {
        return (
          <Select
            fullWidth
            size="small"
            defaultValue={opts[0]}
            disabled={isClosed}
            {...field}
          >
            {/* <MenuItem value="-">{'-'}</MenuItem> */}
            {opts.map((option, index) => (
              <MenuItem key={Math.random() * 20000 + index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        );
      }}
    />
  );
}

export function genereteInput(
  type: string,
  itemValues: Value,
  register: UseFormRegister<FieldValues>,
  nameRegister: string,
  indexRegister: number,
  isClosed: boolean,
  control: Control,
  handleOpenModalInspectCar: (value: boolean) => void
) {
  const optionsSelect = itemValues ? itemValues?.options : [];
  switch (type) {
    case "number":
      return (
        <InputNumber
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
          isClosed={isClosed}
        />
      );
    case "text":
      return (
        <InputText
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
          isClosed={isClosed}
        />
      );
    case "select":
      return (
        <InputSelect
          opts={optionsSelect || []}
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
          isClosed={isClosed}
          control={control}
        />
      );
    case "boolean":
      return (
        <InputSwitch
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
          isClosed={isClosed}
          control={control}
        />
      );
    case "visual_inspect":
      return (
        <InputButton
          labelName="inspeção"
          indexRegister={indexRegister}
          register={register}
          nameRegister={nameRegister}
          isClosed={isClosed}
          onClick={() => handleOpenModalInspectCar(true)}
        />
      );
    // case 'signature':
    //   return (
    //     <InputButton
    //       labelName={'assinatura'}
    //       indexRegister={indexRegister}
    //       register={register}
    //       nameRegister={nameRegister}
    //       isClosed={isClosed}
    //     />
    //   )

    default:
      return null;
  }
}
