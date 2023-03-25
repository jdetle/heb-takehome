
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Field } from 'formik';

const FormikTextFieldInput = ({ label, id, name }: InputProps) => {
    return (
        <FormControl fullWidth sx={{ m: 1 }}>
            <Field name={name}>
                <OutlinedInput
                    id={id}
                    label={label}
                />
            </Field>
        </FormControl>
    )
}

export default FormikTextFieldInput;
