import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { formFields } from "./formFieldsConfig";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(() => '')} autoComplete="off">
      {formFields.map(({ name, label }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={label}
              fullWidth
              margin="normal"
              error={!!errors[name]}
              helperText={errors[name]?.message as string || ''}
              autoComplete="off"
            />
          )}
        />
      ))}
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
    </form>
  );
};

export default RegisterForm;
