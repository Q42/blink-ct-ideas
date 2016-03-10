import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './imports/layout.jsx';

FlowRouter.route("/", {
  action() {
    mount(Layout, {
      content: (<Homepage />)
    });
  }
});

const Homepage = () => (
  <div className="pane">
    <p>Welkom bij de Junior Computer Lab ideeënbus!</p>

    <a href="/ideeen">Ga naar de ideeën</a>
  </div>
);
