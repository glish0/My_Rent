import {  useState } from 'react';
import '../index.css'


type formData = {
  first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage: null;
}


const Register = () => {
  const [ formData, setFormData] = useState<formData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null
  })

  console.log(formData)
  const handleChange = (e:any) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === 'profileImage'? files[0] : value 
    })
  }

  

  return (
    <div className='register flex flex-col items-center justify-center m-auto'>
      <div className='flex flex-col justify-center   rounded-[20px]  p-10 bg-black opacity-80  gap-[15px] text-white  w-[40%]'>
        <form className='flex flex-col items-center gap-4  '>
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
            className='bg-[#F8395A] cursor-pointer transition mt-4 w-[50%] hover:opacity-40 font-semibold text-lg rounded-[10px] px-2 py-2'
            >REGISTER</button>
        </form>
        <a className='a hover:underline'>Already have an account ? Log in</a>
      </div>
    </div>
  );
}

export default Register;
