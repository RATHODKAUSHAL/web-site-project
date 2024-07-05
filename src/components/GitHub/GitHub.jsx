import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
function GitHub() {
    const data = useLoaderData()
    // const [data, setData] = useState([])
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/RATHODKAUSHAL')
    //     .then(Response => Response.json())
    //     .then(data => {
    //         setData(data)
    //     })
    // }, [])
    
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
        GitHub followers: {data.followers}
      
    </div>
  )
} 

export default GitHub

export const githubInfoLoader =async () => {
    const response = await fetch('https://api.github.com/users/RATHODKAUSHAL')
    return response.json()
}          
