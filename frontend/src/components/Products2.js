import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
    const { product } = props;
    return (
        <div className="responsive" key={product._id} onContextMenu={(e) => e.preventDefault()}>
            {product.price <= 0 ? (
                <div className="gallery">
                    <Link to={`/product/${product._id}`}>
                        <img className="medium" src={product.image} alt={product.name} />
                    </Link>
                    <Link to={`/product/${product._id}`} className="desc">
                        <strong>{product.name}</strong>
                    </Link>
                    <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                    ></Rating>
                    <div className="desc"><strong>{product.brand}</strong></div>
                    <div>Updated {product.updatedAt.substring(0, 10)}</div>
                </div>
            ) : (
                <></>
            )}

        </div>
    );
}