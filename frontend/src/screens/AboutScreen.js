import React from 'react';
import { Helmet } from 'react-helmet-async';


import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function AboutScreen() {
  return (
    <div>
      <Helmet>
        <title>About Niger Maps</title>
        <meta name="description" content="Store for digital maps and GIS Analysis in Nigeria. Search and Download Maps for all Places in Nigeria" />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="about">
        <div className="card card-body">
          <h1 className="abouttag">Our Contact</h1>
          <strong>Email:</strong> support@nigermaps.com
          <br />
          <strong>Phone Number: </strong> 08075224314, 07035819528
        </div>
        <div className="card card-body">
          <h1 className="abouttag">About Us</h1>
          <p>
            NIGER MAPS aim is to transform the way traditional business is done in Nigeria and West Africa as a whole by creating a platform to have all business transactions done in an electronic way.  Our primary focus is to provide high quality services spanning the full scope of the company’s diverse services in a safe, efficient, cost-effective and environmentally friendly manner.
          </p>
        </div>
        <div className="card card-body">
          <h1 className="abouttag">Our Mission</h1>
          <p>
            NIGER MAPS is to deliver high valued Geospatial, ICT, Civil engineering and solutions across the Atlantic focused on the emerging market of Africa beginning with Nigeria. The objective drive of the company is to promote and deliver trusted and sustainable Geospatial, ICT and construction/civil engineering services, solutions and facilitate trade and market integration between developed and developing economies, and among developing economies, especially Africa developing economies.
          </p>
        </div>
        <div className="card card-body">
          <h1 className="abouttag">Our Vission</h1>
          <p>
            To be the biggest choice known in Africa for the provision of creative innovation and cutting-edge transatlantic ICT, Geospatial and Civil engineering services and solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
