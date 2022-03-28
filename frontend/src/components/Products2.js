import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
    const { product } = props;
    return (
        <div class="responsive" key={product._id} onContextMenu={(e) => e.preventDefault()}>
            {product.brand === 'Study Area Map' && product.price === 0 ?(
                       <div class="gallery">
                <Link to={`/product/${product._id}`}>
                    <img className="medium" src={product.image} alt={product.name}/>
                </Link>
                <Link to={`/product/${product._id}`} className="desc">
                {product.name}
                </Link>
                <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                ></Rating>
                <div className="desc">{product.brand}</div>
            </div>
 ):(
                <></>
            )}
            
        </div>
    );
}