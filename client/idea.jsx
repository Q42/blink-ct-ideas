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
      <div className="pane">Loading...</div>
    )
    return (
      <div className="pane">
        <h2>{this.data.idea.title}</h2>
        <h3>door {this.data.idea.authors}</h3>
        {this.data.idea.description}
        <p>
          <img src={this.data.idea.attachments} className="detail" />
        </p>
      </div>
    );
  }
});
