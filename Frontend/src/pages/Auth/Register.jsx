import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../api/axiosClient'


const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePic: null
  })

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    const file= e.target.files[0]
    if(file){
      if(file.size > 5 * 1024 * 1024){
        alert('File size should be less than 5MB');
        return;
      }
      if(!file.type.startsWith("image/")){
        alert('Please select an image file');
        return;
      }
    }
    setFormData({
      ...formData, 
      profilePic: file
    })
  }

  async function handleRegister(e){
    e.preventDefault()

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);

    if (formData.profilePic) {
      data.append("profilePic", formData.profilePic);
    }

    const res = await axiosClient.post("/v1/users/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",  // yaha puchna hai
      },
    });

    console.log("REGISTER SUCCESS:", res.data);

    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-6">
        {/* center card section */}
        <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
            <h2 className='text-2xl font-bold text-center mb-2'>
                Create Account
            </h2>
            <p className='text-center text-gray-600 mb-6'>
                Join our blogging community
            </p>

            <form onSubmit={handleRegister}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm mb-2'>Username:</label>
                <input 
                  type="text" 
                  placeholder='Username' 
                  name='username' 
                  value={formData.username}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm mb-2'>Email:</label>
                <input 
                  type="email" 
                  placeholder='enter email' 
                  name='email' 
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm mb-2'>Password:</label>
                <input 
                  type="password" 
                  placeholder='Enter password' 
                  name='password' 
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm mb-2'>Profile Pic:</label>
                <input
                  type="file"
                  name='profilePic'
                  onChange={handleFileChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  accept='image/*'
                />
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, JPEG files only. Max size: 5MB
                </p>

                {formData.profilePic && (
                  <p className='text-sm text-green-600 mt-2'>Selected: {formData.profilePic.name}</p>
                )}
              </div>

              {/* buttons */}
                <button 
                  type='submit'
                  className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200'
                >
                  Create Account
                </button>
              
            </form>

            {/* ✅ LOGIN LINK */}
                <p className="text-center text-gray-600 mt-6">
                    Already have an account? 
                    <Link to="/login" className="text-blue-500 hover:text-blue-600 ml-1">
                      Sign in
                    </Link>
                </p>
        </div>
    </div>
  )
}

export default Register