import React from 'react';

export const Layout = ({content}) => (
  <div className="layout">
    <header>
      <h1><a href="/ideeen">Junior Computer Lab - Ideeënbus</a></h1>
    </header>

    <div className="panes">
      {content}
    </div>
  </div>
);
