import React from 'react';

// define and export our Layout component
export const Layout = ({content}) => (
  <div>
    <h1>Welkom bij de Q42 Ideeënbus</h1>
    
    <hr />
    <div>{content}</div>
  </div>
);
