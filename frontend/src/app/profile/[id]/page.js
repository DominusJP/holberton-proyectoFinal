'use client'
import Footer from '@/components/Footer'
import OffCanvas from '@/components/OffCanvas'
import React, { useEffect, useState } from 'react'
import ProfileInfo from '@/components/ProfileInfo'
import ProfileAbout from '@/components/ProfileAbout'
import api from '@/assets/api'
import PastWork from '@/components/PastWork'
import ProfileSkills from '@/components/ProfileSkills'

const page = ({params}) => {
  const [tabSelected, setTabSelected] = useState('profile');
  const [about, setAbout] = useState('');
  const [user, setUser] = useState('');

  const { id } = params


  const handleChildData = (tabData) => {
    // Do something with the data received from the child component
    console.log('Data from child:', tabData);
    setTabSelected(tabData);
  };

  const whenMounted = async () => {
    try {
      const response = await api.get(`api/me/${id}`);
      setAbout(response.data.bio)
      setUser(response.data)
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    whenMounted();
  }, []);


  return (
    <div className='shadow-lg'>
      <OffCanvas />
      <ProfileInfo tabData={handleChildData} user={user}/>
      {tabSelected === 'profile' ? (
        <section>
          <ProfileAbout bio={about}/>
          <PastWork/>
          <ProfileSkills/>
        </section>
      ) : tabSelected === 'posts' ? (
        <p>Content for tab B</p>
      ) : (
        <p>Default Content</p>
      )}
      <Footer />
    </div>
  )
}

export default page