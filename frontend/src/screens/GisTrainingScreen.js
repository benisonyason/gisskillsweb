import React from 'react';
import { Helmet } from 'react-helmet-async';
// import { Link } from 'react-router-dom';
import ReactWhatsapp from 'react-whatsapp';
import { Carousel } from 'react-responsive-carousel';


export default function GisTrainingScreen(props) {

  return (
    <div>
      <Helmet>
        <title>Free GIS Training</title>
        <meta name="description" content="GIS Dataset Downloads" />
        <link rel="canonical" href="/gistraining" />
      </Helmet>

      <div className="row center">
        <div>
          <div className='row center' style={{ border: 'none' }}>
            <h1 style={{ textShadow: '2px 2px 5px red', fontSize: '25px', textAlign: 'center' }}>Improve your GIS Skills with Free Basic Certificate</h1>
          </div>
          <div className='row center'>
            <h1><strong style={{ fontSize: '40px' }}><button><a href='https://chat.whatsapp.com/JzgbMivilac6HrGeTRrLIt'>Join Batch 003</a></button></strong></h1>
          </div>
          <div className='row center'>
            <ReactWhatsapp number="+2347035819528" message="Hello from gis training"><i className='fa fa-whatsapp'></i></ReactWhatsapp>
          </div>

          <Carousel
            showThumbs={false}
            showIndicators={false}
            showArrows={false}
            interval={1000}
          >
            <div>
              <img src="images/advert2.jpg" alt='advert1' />
            </div>
            <div>
              <img src="images/advert1.png" alt='advert2' />
            </div>
            <div>
              <img src="images/advert3.png" alt='advert2' />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}