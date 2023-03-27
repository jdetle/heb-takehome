
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { ErrorMessage, Field, useField } from 'formik';

type FormikNumberInputProps = InputProps & { isCurrency: boolean }

const FormikNumberInput = ({ name, id, type, label, isCurrency }: FormikNumberInputProps) => {
    const [field, meta] = useField(name)
    return (
        <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
            <OutlinedInput
                {...field}
                error={Boolean(meta.error && meta.touched)}
                type={type}
                id={id}
                startAdornment={isCurrency && <InputAdornment position="start">$</InputAdornment>}
                label={label}
            />
            <ErrorMessage name={name} />
        </FormControl>
    )
}

export default FormikNumberInput;
