import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from 'components/button'

type FormValues = {
    withdrawalAmount: number
}

type WithdrawalFormProps = {
    onSuccess: () => void
    onFailure: () => void
}

const withdrawalSchema = Yup.object().shape({
    depositAmount: Yup.string()
        .required('Required'),
})

const WithdrawalForm = ({ }: WithdrawalFormProps) => {
    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {

    }
    return (
        <div>
            <h1>Anywhere in your app!</h1>
            <Formik
                initialValues={{ depositAmount: 0 }}
                validationSchema={withdrawalSchema}
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
                    <Form onSubmit={handleSubmit}>
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default WithdrawalForm;
