import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export default function SimpleSlider() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 3,
    };


    // const [allCategories, setAllcategories] = useState(null)


    // function getAllCategories(){
    // const categ=axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    // .then(function(res){

    //     console.log('categories:',res.data.data);
    //     setAllcategories(res.data.data)
        
    // })
    // .catch(function(err){
    //     console.log(err);
        
    // })
    // }
    

    // useEffect(()=>{
    //     getAllCategories()
    // },[])

    function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
     }
   
    
     const {data,isLoading}=useQuery({
       queryKey:['getAllCategories'],
       queryFn:getAllCategories,
     })
     const allCategories=data?.data.data

    return (


        <Slider {...settings} autoplay>

            {allCategories?.map(category=><div key={category._id} className="rounded-lg overflow-hidden">
        <img className="w-full h-72 object-cover" src={category.image} alt="Vegatables" />
        <h6  className="text-center text-lg font-medium text-gray-900 mt-2">{category.name}</h6>
      </div>
                
            )}
      {/* <div>
        <img className="w-full h-72" src={img1} alt="Vegatables" />
      </div>
      <div>
      <img className="w-full h-72" src={img2} alt="Vegatables" />
      </div>
      <div>
      <img className="w-full h-72" src={img3} alt="Vegatables" />
      </div>
      <div>
      <img className="w-full h-72" src={img4} alt="Vegatables" />
      </div> */}
    </Slider>


        
    )
}