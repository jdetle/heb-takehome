import Button from 'components/button';
import FormikNumberInput from 'components/formik-number-input';
import styles from 'styles/atm.module.css'
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormikSelectInput from 'components/formik-select';
import { ACCOUNTS_LOCAL_STORAGE } from 'global-constants';

type LoginFormProps = {
    accountIds: Array<string>;
    onSuccess: (accountId: string) => void
    onFailure: () => void
} & Partial<HTMLDivElement>

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

const validatePin = ({ accountId, pin }: FormValues) => {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_LOCAL_STORAGE) || '{}')
    if (accounts[accountId] && accounts[accountId].pin == pin) {
        return true
    }
    else {
        return false
    }
}

const AccountLoginForm = ({ accountIds, onSuccess, onFailure, className }: LoginFormProps) => {
    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(true)
        // This would be an API call in real life
        const isValidPin = validatePin(values)
        if (!isValidPin) {
            setSubmitting(false)
            return onFailure()
        }
        onSuccess(values.accountId)
        setSubmitting(false)
    }

    const initialValues = { accountId: accountIds[0] ?? '', pin: '' }
    return (
        <Card className={className}>
            <CardHeader title="Login" />
            <CardContent>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        handleSubmit,
                        isSubmitting
                    }) => {
                        return (

                            <Form onSubmit={handleSubmit}>

                                <FormikSelectInput
                                    required={true}
                                    id="account-id-field"
                                    label="Account ID"
                                    type="text"
                                    name="accountId"
                                    options={accountIds}
                                />
                                <FormikNumberInput
                                    isCurrency={false}
                                    required={true}
                                    label="Pin"
                                    id="pin-input"
                                    type="password"
                                    name="pin"
                                />
                                <CardActions
                                    sx={{
                                        alignSelf: "stretch",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "flex-start",
                                    }}>
                                    <Button variant='contained' type="submit" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                </CardActions>

                            </Form>
                        )
                    }}
                </Formik>
            </CardContent>
        </Card >)
}
export default AccountLoginForm;
