import { useContext } from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from 'components/button'
import FormikNumberInput from 'components/formik-number-input';
import { AccountContext, validateAccountData } from 'components/providers/account-info';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { ACCOUNTS_LOCAL_STORAGE, WITHDRAWAL_LIMIT } from 'global-constants';

export type FormValues = {
    withdrawalAmount: number
}

type WithdrawalFormProps = {
    onSuccess: (values: FormValues) => void
    onFailure: (msg: string) => void
} & Partial<HTMLDivElement>

const withdrawalSchema = Yup.object().shape({
    withdrawalAmount: Yup.number()
        .required('Required')
        .positive('Must be a positive number'),
})
const withdrawalLimitReached = ({ history, now, withdrawalAmount }: { history: AccountData['withdrawalHistory'], now: number, withdrawalAmount: number }) => {
    const sortedHistory = history.sort((a, b) => b.withdrawnAt - a.withdrawnAt);
    let withdrawnInLast24 = 0;
    for (let withdrawal of sortedHistory) {
        const diffInHours = (now - withdrawal.withdrawnAt) / (1000 * 3600);
        if (diffInHours < 24) {
            withdrawnInLast24 += withdrawal.amount
        } else {
            break;
        }
    }
    return withdrawnInLast24 + withdrawalAmount > WITHDRAWAL_LIMIT
}
const WithdrawalForm = ({ onFailure, onSuccess }: WithdrawalFormProps) => {
    const { accountData } = useContext(AccountContext);
    const handleSubmit = ({ withdrawalAmount }: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(true)
        const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_LOCAL_STORAGE) || '{}')
        const account = accountData && accounts[accountData.id]
        const isValidAccount = accountData && validateAccountData(account)
        if (!isValidAccount) {
            return onFailure('Something went wrong submitting withdrawal')
        } else {
            account.balance = account.balance - withdrawalAmount
            if (account.balance < 0) {
                return onFailure('Cannot withdraw more than total balance')
            }
            const limitReached = withdrawalLimitReached({ history: account.withdrawalHistory, now: Date.now(), withdrawalAmount })
            if (limitReached) {
                return onFailure('Withdrawal limit reached, cannot withdraw')
            }
            account.withdrawalHistory.push({ amount: withdrawalAmount, withdrawnAt: Date.now() })
            accounts[accountData.id] = account
            localStorage.setItem(ACCOUNTS_LOCAL_STORAGE, JSON.stringify(accounts))
            onSuccess({ withdrawalAmount })
        }
        setSubmitting(false)
    }
    return (
        <Card>
            <CardHeader title="Withdraw funds">Withdraw</CardHeader>
            <CardContent>

                <Formik
                    enableReinitialize={true}
                    initialValues={{ withdrawalAmount: 0 }}
                    validationSchema={withdrawalSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        handleSubmit,
                        isSubmitting,
                    }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <FormikNumberInput
                                    isCurrency={true}
                                    required={true}
                                    label="Amount"
                                    type="number"
                                    id='withdraw-input'
                                    name="withdrawalAmount"
                                />
                                <CardActions sx={{
                                    alignSelf: "stretch",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "flex-start",
                                }}>
                                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                                        Withdraw
                                    </Button>
                                </CardActions>
                            </Form>
                        )
                    }
                    }
                </Formik>
            </CardContent>
        </Card >);
}


export default WithdrawalForm;
