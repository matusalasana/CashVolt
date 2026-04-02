import React from 'react'
import AccountForm from "../components/AccountForm"
import { useAccounts } from "../hooks/useAccounts"

const Accounts = () => {
  const {data: accounts } = useAccounts()
  return (
    <div>
    {accounts?.length}
      <AccountForm />
    
    </div>
  )
}

export default Accounts