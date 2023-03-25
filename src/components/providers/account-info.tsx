import { useState, useEffect, createContext } from 'react';
import { ACCOUNT_LOCAL_STORAGE } from 'global-constants'

type AccountContextProviderProps = {
    accountId: string
    children: React.ReactNode
}

export const AccountContext = createContext<ContextualAccountData>({
    loading: false,
    accountData: null,
    error: null,
    accountIds: []
});

const useAccountData = (accountId: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [accountData, setAccountData] = useState<AccountData | null>(null);
    const [accountIds, setAccountIds] = useState<string[]>([])
    useEffect(() => {
        setLoading(true)
        // Check that the data actually satisfies the type
        function validateAccountData(data: any): data is AccountData {
            let _data = data as AccountData;
            return Boolean(_data.balance && _data.withdrawalHistory)
        }
        const accounts = JSON.parse(localStorage.getItem(ACCOUNT_LOCAL_STORAGE) || '{}');
        const account = accounts[accountId] || {}
        if (validateAccountData(account)) {
            setAccountData(account)
            setAccountIds(Object.keys(accounts))
        } else {
            setError(new Error('Something went wrong fetching account data'))
        }
        return () => {
            setLoading(false);
        }
    }, [accountId])
    return {
        loading, error, accountData, accountIds
    }
}

const AccountContextProvider = ({ children, accountId }: AccountContextProviderProps) => {
    const { loading, error, accountData, accountIds } = useAccountData(accountId)
    return (
        <AccountContext.Provider value={{ loading, error, accountData, accountIds }}>
            {children}
        </AccountContext.Provider >
    )
}

export default AccountContextProvider
