import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

interface Account {
  id: number
  customerName: string
  accountNumber: string
  membershipType: string
  enrollmentDate: string
  loyaltyPoints: number
  membershipTier: string
  status: string
}

const AccManagementPage = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 1,
      customerName: 'Alicia Reyes',
      accountNumber: 'ACC-1001',
      membershipType: 'Premium',
      enrollmentDate: '2025-03-10',
      loyaltyPoints: 2540,
      membershipTier: 'VIP',
      status: 'Active'
    },
    {
      id: 2,
      customerName: 'Ben Carter',
      accountNumber: 'ACC-1002',
      membershipType: 'Standard',
      enrollmentDate: '2024-11-20',
      loyaltyPoints: 800,
      membershipTier: 'Regular',
      status: 'Active'
    },
    {
      id: 3,
      customerName: 'Diana Lopez',
      accountNumber: 'ACC-1003',
      membershipType: 'Standard',
      enrollmentDate: '2025-01-16',
      loyaltyPoints: 430,
      membershipTier: 'Retail',
      status: 'Pending'
    }
  ])

  const [editingAccountId, setEditingAccountId] = useState<number | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [membershipType, setMembershipType] = useState('Standard')
  const [enrollmentDate, setEnrollmentDate] = useState('')
  const [loyaltyPoints, setLoyaltyPoints] = useState(0)
  const [membershipTier, setMembershipTier] = useState('Regular')
  const [status, setStatus] = useState('Active')

  const resetForm = () => {
    setEditingAccountId(null)
    setCustomerName('')
    setAccountNumber('')
    setMembershipType('Standard')
    setEnrollmentDate('')
    setLoyaltyPoints(0)
    setMembershipTier('Regular')
    setStatus('Active')
  }

  const startEditAccount = (account: Account) => {
    setEditingAccountId(account.id)
    setCustomerName(account.customerName)
    setAccountNumber(account.accountNumber)
    setMembershipType(account.membershipType)
    setEnrollmentDate(account.enrollmentDate)
    setLoyaltyPoints(account.loyaltyPoints)
    setMembershipTier(account.membershipTier)
    setStatus(account.status)
  }

  const handleSaveAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!customerName.trim() || !accountNumber.trim() || !enrollmentDate.trim()) {
      return
    }

    if (editingAccountId !== null) {
      setAccounts((prev) =>
        prev.map((account) =>
          account.id === editingAccountId
            ? {
                ...account,
                customerName: customerName.trim(),
                accountNumber: accountNumber.trim(),
                membershipType,
                enrollmentDate,
                loyaltyPoints,
                membershipTier,
                status
              }
            : account
        )
      )
    } else {
      const nextId = Math.max(0, ...accounts.map((item) => item.id)) + 1
      setAccounts((prev) => [
        ...prev,
        {
          id: nextId,
          customerName: customerName.trim(),
          accountNumber: accountNumber.trim(),
          membershipType,
          enrollmentDate,
          loyaltyPoints,
          membershipTier,
          status
        }
      ])
    }

    resetForm()
  }

  const handleDeleteAccount = (accountId: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this account?')
    if (!confirmed) return
    setAccounts((prev) => prev.filter((account) => account.id !== accountId))
    if (editingAccountId === accountId) {
      resetForm()
    }
  }

  const summary = useMemo(
    () => ({
      total: accounts.length,
      active: accounts.filter((account) => account.status === 'Active').length,
      points: accounts.reduce((sum, account) => sum + account.loyaltyPoints, 0),
      tiers: accounts.reduce<Record<string, number>>((acc, account) => {
        acc[account.membershipTier] = (acc[account.membershipTier] ?? 0) + 1
        return acc
      }, {})
    }),
    [accounts]
  )

  return (
    <div className="page-container">
      <h2>Account & Membership Management</h2>

      <section className="section-card">
        <h3>{editingAccountId !== null ? 'Update Account' : 'Create New Account'}</h3>
        <form onSubmit={handleSaveAccount} className="form-grid">
          <label>
            Customer name
            <input
              type="text"
              value={customerName}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setCustomerName(event.target.value)}
              placeholder="Example: Alicia Reyes"
              className="full-width"
            />
          </label>
          <label>
            Account number
            <input
              type="text"
              value={accountNumber}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setAccountNumber(event.target.value)}
              placeholder="ACC-1004"
              className="full-width"
            />
          </label>
          <label>
            Membership type
            <select
              value={membershipType}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setMembershipType(event.target.value)}
              className="full-width"
            >
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="Corporate">Corporate</option>
            </select>
          </label>
          <label>
            Enrollment date
            <input
              type="date"
              value={enrollmentDate}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setEnrollmentDate(event.target.value)}
              className="full-width"
            />
          </label>
          <label>
            Loyalty points
            <input
              type="number"
              min={0}
              value={loyaltyPoints}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setLoyaltyPoints(Number(event.target.value))}
              className="full-width"
            />
          </label>
          <label>
            Membership tier
            <select
              value={membershipTier}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setMembershipTier(event.target.value)}
              className="full-width"
            >
              <option value="VIP">VIP</option>
              <option value="Regular">Regular</option>
              <option value="Wholesale">Wholesale</option>
              <option value="Retail">Retail</option>
              <option value="New">New</option>
              <option value="Dormant">Dormant</option>
            </select>
          </label>
          <label>
            Account status
            <select
              value={status}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => setStatus(event.target.value)}
              className="full-width"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
              <option value="Archived">Archived</option>
            </select>
          </label>
          <div className="form-row-buttons">
            <button type="submit" className="primary-button">
              {editingAccountId !== null ? 'Save Account' : 'Create Account'}
            </button>
            <button type="button" onClick={resetForm} className="secondary-button">
              Reset Form
            </button>
          </div>
        </form>
      </section>

      <section className="card-grid">
        <div className="card">
          <h4>Total accounts</h4>
          <p>{summary.total}</p>
        </div>
        <div className="card">
          <h4>Active accounts</h4>
          <p>{summary.active}</p>
        </div>
        <div className="card">
          <h4>Total loyalty points</h4>
          <p>{summary.points}</p>
        </div>
        <div className="card">
          <h4>Tier distribution</h4>
          <ul className="summary-list">
            {Object.entries(summary.tiers).map(([tier, count]) => (
              <li key={tier}>
                {tier}: {count}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-gap">
        <h3>Accounts</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Account #</th>
              <th>Type</th>
              <th>Tier</th>
              <th>Enrollment</th>
              <th>Points</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.customerName}</td>
                <td>{account.accountNumber}</td>
                <td>{account.membershipType}</td>
                <td>{account.membershipTier}</td>
                <td>{account.enrollmentDate}</td>
                <td>{account.loyaltyPoints}</td>
                <td>{account.status}</td>
                <td className="table-actions">
                  <button type="button" onClick={() => startEditAccount(account)} className="secondary-button">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDeleteAccount(account.id)} className="secondary-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default AccManagementPage;