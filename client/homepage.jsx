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
    <div>
        Tof dat je er bent.

        <a href="/ideeen">Ga naar de ideeen</a>
    </div>
);
