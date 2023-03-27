import React, { useContext } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from 'components/button';
import FormikNumberInput from 'components/formik-number-input';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { AccountContext, validateAccountData } from 'components/providers/account-info';
import { ACCOUNTS_LOCAL_STORAGE } from 'global-constants';

export type FormValues = {
    depositAmount: number
}

type DepositFormProps = {
    onSuccess: (values: FormValues) => void
    onFailure: (msg: string) => void
} & Partial<HTMLDivElement>

const DepositSchema = Yup.object().shape({
    depositAmount: Yup.number()
        .required('Required')
        .positive('Must be a positive number'),
})

const DepositForm = ({ onSuccess, onFailure }: DepositFormProps) => {
    const { accountData } = useContext(AccountContext)
    const handleSubmit = ({ depositAmount }: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(true)
        const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_LOCAL_STORAGE) || '{}')
        const account = accountData && accounts[accountData.id]
        const isValidAccount = accountData && validateAccountData(account)
        if (!isValidAccount) {
            onFailure('Something went wrong submitting deposit')
        } else {
            account.balance = account.balance + depositAmount
            accounts[accountData.id] = account
            localStorage.setItem(ACCOUNTS_LOCAL_STORAGE, JSON.stringify(accounts))
            onSuccess({ depositAmount })
        }
        setSubmitting(false)
    }

    return (
        <Card>
            <CardHeader title="Deposit Funds" />
            <CardContent>
                <Formik
                    enableReinitialize={true}
                    initialValues={{ depositAmount: 0 }}
                    validationSchema={DepositSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        handleSubmit,
                        isSubmitting
                    }) => (

                        <Form onSubmit={handleSubmit}>
                            <FormikNumberInput
                                isCurrency={true}
                                required={true}
                                label="Amount"
                                type="number"
                                id='deposit-input'
                                name="depositAmount"
                            />
                            <CardActions sx={{
                                alignSelf: "stretch",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "flex-start",
                            }}>
                                <Button type="submit" disabled={isSubmitting} variant="contained">
                                    Deposit
                                </Button>
                            </CardActions>
                        </Form>

                    )}
                </Formik>
            </CardContent>
        </Card >
    );
}
export default DepositForm;
