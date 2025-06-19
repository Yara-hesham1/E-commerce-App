import React, { useContext } from 'react'
import { cartContext } from '../../context/CartContext'
import LoaderScreen from '../LoaderScreen/LoaderScreen';
import toast from 'react-hot-toast';
import useCart from './useCart';
import { Link } from 'react-router-dom';
import Order from './../Order/Order';

export default function Cart() {

    // const{totalCartPrice,products,updateCount,removeItemFromCart}=useContext(cartContext)
    // console.log(products);

  
    
    // function handleChangeCount(id,newCount){
    //     updateCount(id,newCount)
    // }


    // async function handleDelete(id){
    //    const isSucess=await removeItemFromCart(id)

    //    if(isSucess){
    //     toast.success("Deleted",{position:"top-right"})
    //    }else{
    //     toast.error("error",{position:"top-right"})
    //    }
    // }

    const {products,handleChangeCount,handleDelete,totalCartPrice,handleClearCart}=useCart()

    if(!products){
        return <LoaderScreen/>
    }
  return (
    

<div className="container mx-auto p-5">
    <h1>Cart Page</h1>
    <h2>Total Cart Price:{totalCartPrice}</h2>
    <div className='flex justify-end'>
        <button onClick={()=>handleClearCart() } className=" bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">Clear Cart</button>
    </div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {products?.map(product=><tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img src={product.product.imageCover} class="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.product.title}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <button onClick={()=>handleChangeCount(product.product._id,product.count -1)} class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <div>
                            <input  type="number" id="first_product" value={product.count} class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                        </div>
                        <button  onClick={()=>handleChangeCount(product.product._id,product.count +1)} class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price}EGP
                </td>
                <td className="px-6 py-4">
                    <a onClick={()=>handleDelete(product.product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
            </tr>)}
            
           
        </tbody>
    </table>
    <Link to='/Order'>
    <button className=" bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">Pay Your Products</button>
    </Link>
    
</div>
</div>

  )
}
