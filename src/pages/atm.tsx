import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from 'styles/ATM.module.css'
import AccountLoginForm from 'components/forms/account-login-form'
import WithdrawalForm from 'components/forms/withdrawal-form'
import DepositForm from 'components/forms/deposit-form'

const inter = Inter({ subsets: ['latin'] })

type AccountLoginProps = {
  onSuccess: (accountId: string) => void
}

const AccountLogin = ({ onSuccess }: AccountLoginProps) => {
  const [accountIds, setAccountIds] = useState<Array<string>>([]);
  const onFailure = () => { }
  return <div><AccountLoginForm accountIds={accountIds} onSuccess={onSuccess} onFailure={onFailure} /></div>
}

const AccountInteraction = () => {
  return <div>
    <WithdrawalForm onSuccess={() => { }} onFailure={() => { }} />
    <DepositForm onSuccess={() => { }} onFailure={() => { }} />
  </div>
}


export default function ATM() {
  const [authenticatedId, setAuthenticatedId] = useState<string | null>(null);
  return (
    <>
      <Head>
        <title>HEB ATM</title>
        <meta name="description" content="An HEB ATM Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {authenticatedId ? <AccountInteraction /> : <AccountLogin onSuccess={(accountId: string) => { setAuthenticatedId(accountId) }} />}
      </main>
    </>
  )
}
