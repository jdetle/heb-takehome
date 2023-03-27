import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormikTextFieldInput from 'components/formik-text-input';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import styles from 'styles/account-creation.module.css'
import { ACCOUNTS_LOCAL_STORAGE } from 'global-constants';


export type FormValues = {
    accountId: string;
    pin: string;
}

type CreationFormProps = {
    onSuccess: (values: FormValues) => void
    onFailure: (msg: string) => void
} & Partial<HTMLDivElement>

const CreationSchema = Yup.object().shape({
    accountId: Yup.string()
        .min(6)
        .max(20)
        .required('A string of length 6-20 is required'),
    pin: Yup.string()
        .length(6)
        .required('A sequence of six whole numbers is required')
        .test('Positive entry', 'Must be a positive number', str => Number(str) > 0),
})



const AccountCreationForm = ({ onSuccess, onFailure }: CreationFormProps) => {
    const router = useRouter();
    const initialValues = { pin: '', accountId: '' }
    const handleSubmit = ({ accountId, pin }: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(true)
        const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_LOCAL_STORAGE) || '{}') as { [key: string]: AccountData }
        if (accounts[accountId]) {
            onFailure(`Account with id: ${accountId} cannot be created`)
        }
        else {
            accounts[accountId] = { id: accountId, pin, withdrawalHistory: [], balance: 100 }
            localStorage.setItem(ACCOUNTS_LOCAL_STORAGE, JSON.stringify(accounts))
            onSuccess({ accountId, pin })
        }
        setSubmitting(false)
        router.push("/")
    }
    return (
        <Card className={styles.formCard}>
            <CardHeader title="Account Creation" />
            <Formik
                initialValues={initialValues}
                validationSchema={CreationSchema}
                onSubmit={handleSubmit}
            >
                {({

                    handleSubmit,
                    isSubmitting
                }) => (
                    <CardContent>
                        <Form onSubmit={handleSubmit}>

                            <FormikTextFieldInput
                                required={true}
                                label="Account ID"
                                type="text"
                                id='account-id-creation-input'
                                name="accountId"
                            />
                            <FormikTextFieldInput
                                required={true}
                                label="Pin Number"
                                type="password"
                                id='account-id-creation-input'
                                name="pin"
                            />
                            <CardActions
                                sx={{
                                    alignSelf: "stretch",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-start",
                                }}>
                                <Button variant='contained' type="submit" disabled={isSubmitting}>Create Account</Button>
                            </CardActions>
                        </Form>
                    </CardContent>)
                }
            </Formik>
        </Card >
    );
}

export default AccountCreationForm;
