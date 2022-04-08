import React, { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listcontact } from '../actions/userActions';


export default function ContactedScreen() {
  const dispatch = useDispatch();
  const contactList = useSelector((state) => state.contactList);
  const { loading, error, contacts } = contactList;

  useEffect(() => {
    dispatch(listcontact({}));
  }, [dispatch]);
  return (
    <div>
      <h2>Contact List</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table" id="searchlist">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contacts) => (
                <tr key={contacts._id}>
                  <td>{contacts.firstname}</td>
                  <td>{contacts.lastname}</td>
                  <td>{contacts.email}</td>
                  <td>{contacts.message}</td>
                  <td>{contacts.createdAt.substring(0, 10)}</td>
                  <td>{contacts.createdAt.substring(11, 19)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>

      )}
    </div>
  );
}
