import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../api/axiosClient'
import { AuthContext } from '../../Context/AuthContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [loginData, setLoginData] = useState({
    "email": "",
    "password": ""
  })
  const [error, setError] = useState("")
  const [loading, setLoding] = useState(false)

  const handleChange = (e) => {
    setLoginData({
      ...loginData, 
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault()

    setError("")
    setLoding(true)

    try{
      const res = await axiosClient.post("/users/login", {
        email: loginData.email,
        password: loginData.password
      })

      // const token = res.data.token
      localStorage.setItem("token", res.data.token);

      console.log("Login sucess: ", res.data)

      login(res.data.user)

      navigate("/dashboard")
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoding(false);
    }

  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center'>
      <div className='max-w-md w-full rounded-2xl shadow-2xl p-8 bg-white'>
          <h1 className='text-2xl font-bold text-center'>
            Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className='mb-4'>
              <label className='text-sm block text-gray-700 mb-2'>Email:</label>
              <input 
                type="email" 
                name='email'
                placeholder='Enter Email' 
                onChange={handleChange} 
                value={loginData.email}
                className='border px-3 py-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent '
              />
            </div>

            <div className='mb-4'>
              <label className='text-sm block text-gray-700 mb-2'>Password:</label>
              <input 
                type="password" 
                name='password'
                placeholder='Enter Password' 
                onChange={handleChange} 
                value={loginData.password}
                className='border px-3 py-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent '
              />
            </div>

            <button 
              type='submit' 
              disabled={loading}
              className='w-full bg-blue-500 hover:bg-blue-600 font-medium py-3 px-4 rounded-lg transition duration-200'
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {
            <p className="text-center text-gray-600 mt-6">
              If you don't have an account 
              <Link to='/register' className='text-blue-500 hover:text-blue-600 ml-1'>Register</Link>
            </p>
          }
      </div>
    </div>
  )
}

export default Login