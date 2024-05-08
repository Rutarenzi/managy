import React, { useEffect } from 'react';

const Redirect = () => {
  useEffect(() => {
    document.cookie = '';
    window.location.pathname = '/login';
  }, []);
  return <div>redirecting to login...</div>;
};

export default Redirect;
