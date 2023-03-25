import { Formik, FormikHelpers } from 'formik';
import * as React from 'react'
import * as Yup from 'yup';

type LoginFormProps = {
    accountIds: Array<string>;
    onSuccess: (accountId: string) => void
    onFailure: () => void
}

type FormValues = {
    accountId: string,
    pin: string
}

const LoginSchema = Yup.object().shape({
    accountId: Yup.string()
        .required('Required'),
    pin: Yup.number()
        .required('Required'),
})

const AccountLoginForm = ({ accountIds, onSuccess, onFailure }: LoginFormProps) => {
    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {

    }
    return <div>
        <h1>Anywhere in your app!</h1>
        <Formik
            initialValues={{ accountId: '', pin: '' }}
            validationSchema={LoginSchema}
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
                        value={values.accountId}
                    />
                    {errors.accountId && touched.accountId && errors.accountId}
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
    </div >
}
export default AccountLoginForm;
