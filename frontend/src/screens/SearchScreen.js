import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import SearchBox from '../components/SearchBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props) {
  const navigate = useNavigate();
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

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
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
    <div>
      <div className='row center'>
        <h2>Search by LGA Name<i>(use LGA first word or State Name)</i></h2>
        <SearchBox />
      </div>
      <div>
        <h4>Category Filters</h4>
        <div>
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant="danger">{errorCategories}</MessageBox>
          ) : (
            <ul className='searchlist'>
              <li>
                <Link
                  className={'all' === category ? 'active' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  All
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    className={c === category ? 'active' : ''}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
        <div>
          Sort by{' '}
          <select
            value={order}
            onChange={(e) => {
              navigate(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customer Reviews</option>
          </select>
        </div>
      </div>

      <div className="row top">
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <div>
                  <MessageBox>
                    <p>Search Not Available... try searching by LGA or state Name first word</p>
                  </MessageBox>
                  <div>
                    <div className='row center'>
                      <p>Can't find what you are looking for? Don't worry </p>
                      <p> Tell us what you want...</p>
                    </div>
                    <div className='row center'>
                      <ol>
                        <li><Link to="/studyarea"> Customized Study Area Map</Link></li>
                        <li><Link to="/topography"> Topographic Map</Link></li>
                        <li><Link to="/geology"> Geology Map</Link></li>
                        <li><Link to="/soil"> Soil Map</Link></li>
                        <li><Link to="/administrative"> Administrative Map</Link></li>
                        <li><Link to="/thematic"> Thematic Map</Link></li>
                        <li><Link to="/lulc"> Landuse/Landcover Map</Link></li>
                        <li><Link to="/vegetation"> Vegetation Map</Link></li>

                      </ol>
                    </div>

                  </div>
                </div>
              )}
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
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
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
