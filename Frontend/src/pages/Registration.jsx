import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login/login.css'

export default function Registration () {
  const [formData, setFormData] = useState({
    UserProfileImage: null,
    UserName: '',
    UserEmail: '',
    UserPassword: '',
    UserContact: '',
    UserAddress: '',
    UserCity: '',
    UserState: '',
    UserCountry: '',
    UserPincode: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    setFormData(prevData => ({ ...prevData, UserProfileImage: file }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (
      !Object.values(formData)
        .filter(v => v !== null)
        .every(field => field)
    ) {
      setError('All fields are required.')
      return
    }
    setLoading(true)
    setError('')

    const formDataToSend = new FormData()
    for (const key in formData) {
      formDataToSend.append(key, formData[key])
    }

    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        body: formDataToSend
      })
      const result = await response.json()
      if (response.ok) {
        localStorage.setItem('token', result.token)
        navigate('/')
      } else {
        setError(result.message || 'Something went wrong')
      }
    } catch (err) {
      setError(err + ' Error while communicating with the server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`container-fluid min-vh-100 d-flex align-items-center justify-content-center ${
        darkMode ? 'bg-dark text-white' : 'bg-light text-dark'
      }`}
    >
      <div
        className='card shadow-lg p-5 rounded w-100 mx-auto'
        style={{ maxWidth: '850px' }}
      >
        <div className='d-flex justify-content-between align-items-center mb-3'>
          {/* Dark Mode Toggle Button */}
          <button
            className={`btn btn-sm ${darkMode ? 'btn-light' : 'btn-dark'}`}
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              borderRadius: '5px',
              transition: '0.3s ease-in-out'
            }}
          >
            {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
          </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;;&nbsp;
          {/* Heading */}
          <h2
            className='fw-bold text-center'
            style={{
              fontSize: '24px',
              margin: '0 auto'
            }}
          >
            Welcome to SkylineShopper
          </h2>
        </div>
            <br />
        {/* Registration Form */}
        <div className='row g-4'>
          {/* Profile Image Upload */}
          <div className='col-md-4 d-flex flex-column align-items-center'>
            <label htmlFor='UserProfileImage' className='position-relative'>
              <input
                type='file'
                id='UserProfileImage'
                className='d-none'
                accept='image/*'
                onChange={handleImageChange}
              />
              <div
                className='rounded-circle d-flex align-items-center justify-content-center bg-light shadow-sm'
                style={{
                  width: '130px',
                  height: '130px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  border: '4px solid #4aa847'
                }}
              >
                {formData.UserProfileImage ? (
                  <img
                    src={URL.createObjectURL(formData.UserProfileImage)}
                    alt='Profile'
                    className='w-100 h-100'
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <span className='text-muted fs-3'>+</span>
                )}
              </div>
            </label>
          </div>

          {/* Form Fields */}
          <div className='col-md-8'>
            <form onSubmit={handleSubmit}>
              <div className='row g-3'>
                <div className='col-md-6'>
                  <input
                    type='text'
                    className='form-control form-control-lg rounded-pill shadow-sm'
                    name='UserName'
                    placeholder='Username'
                    value={formData.UserName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    type='email'
                    className='form-control form-control-lg rounded-pill shadow-sm'
                    name='UserEmail'
                    placeholder='Email'
                    value={formData.UserEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    type='password'
                    className='form-control form-control-lg rounded-pill shadow-sm'
                    name='UserPassword'
                    placeholder='Password'
                    value={formData.UserPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    type='text'
                    className='form-control form-control-lg rounded-pill shadow-sm'
                    name='UserContact'
                    placeholder='Contact Number'
                    value={formData.UserContact}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col-md-12'>
                  <input
                    type='text'
                    className='form-control form-control-lg rounded-pill shadow-sm'
                    name='UserAddress'
                    placeholder='Address'
                    value={formData.UserAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col-md-4'>
                  <input
                    type='text'
                    className='form-control form-control-lg rounded-pill shadow-sm'
                    name='UserCity'
                    placeholder='City'
                    value={formData.UserCity}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col-md-4'>
                  <input
                    type='text'
                    className='form-control form-control-lg rounded-pill shadow-sm'
                    name='UserState'
                    placeholder='State'
                    value={formData.UserState}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col-md-4'>
                  <input
                    type='text'
                    className='form-control form-control-lg rounded-pill shadow-sm'
                    name='UserCountry'
                    placeholder='Country'
                    value={formData.UserCountry}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='col-md-6 mx-auto'>
                  <input
                    type='text'
                    className='form-control form-control-lg rounded-pill shadow-sm'
                    name='UserPincode'
                    placeholder='Pincode'
                    value={formData.UserPincode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {error && <div className='alert alert-danger mt-3'>{error}</div>}

              {/* Submit Button */}
              <button
                type='submit'
                className='btn btn-success w-100 mt-4 rounded-pill shadow-sm py-3'
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
