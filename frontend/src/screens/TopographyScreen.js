import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function TopographyScreen() {
  return (
    <div>
      <Helmet>
        <title>Study Area Order</title>
        <meta name="description" content="Place an order for a Topographic Map of All places in Nigeria and your order will be available less than 24 hours" />
        <link rel="canonical" href="/topography" />
      </Helmet>
      <form className='form' action='https://docs.google.com/forms/u/0/d/e/1FAIpQLSflNbyhbvtN2ZxIs-9AFcWsdiP2lJCflhhok_IFvEzhq5q-gg/formResponse'>
        <div>
          <h1>Topographic Map Order</h1>
          <label>Your Full Name</label>
          <input type="text" name='entry.2092238618' placeholder='Full Name' required />
        </div>
        <div>
          <label>Email Address</label>
          <input type='email' name='entry.933864674' placeholder='Enter Email' required />
        </div>
        <div>
          <label>Phone Number</label>
          <input type='tel' name='entry.479301265' placeholder='Enter phone number' required />
        </div>
        <div>
          <label>Map location</label>
          <input type='text' name='entry.1753222212' placeholder='Enter location' required />
        </div>
        <div>
          <label>Map Title</label>
          <input type='text' name='entry.588393791' placeholder='Enter title' required />
        </div>
        <div>
          <label>Map Description</label>
          <textarea type='text' name='entry.28808672' placeholder='Enter description' required />
        </div>
        <div>
          <fieldset name='entry.90650992'>
            <legend>Map Layers</legend>
            <input type='checkbox' name='entry.90650992' value='Rivers' checked />Rivers
            <input type='checkbox' name='entry.90650992' value='Water Body' checked />Water Body
            <input type='checkbox' name='entry.90650992' value='Roads' checked />Roads
            <input type='checkbox' name='entry.90650992' value='Settlements' checked />Settlements
            <input type='checkbox' name='entry.90650992' value='Railway Line' checked />Rail
            <input type='checkbox' name='entry.90650992' value='Administrative Boundaries' />Admin Boundary
            <input type='checkbox' name='entry.90650992' value='Contour (10m)' />Contour (10m)
            <input type='checkbox' name='entry.90650992' value='Contour (20m)' />Contour (20m)
            <input type='checkbox' name='entry.90650992' value='Contour (50m)' />Contour (30m)
          </fieldset>

        </div>
        <div>
          <label>I understand that this Map order is for academic and research purpose</label>
          <input type='checkbox' name='entry.2109138769' value='Yes' required />
        </div>
        <button className='primary' type='submit'>Submit Order</button>
      </form>
    </div>
  );
}
