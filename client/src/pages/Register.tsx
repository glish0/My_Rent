import {  FormEvent, useEffect, useState } from 'react';
import '../index.css'
import { useNavigate } from 'react-router-dom';


type formDatas = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: File | null;
  [key: string]: string | File | null;
};


const Register = () => {
  const navigate = useNavigate()
  const [ formData, setFormData] = useState<formDatas>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null
  })

  console.log(formData)
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value, files } = e.currentTarget
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === 'profileImage'? files?[0] : value 
    })
  }
  const [passwordMatch, setPasswordMatch ] = useState(true)

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "") 
      
    
  },[])
  const handleSubmit =async (e: FormEvent) => {
    e.preventDefault()

  

    try {
      const register = new FormData()
       
      for (let key in formData) {
        const value = formData[key];
    
        if (value !== null) {
          // Use type assertions or type checks to ensure correct types
          if (typeof value === 'string') {
            register.append(key, value);
          } else if (value instanceof File) {
            register.append(key, value);
          }
          // You can add more conditions for other types if necessary
        }
      }

      const response = await fetch("http://localhost:5000/auth/register",
     { method: "POST",
      body: register,
       headers: {
      "Content-Type": "multipart/form-data",
    },
    }
      )

      if(response.ok){
          navigate("/login")
      }
    } catch (error) {
      console.log("registration failed" ,error)
    }
  }

  return (
    <div className='register flex flex-col items-center justify-center m-auto'>
      <div className='flex flex-col justify-center   rounded-[20px]  p-10 bg-black opacity-80  gap-[15px] text-white  w-[40%]'>
        <form 
        onSubmit={handleSubmit}
        className='flex flex-col items-center gap-4  '>
          <input 
            type='text'
            placeholder='First_name'
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className='w-full text-center px-2 py-3 text-white bg-transparent border-b-[1px]  '
            required
          />
          <input 
            name='last_name'
            type='text'
            placeholder='last name'
            value={formData.last_name}
            onChange={handleChange}
            className='w-full text-center px-2 py-3 text-white bg-transparent border-b-[1px]  '
            required
          />
          <input 
            type='email'
            placeholder='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full text-center px-2 py-3 text-white bg-transparent border-b-[1px]  '
            required
          />
          <input 
            type='password'
            name='password'
            placeholder='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full text-center px-2 py-3 text-white bg-transparent border-b-[1px]  '
            required
          />
          <input 
            type='password'
            placeholder='confirm Password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            className='w-full text-center px-2 py-3 text-white bg-transparent border-b-[1px]  '
            required
          />
          {!passwordMatch && (
            <p className="text-red-500">password are not match </p>
          )}
          <input 
            id='image'
            type='file'
            name='profileImage'
            required
            accept='image/*'
            onChange={handleChange}
            style={{display: 'none'}}
            className='w-full text-center px-2 py-3 text-white bg-transparent border-b-[1px] '
          />
          <label htmlFor='image' className='flex flex-col justify-center items-center gap-2 cursor-pointer text-3 text-white'>

            {formData.profileImage && (
              <img 
                src={URL.createObjectURL(formData.profileImage)}
                alt='profile photo'
                className='w-20'
              />
            )}
            <img src='/assets/addImage.png' alt='add image photo'  className='w-6 '/>
            <p>Upload Profile Image</p>
          </label>

          <button
            type='submit'
            disabled={!passwordMatch}
            className='bg-[#F8395A] cursor-pointer transition mt-4 w-[50%] hover:opacity-40 font-semibold text-lg rounded-[10px] px-2 py-2'
            >REGISTER</button>
        </form>
        <a className='a hover:underline'>Already have an account ? Log in</a>
      </div>
    </div>
  );
}

export default Register;
