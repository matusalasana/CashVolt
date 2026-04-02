
import { useState } from 'react'
import { useAccounts } from "../hooks/useAccounts"

const AccountCard = () => {
  const [editingAccount, setEditingAccount] = useState<AccountInput | null>(null)
  const { data: accounts } = useAccounts()
  return (
    <div>
      {accounts?.map(account => (
        <div key={account.id}>
          <span>{account.name}</span>
          <button onClick={() => setEditingAccount(account)}>
            Edit
          </button>
        </div>
      ))}

      {editingAccount && (
        <div className="modal">
          <AccountForm 
            account={editingAccount}
            mode="edit"
            onClose={() => setEditingAccount(null)}
          />
        </div>
      )}
    </div>
  )
}

export default AccountCard