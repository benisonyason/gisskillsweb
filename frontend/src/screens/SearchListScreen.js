import React, { useEffect, useState } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listSearch } from '../actions/userActions';


export default function SearchListScreen() {
  const dispatch = useDispatch();
  const searchList = useSelector((state) => state.searchList);
  const { loading, error, searches } = searchList;
  const [searchTerm, setsearchTerm] = useState(" ");


  useEffect(() => {
    dispatch(listSearch({}));
  }, [dispatch]);
  return (
    <div>
      <h2>Search List</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <input className="form" type="text" placeholder="Search" onChange={(e) => { setsearchTerm(e.target.value); }} />
          <table className="table" id="searchlist">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {searches.filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return val
                }
              }).map((search) => (
                <tr key={search._id}>
                  <td>{search._id}</td>
                  <td>{search.name}</td>
                  <td>{search.createdAt.substring(0, 10)}</td>
                  <td>{search.createdAt.substring(11, 19)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>

      )}
    </div>
  );
}
