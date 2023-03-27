declare type FormErrors<T> = {
    [P in keyof T]?: string
}

declare type AccountData = {
    id: string
    pin: string
    balance: number
    withdrawalHistory: Array<{ amount: number, withdrawnAt: number }>
}
declare type ContextualAccountData = {
    loading: boolean
    error: Error | null
    accountData: AccountData | null
    accountIds: string[]
}
declare type InputProps = {
    required: boolean
    label: string
    id: string
    name: string
    type: React.HTMLInputTypeAttribute
}
