
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import { ErrorMessage, useField } from 'formik';
import NativeSelect from '@mui/material/NativeSelect';


type FormikSelectInputProps = InputProps & { options: Array<string> }
const FormikSelectInput = ({ name, id, type, label, options }: FormikSelectInputProps) => {
    const [field, meta] = useField(name)
    return (
        <FormControl fullWidth sx={{ m: 1 }}>
            <NativeSelect
                {...field}
                inputProps={{ 'aria-label': label }}
                error={Boolean(meta.error && meta.touched)}
                type={type}
                id={id}
            >
                {/*https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/ */}
                {
                    options.map(option => {
                        return (
                            <option key={option} value={option}>{option}</option>
                        );
                    })
                }
            </NativeSelect>
            <ErrorMessage name={name} />
        </FormControl>
    )
}

export default FormikSelectInput;
