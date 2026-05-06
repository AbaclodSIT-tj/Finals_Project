import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      <h1>Welcome to Customer Information Management System</h1>
      <p>Select a feature below to manage your customer data.</p>

      <section className="dashboard-grid" style={{ marginTop: 32 }}>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/CustomerSegementPage')}>
          <h3>Customer Segmentation</h3>
          <p>Create and manage customer segments and classifications.</p>
          <button className="primary-button" style={{ marginTop: 12 }}>Manage Segments</button>
        </div>

        <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/AccManagementPage')}>
          <h3>Account Management</h3>
          <p>Create, update, and manage customer accounts and memberships.</p>
          <button className="primary-button" style={{ marginTop: 12 }}>Manage Accounts</button>
        </div>

        <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/DashboardPage')}>
          <h3>Admin Dashboard</h3>
          <p>View system overview and admin controls.</p>
          <button className="primary-button" style={{ marginTop: 12 }}>View Dashboard</button>
        </div>
      </section>

      <section style={{ marginTop: 48, padding: 16, border: '1px solid #ddd', borderRadius: 8 }}>
        <h2>Quick Links</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="secondary-button" onClick={() => navigate('/CustomerSegementPage')}>Segments</button>
          <button className="secondary-button" onClick={() => navigate('/AccManagementPage')}>Accounts</button>
          <button className="secondary-button" onClick={() => navigate('/DashboardPage')}>Dashboard</button>
          <button className="secondary-button" onClick={() => navigate('/')} style={{ marginLeft: 'auto' }}>Logout</button>
        </div>
      </section>
    </div>
  )
}

export default HomePage;