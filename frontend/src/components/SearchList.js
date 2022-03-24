import React from 'react';
import { Link } from 'react-router-dom';

export default function Search(props) {
  const { search } = props;
  return (
    <div key={search._id} className="card">
    <Link to="/">
        <h2>{search.name}</h2>
    </Link>    
    </div>
  );
}
