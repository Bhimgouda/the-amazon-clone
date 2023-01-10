import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"

function Banner() {
    const [banner,setBanner] = useState([
        "https://links.papareact.com/gi1",
        "https://links.papareact.com/6ff",
        "https://links.papareact.com/7ma",
    ])

  return (
    <div className='banner'>
        <div className='gradient-overlay'/>
        <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} interval={5000}>
            {banner.map((banner,index)=>{
                return (
                    <div key={index}>
                        <img loading='lazy' src={banner}/>
                    </div>
            )})}
        </Carousel>
    </div>
  )
}

export default Banner