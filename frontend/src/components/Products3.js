import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
    const { product } = props;
    return (
        <div key={product._id} onContextMenu={(e) => e.preventDefault()}>
            {product.category === 'Software' ? (
                <ul style={{'padding': '1rem'}}>
                <li >
                    <Link to={`/product/${product._id}`} className="desc">
                        <strong>Download {product.name}</strong><br/>
                    </Link>    
                        <strong>Description: </strong><p>{product.description}</p><hr/>
                </li>
                </ul>
            ) : (
                <></>
            )}
        </div>
    );
}