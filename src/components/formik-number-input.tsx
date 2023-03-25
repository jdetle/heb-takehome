
import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Field } from 'formik';


const ATMInput = () => {
    return (
        <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <Field>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    label="Amount"
                />
            </Field>
        </FormControl>
    )
}

export default ATMInput;
