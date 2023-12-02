import React from 'react'
import { useState } from 'react'
import {useNavigate} from'react-router-dom'
import {preview} from"../assets"
import { getRamdomPrompt } from '../utils'
import FormField from '../components/FormField'
import Loader from '../components/Loader'

export default function CreatePost() {
  const navigate=useNavigate();
  const [form ,setForm]=useState({
    name:'',
    prompt:'',
    photo:'',
  })
  const [generatingImg,setGeneratingImg]=useState(false)
  const [loading,setLoading]=useState(false)

  const generateImage=async()=>{
    if(form.prompt){
      try {
        console.log(form)
        setGeneratingImg(true);
        const response=await fetch ("http://localhost:4000/api/v1/dalle",{
          method:'POST',
          headers:{
           'Content-Type': 'application/json'
          },
          body:JSON.stringify(form)
        })
        const data=await response.json();
        setForm({...form,photo:`data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error)
      }
      finally{
        setGeneratingImg(false)
      }
    }
    else{
      alert('please enter a prompt')
    }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(form.prompt && form.photo){
      setLoading(true)
      try {
        const response=await fetch("http://localhost:4000/api/v1/post",{
          method:'POST',
          headers:{
           'Content-Type': 'application/json'
          },
          body:JSON.stringify(form)
        })
        await response.json()
        navigate('/');
        
      } catch (error) {
        alert(error)
      }
      finally{
        setLoading(false)
      }
    }
    else{
      alert("plz.. enter prompt and photos")
    }


  }
  const handleChange=(e)=>{
    e.preventDefault()
    setForm({...form,[e.target.name]:e.target.value})
    
  }

  const handleSurpriceMe=()=>{
    const randomPrompt=getRamdomPrompt(form.prompt)
    setForm({...form,prompt:randomPrompt})
  }

  return (
    <section className='max-w-7xl mx-auto'>
        <div>
        <h1 className='font-extrabold text-[32px]'>
                Create                
            </h1>
            <p className='mt-2 text-gray-600 text-[16px] max-w-[500px]'>
                Create imaginative and visually stunning images genrated by Open Ai and share them with community  
            </p>
        </div>
        <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5  '>
            <FormField
            LabelName="Your Name"
            type="text"
            name='name'
            placeholder='john Deo'
            value={form.name}
            handleChange={handleChange}
            />
            <FormField
            LabelName="Prompt"
            type="text"
            name='prompt'
            placeholder='an oil painting by Matisse of a humanoid robot playing chess'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriceMe 
            handleSurpriceMe={handleSurpriceMe}
            />

          <div className='relative bg-[#DDF2FD] border border-gray-500 text-gray-900 text-sm rounded-lg 
            focus:ring-[#164863] focus:border-[#164863] w-64 p-3 h-64 flex justify-center items-center'>
              {form.photo?(
                <img src={form.photo} alt={form.photo}
                className='w-full h-full object-contain' />
              ):
              (<img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40' />

               )}

              {generatingImg && (
                <div className='absolute z-0 inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]
                rounded-lg'>
                  <Loader/>
                </div>
              )

              }
          </div>
          </div>

          <div className='mt-5 flex gap-5'>
            <button type='button' onClick={generateImage} className='text-white font-medium rounded-lg text-sm w-full
            sm:mx-auto px-2 py-2 text-center bg-[#164863]'>
              {generatingImg?'Generating...':'Generate'}
            </button>

          </div>
          <div className='mt-6'>
            <p className='mt-2 text-[#35393c] text-[14px] '>
              Once you have generated the Image you want, you can share it with others in the community
            </p>
            <button onSubmit={handleSubmit} className='mt-4 text-white bg-[#427D9D]  font-medium rounded-md w-full text-sm sm:m-auto 
            p-2 text-center'  type='submit'>
              {loading?'Sharing..':'Share with community'}
            </button>

          </div>
        </form>
    </section>
    )
}
