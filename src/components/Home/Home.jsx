import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import LoaderScreen from '../LoaderScreen/LoaderScreen';
import HomeSlider from '../HomeSlider/HomeSlider';
import Categories from '../Categories/Categories';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import { useQuery } from '@tanstack/react-query';
import { data, Link} from 'react-router-dom';

import ProductDetails from './../ProductDetails/ProductDetails';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';



export default function Home() {


    const {addProductToCart}=useContext(cartContext)

    // const [allProducts, setallProducts] = useState(null)
    // const [isLoading, setIsLoading] = useState(false)

    // function getAllProducts(){
    //     setIsLoading(true)
    //     axios.get('https://ecommerce.routemisr.com/api/v1/products',{params:{sort:'Price'}})
    //     .then(function(response){
    //        console.log('response',response.data.data);
    //        setallProducts(response.data.data)
    //        setIsLoading(false)
           
    //     })
    //     .catch(function(err){
    //         console.log(err);
    //         setIsLoading(false)

    //     })
    // }

    // useEffect(()=>{
    //     getAllProducts()
    // },[])

    async function handleAddProduct(id){
        const res=await addProductToCart(id)
        if(res){

            toast.success('Product Added Sucessfully',{duration:3000,position:'top-right'})
        }else{

            toast.error('Error',{duration:3000,position:'top-right'})
        }
    }

    function getAllProducts2(){
      return  axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }
    const {data,isFetching,isLoading,error,isError}=useQuery({
        queryKey:['getAllProducts'],
        queryFn:getAllProducts2,
    })
    
    console.log('data',data);
    console.log('isLoading',isLoading);
    console.log('isFetching',isFetching);
    const allProducts=data?.data.data



    if(isLoading){
        return <LoaderScreen/>
    }
    if(isError){
        <h2>orror Occoured</h2>
    }

  return (
    <div className='container mx-auto'>


        {/* <HomeSlider/> */}



        {/* {isLoading&&<LoaderScreen/>} */}

        <div className="flex flex-col gap-5">
        <HomeSlider/>
        <CategoriesSlider/>


        </div>



       






        <div className='grid md:grid-cols-3 lg:md:grid-cols-6 gap-2 md:gap-5'>

            {allProducts?.map(product=><Link to={`/ProductDetails/${product._id}`}  key={product._id} className='bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl p-3 relative overflow-hidden group'>
                <img src={product.imageCover} alt={product.title} className='w-100   ' />
                <h3 className='text-lg font-semibold text-gray-800'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
                <h2 className='text-sm text-gray-600'>{product.category.name}</h2>
                <h2 className='text-xs text-gray-400'>id:{product.category._id}</h2>
                <div className='flex justify-between items-center mt-2 px-2 '>
                <p  className='text-yellow-500 font-bold mt-5'>{product.ratingsAverage}<i class="fa-solid fa-star"></i></p>
                <div className='text-right'>
                    {product.priceAfterDiscount?
                    <>
                    <p className='line-through text-red-500 text-sm'>{product.price}</p>
                    <p className='text-lg font-semibold text-gray-800'>{product.priceAfterDiscount}</p>
                    </>
                    :<p>{product.price}</p>}
                    
                
                
                </div>

                <div className='absolute top-2 right-2 translate-x-[200%] group-hover:translate-x-0 transition'>
                    <button onClick={(e)=> {
                        e.preventDefault();
                        handleAddProduct(product._id);
                    }} className='bg-green-400 rounded-lg p-1 w-10 h-10'>+</button>
                </div>
                

                </div>
               

            </Link>)}

            

        </div>
        
    </div>
  )
}
