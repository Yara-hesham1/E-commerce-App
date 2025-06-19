// import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import React from 'react'
// import useCategories from '../../customHooks/useCategories'

// export default function Categories() {

//   // function getAllCategories(){
//   //    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
//   // }

 
//   // const {data,isLoading}=useQuery({
//   //   queryKey:['getAllCategories'],
//   //   queryFn:getAllCategories,
//   // })
//   // const allCategories=data?.data.data



//   const {data,isLoading}=useCategories()
//   const allCategories=data?.data.data
//   return (
//     <div className='container mx-auto p-5'>
//       <div className="grid md:grid-cols-3 lg:grid-col-5 ">
//         {allCategories?.map(category=><div key={category._id}>
//           <img className='w-full' src={category.image} alt="" />
//           <h2>{category.name}</h2>
//           </div>)}

//       </div>
//     </div>
   
//   )
// }


import React from 'react'
import useCategories from '../../customHooks/useCategories'

export default function Categories() {
  const { data, isLoading } = useCategories()
  const allCategories = data?.data.data

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-emerald-400 border-solid"></div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className="text-3xl font-bold text-center text-emerald-600 mb-10">Shop by Category</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {allCategories?.map(category => (
          <div
            key={category._id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <img
              className="w-full h-48 object-cover"
              src={category.image}
              alt={category.name}
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
