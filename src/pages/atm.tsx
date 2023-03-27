import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from 'styles/atm.module.css'
import AccountLoginForm from 'components/forms/login'
import WithdrawalForm, { FormValues as WithdrawFormValues } from 'components/forms/withdraw'
import DepositForm, { FormValues as DepositFormValues } from 'components/forms/deposit'
import AccountContextProvider, { useAccountData } from 'components/providers/account-info'
import { Alert, AlertProps, Avatar, Button, Card, CardContent, CardHeader, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import Typography from '@mui/material/Typography';
import { ACCOUNTS_LOCAL_STORAGE } from 'global-constants'
import { useRouter } from 'next/router'
import { blue } from '@mui/material/colors'

type AccountLoginProps = {
  onSuccess: (accountId: string) => void
}

const AccountLogin = ({ onSuccess }: AccountLoginProps) => {
  const [accountIds, setAccountIds] = useState<Array<string>>([]);
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_LOCAL_STORAGE) || '{}')
    setAccountIds(Object.keys(accounts))
  }, [])
  const onFailure = () => {

  }
  return (
    <AccountLoginForm accountIds={accountIds} onSuccess={onSuccess} onFailure={onFailure} />
  );
}
const AccountManagement = ({ accountId }: { accountId: string }) => {
  const router = useRouter()
  const [dialog, setDialog] = useState<AlertProps & { message: string } | null>(null)
  const { accountData } = useAccountData(accountId)
  const handleDialogClose = () => {
    setDialog(null)
    router.push('/')
  }
  const onWithdrawSuccess = ({ withdrawalAmount }: WithdrawFormValues) => {
    setDialog({ severity: 'success', message: `Successfully withdrew $${withdrawalAmount}` })
  }
  const onWithdrawFailure = (msg: string) => {
    setDialog({
      severity: 'error', message: msg
    })

  }
  const onDepositSuccess = ({ depositAmount }: DepositFormValues) => {
    setDialog({ severity: 'success', message: `Successfully deposited $${depositAmount}` })
  }

  const onDepositFailure = (msg: string) => {
    setDialog({
      severity: 'error', message: msg
    })
  }
  return (
    <div className={styles.grid}>
      <WithdrawalForm className={styles.withdraw} onSuccess={onWithdrawSuccess} onFailure={onWithdrawFailure} />

      <DepositForm className={styles.deposit} onSuccess={onDepositSuccess} onFailure={onDepositFailure} />
      <Card className={styles.status}>
        <CardHeader title="Account Info" />
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>{`Account ID: ${accountData?.id}`}</Typography>
          <Typography variant="subtitle1" gutterBottom>{`Balance: $${accountData?.balance}`}</Typography>
        </CardContent>
      </Card>

      <Dialog onClose={handleDialogClose} open={Boolean(dialog)}>
        {dialog &&
          <Card className={styles.dialog}>

            <DialogTitle>{dialog.severity === 'error' ? 'Something went wrong' : 'Success!'}</DialogTitle>
            <Alert severity={dialog.severity}>{dialog?.message}</Alert>
            <Button onClick={handleDialogClose}>Ok</Button>
          </Card>
        }
      </Dialog>
    </div >
  )
}


export default function ATM() {
  const [authenticatedId, setAuthenticatedId] = useState<string>('');
  return (
    <>
      <Head>
        <title>HEB ATM</title>
        <meta name="description" content="An HEB ATM Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AccountContextProvider accountId={authenticatedId}>
          {authenticatedId ? <AccountManagement accountId={authenticatedId} /> : <AccountLogin onSuccess={(accountId: string) => { setAuthenticatedId(accountId) }} />}
        </AccountContextProvider>
      </main>
    </>
  )
}
