
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ErrorMessage, useField } from 'formik';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const FormikTextFieldInput = ({ label, id, name, required }: InputProps) => {
    const [field, meta] = useField(name)
    return (
        <FormControl fullWidth sx={{ m: 1 }}>
            <TextField
                {...field}
                required={required}
                error={Boolean(meta.error && meta.touched)}
                id={id}
                label={label}
            />
            {/* TODO: Style these error messages */}
            <ErrorMessage className={`${inter.className}`} name={name} />
        </FormControl>
    )
}

export default FormikTextFieldInput;
