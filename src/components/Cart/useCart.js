import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import { cartContext } from '../../context/CartContext';

export default function useCart() {
     const{totalCartPrice,products,updateCount,removeItemFromCart,clearCart}=useContext(cartContext)
        console.log(products);
    
      
        
        function handleChangeCount(id,newCount){
            updateCount(id,newCount)
        }
    
    
        async function handleDelete(id){
           const isSucess=await removeItemFromCart(id)
    
           if(isSucess){
            toast.success("Deleted",{position:"top-right"})
           }else{
            toast.error("error",{position:"top-right"})
           }
        }

        async function handleClearCart(){
            const isSucess=await clearCart()
     
            if(isSucess){
             toast.success("Cleared",{position:"top-right"})
            }else{
             toast.error("error",{position:"top-right"})
            }
         }

  return{products,handleChangeCount,handleDelete,totalCartPrice,handleClearCart}
}
