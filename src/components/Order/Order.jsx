import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'




export default function Order() {
    

   const{cartId,resetValues}= useContext(cartContext)
   const [isCash, setIsCash] = useState(true)

   const formikObj=useFormik({
    initialValues:{
        "details": "",
        "phone": "",
        "city": ""
        
    },
    onSubmit:function(values){
      if(isCash){
        createCashOrder(values)
      }else{
        createCheckout(values)
      }
    }
   })

   async function createCashOrder(values){
        console.log('values',values);
        
       const res=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            {
                shippingAddress:values
            },
            {
                headers:{token:localStorage.getItem('tkn')}
            },
        )
        .then(function(resp){
            if(resp.data.status==='success'){
                toast.success('Order created',{position:"top-right"});
                resetValues()
            }
            return true

        })
        .catch(function(err){
            console.log('err',err);
            

            return false
        })
    
        return res
    }


     function createCheckout(values){
      console.log('values',values);
      
      axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
          {
              shippingAddress:values
          },
          {
              headers:{token:localStorage.getItem('tkn')},
              params:{
                url:'http://localhost:5173'
              }
          },
      )
      .then(function(resp){
          window.open(resp.data.session.url,'_self')

      })
      .catch(function(err){
          console.log('err',err);
        //   console.error('Error:', err.response || err);
        // if (err.response?.data?.session?.cancel_url) {
        //     window.open(err.response.data.session.cancel_url, '_self'); // ✅ Redirect to cancel URL if available
        // } else {
        //     alert('Checkout failed. Please try again.');
        // }
          window.open(err.data.session.cancel_url,'_self')
          

          
      })
  
      
  }


  return (
    <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center py-4 border-b-2 border-gray-300 mb-5" >Create Order</h1>

        

<form onSubmit={formikObj.handleSubmit} className="max-w-sm mx-auto">
  <div className="mb-5">
    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Details</label>
    <input onChange={formikObj.handleChange}  value={formikObj.values.details} type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
    <input onChange={formikObj.handleChange}  value={formikObj.values.phone} type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div className="mb-5">
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your City</label>
    <input onChange={formikObj.handleChange}  value={formikObj.values.city} type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
    
 
 
  <button onClick={()=>setIsCash(true)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">cash order</button>
  <button onClick={()=>setIsCash(false)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Checkout</button>
</form>


    </div>
  )
}
