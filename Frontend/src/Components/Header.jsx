import WishlistIcon from './../assets/wishlist.svg'
import CartIcon from './../assets/cart-dark.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header () {
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()

  async function getUserData (token) {
    try {
      const response = await fetch('http://localhost:3000/user/getOneAuth', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching user data:', error)
      throw error
    }
  }

  // Example usage in a component:
  useEffect(() => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      getUserData(token)
        .then(userData => {
          setUserData(userData)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  return (
    <>
      <header className='border-bottom bg-white'>
        <div className='container-fluid'>
          <div className='row align-items-center py-3'>
            {/* Logo Section */}
            <div className='col-lg-2 d-flex justify-content-center justify-content-md-start'>
              <Link to='/'>
                <img
                  src='images/logo-2.jpeg'
                  alt='logo'
                  className='img-fluid'
                  style={{ maxWidth: '130px', height: 'auto' }}
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className='col-lg-4 col-md-6'>
              <div className='search-bar bg-light p-2 rounded-4 d-flex align-items-center'>
                <input
                  type='text'
                  className='form-control border-0 bg-transparent w-100'
                  placeholder='Search for more than 20,000 products'
                />
                <button className='btn p-0'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z'
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className='col-lg-4'>
              <ul className='navbar-nav d-flex flex-row gap-4 justify-content-center flex-wrap align-items-center text-uppercase fw-bold mb-0'>
                <li className='nav-item'>
                  <Link className='nav-link text-dark' to='/'>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link text-dark' to='/category'>
                    Category
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link text-dark' to='/order'>
                    Orders
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link text-dark' to='/about'>
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* User Account & Cart */}
            <div className='col-lg-2 d-flex align-items-center justify-content-lg-end justify-content-center gap-4'>
              <ul className='d-flex align-items-center list-unstyled m-0 gap-3'>
                {/* Profile Picture */}
                {localStorage.getItem('token') ||
                sessionStorage.getItem('token') ? (
                  <li>
                    <a href='#' className='d-inline-block'>
                      <img
                        src={`./../../Images/UserImage/${userData.UserProfileImage}`}
                        alt='user'
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    </a>
                  </li>
                ) : (
                  <>
                    {/* <li><Link to="/login" className="text-dark fw-bold px-2">Log in</Link></li>
        <li><Link to="/register" className="text-dark fw-bold px-2">Sign up</Link></li> */}
                    <li>
                      <Link
                        to='/login'
                        className='btn btn-outline-primary fw-bold px-2'
                      >
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/register'
                        className='btn btn-outline-primary fw-bold px-2'
                      >
                        Sign up
                      </Link>
                    </li>
                  </>
                )}

                {/* Wishlist & Cart Icons */}
                <li className='px-1'>
                  <Link to='/wishlist'>
                    <img
                      src={WishlistIcon}
                      alt='wishlist'
                      width={28}
                      height={28}
                    />
                  </Link>
                </li>
                <li className='px-1'>
                  <Link to='/cart'>
                    <img src={CartIcon} alt='cart' width={28} height={28} />
                  </Link>
                </li>

                {/* Logout Button */}
                {localStorage.getItem('token') ||
                sessionStorage.getItem('token') ? (
                  <li>
                    <button
                      onClick={() => {
                        if (localStorage.getItem('token'))
                          localStorage.removeItem('token')
                        else if (sessionStorage.getItem('token'))
                          sessionStorage.removeItem('token')
                        navigate('/')
                      }}
                      className='btn btn-danger px-3 py-2 fw-bold'
                      style={{
                        fontSize: '14px',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseOver={e =>
                        (e.target.style.backgroundColor = '#cc0000')
                      }
                      onMouseOut={e =>
                        (e.target.style.backgroundColor = '#ff4d4d')
                      }
                    >
                      Log Out
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
