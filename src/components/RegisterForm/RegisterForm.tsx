import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { formFields } from "./formFieldsConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSchema } from "../../schemes/registerScheme";
import { useMutation } from "@tanstack/react-query";
import { postCustomer } from "../../services/requests";
import { z } from "zod";

const schema = createSchema(formFields);
export type FormData = z.infer<typeof schema>;

const defaultValues = formFields.reduce<Record<string, string>>((acc, field) => {
  if (field.required) {
    acc[field.name] = '';
  }

  return acc;
}, {});

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched"
  });

  const mutation = useMutation({
    mutationFn: postCustomer,
  });

  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      {formFields.map(({ name, label, required }) => (
        <Controller
          key={name}
          name={name as keyof FormData}
          control={control}
          shouldUnregister
          render={({ field }) => (
            <TextField
              {...field}
              label={required ? `${label}*` : label}
              fullWidth
              margin="normal"
              error={!!errors[name as keyof FormData]}
              helperText={errors[name as keyof FormData]?.message}
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
