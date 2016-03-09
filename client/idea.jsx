import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './imports/layout.jsx';
import {Ideas} from '/imports/collections';

FlowRouter.route('/ideeen/:idea', {
  action(params) {
    mount(Layout, {
      content: (<IdeaPage {...params} />)
    });
  }
});

const IdeaPage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const sub = Meteor.subscribe('idea', this.props.idea);
    return {
      idea: Ideas.findOne({_id:this.props.idea})
    }
  },

  render() {
    if (!this.data.idea) return (
      <div>Loading...</div>
    )
    return (
      <div>
        <h1>{this.data.idea.title}</h1>
      </div>
    );
  }
});
