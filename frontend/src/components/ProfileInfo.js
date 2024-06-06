'use client'
import React, { useState } from 'react';
import { MDBCardImage } from 'mdb-react-ui-kit';
import Head from 'next/head';

export default function ProfilePage({ tabData, user }) {
  const [selectedButton, setSelectedButton] = useState('profile');
  const [selectedButton2, setSelectedButton2] = useState(null);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    tabData(buttonName);
  };

  const handleButtonClick2 = (buttonName) => {
    setSelectedButton2(buttonName);
    tabData(buttonName);
  };

  return (
    <section style={{ backgroundColor: '#eee', fontFamily: 'Poppins, Open Sans, sans-serif' }}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="py-3 w-full">
        <div className="w-full">
          <div className="mx-auto flex items-center border shadow-lg" style={{ width: '70vw', height: '28vh' }}>
            <div className="border shadow-lg mr-1" style={{ width: '45vw', height: '100%' }}>
              <div className="m-4" style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="mx-auto"
                    style={{ width: '150px', borderRadius: '50%' }}
                    fluid
                  />
                </div>
                <div style={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1rem' }}>
                  <p>{user.username}</p>
                  <p className="text-gray-500 mb-1">Full Stack Developer</p>
                  <p className="text-gray-500 mb-4">Bay Area, San Francisco, CA</p>
                </div>
              </div>
              <div className="ml-36 my-2" style={{ width: '45vw' }}>
                <button
                  className={`mx-1 p-2 rounded ${selectedButton === 'profile' ? 'bg-green-800 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleButtonClick('profile')}
                >
                  Perfil
                </button>
                <button
                  className={`mx-1 p-2 rounded ${selectedButton === 'posts' ? 'bg-green-800 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleButtonClick('posts')}
                >
                  Mis Posteos
                </button>
              </div>
            </div>

            <div className="border shadow-lg flex items-center ml-1" style={{ width: '45vw', height: '100%' }}>
              <div className="mx-auto my-2">
                <button
                  className={`mx-1 p-2 rounded ${selectedButton2 === 'contact' ? 'bg-green-800 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleButtonClick2('contact')}
                >
                  Contacto
                </button>
                <button
                  className={`mx-1 p-2 rounded ${selectedButton2 === 'connections' ? 'bg-green-800 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleButtonClick2('connections')}
                >
                  Conexiones
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
