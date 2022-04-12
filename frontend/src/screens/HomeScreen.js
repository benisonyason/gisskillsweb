import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Products2 from '../components/Products2';
import { Helmet } from 'react-helmet-async';
import { Carousel } from 'react-responsive-carousel';
import SearchBox from '../components/SearchBox';




export default function SearchScreen(props) {
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, rating, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
  return (
    <div className="gallery">
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Search and Download Maps for Places, Learn GIS Analysis and Statistics with R and SPSS Software. Request for location maps and Analysis" />
        <link rel="canonical" href="/" />
      </Helmet>

      <div className="row top">
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div className='row center'>
                <h2>Search Map store by LGA Name<i>(use LGA first word or State Name)</i></h2>
                <SearchBox />
              </div>

              <Carousel
                showThumbs={false}
                autoPlay={true}
                interval={3000}
                autoFocus={true}
                infiniteLoop={true}
              >
                <div>
                  <img src="images/advert2.jpg" alt='advert1' style={{ width: '200%' }} />
                  <Link to='/gistraining' className='legend' style={{ fontSize: '15px', fontWeight: 'bold' }}>Start Free Basic GIS Training</Link>
                </div>
                <div>
                  <img src="images/advert3.png" alt='advert2' />
                  <Link to="/gis" className='legend' style={{ fontSize: '15px', fontWeight: 'bold' }}> <span>Advance GIS Training</span></Link><br />

                </div>

                <div>
                  <img src="images/Rlogo.png" alt='Rlogo' />
                  <Link to="/rlearn" className='legend' style={{ fontSize: '15px', fontWeight: 'bold' }}><span>Data Analysis with R Studio </span></Link> <br />

                </div>
                <div>
                  <img src="images/spsslogo.png" alt='SPSS' />
                  <Link to="/learnspss" className='legend' style={{ fontSize: '15px', fontWeight: 'bold' }}><span> Learn SPSS Statistics</span></Link>

                </div>

              </Carousel>
              <div style={{ textAlign: 'center' }}>
                <h1><strong><button className='courses'><Link to='/gistraining'>Start Free Basic GIS Training</Link></button></strong></h1>
                <h1><strong><button className='courses'><Link to="/gis"> <span>Advance GIS</span></Link></button></strong></h1>
                <h1><strong><button className='courses'><Link to="/rlearn"><span>Start Learning R Studio </span></Link> </button></strong></h1>
                <h1><strong><button className='courses'><Link to="/learnspss"><span>Learn Statistics with SPSS</span></Link></button></strong></h1>
              </div>
              <div className='Row'>
                <h1>Recent Map Updates </h1>
              </div>
              <div className='row center'>
                {products.slice(0, 10).map((product) => (
                  <Products2 key={product._id} product={product}></Products2>
                ))}
              </div>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}