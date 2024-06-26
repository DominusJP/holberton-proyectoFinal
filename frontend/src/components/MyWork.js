'use client'
import React, { useRef, useState, useEffect } from 'react';
import PastWorkCard from './PastWorkCard';

export default function MyWork({pastWork}) {
  // asegurar de que pastWork es un arreglo
  if (!Array.isArray(pastWork)) {
    pastWork = [];
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        setHasOverflow(containerRef.current.scrollWidth > containerRef.current.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <section style={{ backgroundColor: 'white' }}>
      <div className='mx-auto items-center'>
        <div className='mx-auto px-8 py-6 bg-white border shadow-lg text-white' style={{ width: '70vw' }}>
          <h2 className='font-bold text-lg' style={{ color: 'black' }}>All my work</h2>
          <div
            style={{
              maxHeight: isExpanded ? `${contentRef.current.scrollHeight}px` : '37vh',
              overflow: 'hidden',
              transition: 'max-height 0.5s ease-in-out',
              position: 'relative',
            }}
            ref={contentRef}
          >
            {hasOverflow && (
              <button
                onClick={scrollLeft}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                &#9664;
              </button>
            )}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'scroll',
                scrollBehavior: 'smooth',
                whiteSpace: 'nowrap',
                paddingBottom: '1rem',
                msOverflowStyle: 'none', // IE and Edge
                scrollbarWidth: 'none', // Firefox
              }}
              ref={containerRef}
              className="hide-scrollbar"
            >
              {pastWork.map((work, index) => (
                <div key={index} style={{ flex: '0 0 auto', width: 'calc(33.33% - 1rem)', minWidth: '200px' }}>
                  <PastWorkCard work={work}/>
                </div>
              ))}
            </div>
            {hasOverflow && (
              <button
                onClick={scrollRight}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                &#9654;
              </button>
            )}
          </div>
          <button
            onClick={handleToggle}
            className='font-bold mt-1 p-2 bg-green-500 hover:bg-green-600 transition-colors duration-300'
          >
            {isExpanded ? 'See less' : 'See more'}
          </button>
        </div>
      </div>
    </section>
  );
}
