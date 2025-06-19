import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/images/banner-4.jpeg'
import img2 from '../../assets/images/blog-img-1.jpeg'
import img3 from '../../assets/images/blog-img-2.jpeg'
import img4 from '../../assets/images/grocery-banner-2.jpeg'


export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
   <div className=" px-5 flex">
     <div className="w-3/4">
     <Slider {...settings} autoplay>
      <div>
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
      </div>
    </Slider></div>
    <div className="w-1/4">
    <img className="w-full h-36" src={img2} alt="Vegatables" />
    <img className="w-full h-36" src={img3} alt="Vegatables" />
    </div>
   </div>
   
  );
}