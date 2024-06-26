import api from '@/utils/api';
import Link from 'next/link';
import React, { useRef, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function ConnectRequests({ paramsUserId }) {
  const [userData, setUserData] = useState([]);

  const getFriendshipRequest = async () => {
    try {
      const response = await api.get(`api/friends/${paramsUserId}/request/`);
      // Handle the response as needed
      console.log('respp', response.data);
      setUserData(response.data);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    getFriendshipRequest();
  }, []);

  const handleFriendshipRequest = async (userId) => {
    try {
      const response = await api.post(`api/friends/${userId}/accepted/`);
      // Handle the response as needed
      console.log(`Friendship request accepted user with ID: ${userId}`);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto">
        <div
          className="mx-auto px-8 py-6 bg-white border text-black rounded-lg"
          style={{ 
            maxWidth: '70vw',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'  // Agregando sombra aquí
          }}
        >
          <table className="table">
            <thead>
              <tr>
                <th>Work with</th>
                <th>Role</th>
                <th>Connect</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td className="align-middle">
                    <div className='d-flex align-items-center'>
                      <img
                        src='https://via.placeholder.com/200x100'
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle'
                      />
                      <div className='ms-3'>
                        <Link href={`/profile/${user.sender_id}`} key={index} passHref>
                          <p className='fw-bold mb-1'>{user.sender_name}</p>
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">
                    <p className='fw-normal mb-1'>{user.role}</p>
                    <p className='text-muted mb-0'>{user.category}</p>
                  </td>
                  <td>
                    <Button variant="outline-success" className="bg-green-500" onClick={() => handleFriendshipRequest(user.sender_id)}>
                      Connect
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
