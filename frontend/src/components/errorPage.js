import React from 'react'
import {Link} from 'react-router-dom';
import './style/error.css';

const errorPage = () => {
  return (
    <>
      <section className="message_cont">
        <h1 className="error">404</h1>
        <h1 className='err_head'>We are Sorry, Page Not Found</h1>
        <p>The page you are looking for might have been removed or its name changed or temporary unavailabe </p>
        <Link className="link" to='/'>Back to Home Page</Link>
      </section>
    </>
  )
}

export default errorPage
