
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function SlickCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    draggable: false,
    fade: true,
  };

  return (

    <div className="slider bg-slate-900 z-1">
        <Slider {...settings}>
        <img className='w-full h-full object-cover opacity-75' src="https://images.unsplash.com/photo-1721614461028-6e80fa904ba0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="slide" />
        <img className='w-full h-full object-cover opacity-75' src="https://images.unsplash.com/photo-1713832139677-a03a41b602e3?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="slide" />
        <img className='w-full h-full object-cover opacity-75' src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="slide" />
        </Slider>
    </div>

  );
}

export default SlickCarousel