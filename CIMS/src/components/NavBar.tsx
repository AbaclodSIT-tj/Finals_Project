import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const isLoggedIn = location.pathname !== '/' && location.pathname !== '/SignUp'

  return (
    <nav style={{
      backgroundColor: '#0077cc',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff',
      marginBottom: 24
    }}>
      <div style={{ fontSize: 18, fontWeight: 'bold' }}>
        <Link to="/HomePage" style={{ color: '#fff', textDecoration: 'none' }}>CIMS</Link>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        {isLoggedIn && (
          <>
            <Link to="/HomePage" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
            <Link to="/CustomerSegementPage" style={{ color: '#fff', textDecoration: 'none' }}>Segments</Link>
            <Link to="/AccManagementPage" style={{ color: '#fff', textDecoration: 'none' }}>Accounts</Link>
            <Link to="/DashboardPage" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#ff4444',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar;