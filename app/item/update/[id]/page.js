"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { use } from 'react'
import useAuth from '../../../utils/useAuth'

const UpdateItem = ({params}) => {
    const unwrappedParams = use(params)
    const[title,setTitle]=useState("")
    const[price,setPrice]=useState("")
    const[image,setImage]=useState("")
    const[description,setDescription]=useState("")
    const[email,setEmail]=useState("")

    const router=useRouter()
    const loginUserEmail=useAuth()

    useEffect(()=>{
        const getSingleItem=async()=>{
        
        const response=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${unwrappedParams.id}`)
        const jsonData=await response.json()
        const singleItem=jsonData.singleItem
        setTitle(singleItem.title)
        setPrice(singleItem.price)
        setImage(singleItem.image)
        setDescription(singleItem.description)
        setEmail(singleItem.email)
        }
        getSingleItem()
    },[unwrappedParams.id])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${unwrappedParams.id}`,{
                method:"PUT",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                },
                body:JSON.stringify({
                    title:title,
                    price:price,
                    image:image,
                    description:description,
                    email:loginUserEmail
                })
            })
            const jsonData=await response.json()
            alert(jsonData.message)
            router.push("/")
        }catch{
            alert("アイテム編集失敗")
        }
    }
    if(loginUserEmail===email){
        return (
    <div>
      <h1 className='page-title'>アイテム編集</h1>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e)=>setTitle(e.target.value)}
        type="text" name="title" placeholder='アイテム名' required/>
        <input value={price} onChange={(e)=>setPrice(e.target.value)} 
        type="text" name="price" placeholder='価格' required/>
        <input value={image} onChange={(e)=>setImage(e.target.value)} 
        type="text" name="image" placeholder='画像' required/>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)}
        name="description" rows={15} placeholder='商品説明' required></textarea>
        <button>編集</button>
      </form>
    </div>
  )
    }
  
}

export default UpdateItem
