import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './imports/layout.jsx';

FlowRouter.route('/ideeen/:idea', {
  action(params) {
    mount(Layout, {
      content: (<IdeaPage idea={params.idea} />)
    });
  }
});

const IdeaPage = ({idea}) => (
  <div>
    <h1>yo {idea}</h1>
  </div>
);
