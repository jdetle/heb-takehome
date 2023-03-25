declare type FormErrors<T> = {
    [P in keyof T]?: string
}

declare type AccountData = {
    balance: number
    withdrawalHistory: Array<{ amount: number, withdrawnAt: string }>
}
declare type ContextualAccountData = {
    loading: boolean
    error: Error | null
    accountData: AccountData | null
    accountIds: string[]
}
declare type InputProps = {
    label: string
    id: string
    name: string
    onChange: () => void
    onBlur: () => void
}
