import React from 'react';

export const Layout = ({content, homeBtn}) => (
  <div className="layout">
    <header>
      {homeBtn}
      <div className="col">
        <h1><a href="/">Junior Computer Lab <em>Ideeënbus</em></a></h1>
      </div>
    </header>

    <div className="panes">
      {content}
    </div>
  </div>
);
