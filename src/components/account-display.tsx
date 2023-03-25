import { useContext } from 'react'
import { AccountContext } from './providers/account-info';
const AccountDisplay = () => {
    const { loading, error, accountData } = useContext(AccountContext);
    return <div></div>
}
export default AccountDisplay
