const DashboardPage = () => {
  return (
    <div className="page-container">
      <h2>Admin Dashboard</h2>
      <p>
        Welcome to the customer information management dashboard. Use the navigation to access segmentation, account management, and membership administration.
      </p>

      <section className="dashboard-grid">
        <div className="card">
          <h3>Customer segmentation</h3>
          <p>Create, update, and remove customer segments. See segment distribution and reassign affected customers.</p>
        </div>
        <div className="card">
          <h3>Account & membership</h3>
          <p>Manage accounts, enrollment dates, loyalty points, membership tiers, and account status.</p>
        </div>
        <div className="card">
          <h3>User roles & access</h3>
          <p>Monitor admin access and role-based permissions for secure dashboard use.</p>
        </div>
      </section>

      <section className="section-card">
        <h3>Summary</h3>
        <ul className="summary-list">
          <li>Real-time customer segment definitions and performance summary.</li>
          <li>Account lifecycle controls for create, update, renew, and archive.</li>
          <li>Membership tier upgrades and loyalty point tracking.</li>
        </ul>
      </section>
    </div>
  )
}
export default DashboardPage;