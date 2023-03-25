import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

type FormValues = {
    email: string;
    accountId: string;
    pin: string;
}

type CreationFormProps = {
    onSuccess: () => void
    onFailure: () => void
}


const CreationSchema = Yup.object().shape({
    accountId: Yup.string()
        .required('Required'),
    pin: Yup.number()
        .required('Required'),
})



const AccountCreationForm = ({ }: CreationFormProps) => {
    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {

    }
    return (<div>
        <h1>Anywhere in your app!</h1>
        <Formik
            initialValues={{ email: '', pin: '', accountId: '' }}
            validate={values => {
                const errors = {} as FormErrors<FormValues>;
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {errors.email && touched.email && errors.email}
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pin}
                    />
                    {errors.pin && touched.pin && errors.pin}
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    </div>
    );
}

export default AccountCreationForm;
