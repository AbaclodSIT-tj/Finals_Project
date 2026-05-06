import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

interface Segment {
  id: number
  name: string
  description: string
  threshold: number
  active: boolean
}

interface Customer {
  id: number
  name: string
  accountValue: number
  segment: string
  loyaltyPoints: number
  status: string
}

const CustomerSegementPage = () => {
  const [segments, setSegments] = useState<Segment[]>([
    { id: 1, name: 'VIP Customer', description: 'Highly valued customer', threshold: 20000, active: true },
    { id: 2, name: 'Regular Customer', description: 'Average consumer', threshold: 5000, active: true },
    { id: 3, name: 'Wholesale Customer', description: 'Buy and sell customer', threshold: 15000, active: true },
    { id: 4, name: 'Retail Customer', description: 'Personal use customer', threshold: 2000, active: true },
    { id: 5, name: 'New Customer', description: 'First-time customer', threshold: 0, active: true },
    { id: 6, name: 'Dormant Customer', description: 'Inactive customer', threshold: 0, active: true }
  ])

  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: 'Alicia Reyes', accountValue: 28000, segment: 'VIP Customer', loyaltyPoints: 2500, status: 'Active' },
    { id: 2, name: 'Ben Carter', accountValue: 7200, segment: 'Regular Customer', loyaltyPoints: 900, status: 'Active' },
    { id: 3, name: 'Carlton Smith', accountValue: 17000, segment: 'Wholesale Customer', loyaltyPoints: 1600, status: 'Active' },
    { id: 4, name: 'Diana Lopez', accountValue: 3400, segment: 'Retail Customer', loyaltyPoints: 420, status: 'Active' },
    { id: 5, name: 'Elena Park', accountValue: 1200, segment: 'New Customer', loyaltyPoints: 120, status: 'Pending' },
    { id: 6, name: 'Frank Gomez', accountValue: 0, segment: 'Dormant Customer', loyaltyPoints: 40, status: 'Inactive' }
  ])

  const [editingSegmentId, setEditingSegmentId] = useState<number | null>(null)
  const [nameInput, setNameInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [thresholdInput, setThresholdInput] = useState(0)
  const [activeInput, setActiveInput] = useState(true)

  const resetForm = () => {
    setEditingSegmentId(null)
    setNameInput('')
    setDescriptionInput('')
    setThresholdInput(0)
    setActiveInput(true)
  }

  const startAddSegment = () => {
    resetForm()
  }

  const startEditSegment = (segment: Segment) => {
    setEditingSegmentId(segment.id)
    setNameInput(segment.name)
    setDescriptionInput(segment.description)
    setThresholdInput(segment.threshold)
    setActiveInput(segment.active)
  }

  const handleSaveSegment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!nameInput.trim()) {
      return
    }

    if (editingSegmentId !== null) {
      setSegments((prev) =>
        prev.map((segment) =>
          segment.id === editingSegmentId
            ? {
                ...segment,
                name: nameInput.trim(),
                description: descriptionInput.trim(),
                threshold: thresholdInput,
                active: activeInput
              }
            : segment
        )
      )
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.segment === segments.find((s) => s.id === editingSegmentId)?.name
            ? { ...customer, segment: nameInput.trim() }
            : customer
        )
      )
    } else {
      const nextId = Math.max(0, ...segments.map((item) => item.id)) + 1
      setSegments((prev) => [
        ...prev,
        {
          id: nextId,
          name: nameInput.trim(),
          description: descriptionInput.trim(),
          threshold: thresholdInput,
          active: activeInput
        }
      ])
    }

    resetForm()
  }

  const handleDeleteSegment = (segmentId: number) => {
    const segment = segments.find((item) => item.id === segmentId)
    if (!segment) return

    const assignedCustomers = customers.filter((customer) => customer.segment === segment.name)
    if (assignedCustomers.length > 0) {
      const availableSegments = segments.filter((item) => item.id !== segmentId && item.active)
      if (availableSegments.length === 0) {
        alert('Cannot delete segment while customers are still assigned and no active replacement exists.')
        return
      }

      const replacement = availableSegments[0]
      const confirmed = window.confirm(
        `Segment "${segment.name}" has ${assignedCustomers.length} assigned customer(s). ` +
          `These customers will be reassigned to "${replacement.name}" before deletion. Continue?`
      )
      if (!confirmed) {
        return
      }

      setCustomers((prev) =>
        prev.map((customer) =>
          customer.segment === segment.name ? { ...customer, segment: replacement.name } : customer
        )
      )
    }

    setSegments((prev) => prev.filter((item) => item.id !== segmentId))
    if (editingSegmentId === segmentId) {
      resetForm()
    }
  }

  const handleCustomerReassign = (customerId: number, newSegment: string) => {
    setCustomers((prev) =>
      prev.map((customer) => (customer.id === customerId ? { ...customer, segment: newSegment } : customer))
    )
  }

  const segmentCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    segments.forEach((segment) => {
      counts[segment.name] = 0
    })
    customers.forEach((customer) => {
      counts[customer.segment] = (counts[customer.segment] ?? 0) + 1
    })
    return counts
  }, [segments, customers])

  const topSegment = useMemo(() => {
    return Object.entries(segmentCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'None'
  }, [segmentCounts])

  const activeSegments = useMemo(() => segments.filter((segment) => segment.active), [segments])

  return (
    <div className="page-container">
      <h2>Customer Segmentation & Classification Management</h2>

      <section className="section-card">
        <h3>{editingSegmentId !== null ? 'Edit Segment' : 'Create New Segment'}</h3>
        <form onSubmit={handleSaveSegment} className="form-grid">
          <label>
            Segment name
            <input
              type="text"
              value={nameInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNameInput(event.target.value)}
              placeholder="VIP Customer"
              className="full-width"
            />
          </label>

          <label>
            Description
            <input
              type="text"
              value={descriptionInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setDescriptionInput(event.target.value)}
              placeholder="High-value accounts"
              className="full-width"
            />
          </label>

          <label>
            Spending threshold
            <input
              type="number"
              value={thresholdInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setThresholdInput(Number(event.target.value))}
              min={0}
              className="full-width"
            />
          </label>

          <label className="form-row-flex">
            <input
              type="checkbox"
              checked={activeInput}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setActiveInput(event.target.checked)}
            />
            Active segment
          </label>

          <div className="form-row-buttons">
            <button type="submit" className="primary-button">
              {editingSegmentId !== null ? 'Save Segment' : 'Add Segment'}
            </button>
            {editingSegmentId !== null && (
              <button type="button" onClick={resetForm} className="secondary-button">
                Cancel
              </button>
            )}
            {editingSegmentId === null && (
              <button type="button" onClick={startAddSegment} className="secondary-button">
                Reset Form
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card-grid">
        <div className="card">
          <h4>Total segments</h4>
          <p>{segments.length}</p>
        </div>
        <div className="card">
          <h4>Active segments</h4>
          <p>{activeSegments.length}</p>
        </div>
        <div className="card">
          <h4>Total customers</h4>
          <p>{customers.length}</p>
        </div>
        <div className="card">
          <h4>Top segment</h4>
          <p>{topSegment}</p>
        </div>
      </section>

      <section className="section-gap">
        <h3>Segment definitions</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Threshold</th>
              <th>Customers</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((segment) => (
              <tr key={segment.id}>
                <td>{segment.name}</td>
                <td>{segment.description}</td>
                <td>₱{segment.threshold.toLocaleString()}</td>
                <td>{segmentCounts[segment.name] ?? 0}</td>
                <td>{segment.active ? 'Active' : 'Inactive'}</td>
                <td className="table-actions">
                  <button onClick={() => startEditSegment(segment)} className="secondary-button">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteSegment(segment.id)} className="secondary-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="section-gap">
        <h3>Customer assignment and distribution</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Account value</th>
              <th>Segment</th>
              <th>Loyalty points</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>₱{customer.accountValue.toLocaleString()}</td>
                <td>
                  <select
                    aria-label={`Assign segment for ${customer.name}`}
                    value={customer.segment}
                    onChange={(event) => handleCustomerReassign(customer.id, event.target.value)}
                    className="select-full"
                  >
                    {segments.map((segment) => (
                      <option key={segment.id} value={segment.name}>
                        {segment.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{customer.loyaltyPoints}</td>
                <td>{customer.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default CustomerSegementPage;