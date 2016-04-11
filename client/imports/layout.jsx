import React from 'react';

export const Layout = ({content}) => (
  <div className="layout">
    <header>
      <a href="/ideeen" className="link-ideas">Ideeën</a>
      <div className="col">
        <h1>Junior Computer Lab <em>Ideeënbus</em></h1>
      </div>
    </header>

    <div className="panes">
      {content}
    </div>
  </div>
);
