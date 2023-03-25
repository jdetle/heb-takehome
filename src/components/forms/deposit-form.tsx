import React from 'react';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

type FormValues = {
    depositAmount: number
}

type DepositFormProps = {
    onSuccess: () => void
    onFailure: () => void
}

const DepositSchema = Yup.object().shape({
    depositAmount: Yup.string()
        .required('Required'),
})

const DepositForm = ({ onSuccess, onFailure }: DepositFormProps) => {
    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {

    }
    return (
        <div>
            <h1>Anywhere in your app!</h1>
            <Formik
                initialValues={{ depositAmount: 0 }}
                validate={values => {
                    const errors = {} as FormErrors<FormValues>;
                    if (!values.depositAmount) {
                        errors.depositAmount = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
}
export default DepositForm;
