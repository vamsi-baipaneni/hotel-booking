import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';

const Layout = ({component: Component}) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <Hero />
      <div className='container mx-auto'>
        <SearchBar/>
      </div>
      <div className='container flex items-center justify-center mx-auto flex-1 py-10 relative'>
        <Component />
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
    component: PropTypes.elementType
};

export default Layout;
