import React from 'react';

export const Layout = ({content}) => (
  <div className="layout">
    <header>
      <a href="/ideeen" className="link-ideas">Ideeën</a>
      <div className="col">
        <h1><a href="/">Junior Computer Lab <em>Ideeënbus</em></a></h1>
      </div>
    </header>

    <div className="panes">
      {content}
    </div>
  </div>
);
