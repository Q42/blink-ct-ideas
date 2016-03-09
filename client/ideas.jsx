import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './imports/layout.jsx';
import { Ideas } from '/imports/collections';

FlowRouter.route('/ideeen', {
  action(params, queryParams) {
    mount(Layout, {
      content: (<IdeasPage page={queryParams.page} />)
    });
  }
});

GlobalIdeas = Ideas;

const IdeasPage = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const sub = Meteor.subscribe('ideas.paged', this.props.page);
    return {
      ideas: Ideas.find({},{sort: {updatedDate: -1}}).fetch()
    }
  },

  render() {
    return (
      <div>
        <a href='/nieuw-idee'>Voeg een idee toe</a>
        <IdeasList ideas={this.data.ideas} />
      </div>
    );
  }
});

const IdeasList = React.createClass({
  render() {
    if (!this.props.ideas.length) {
      return (
        <div>
          Er zijn nog geen ideeen!
        </div>
      )
    }
    const ideasNodes = this.props.ideas.map((idea) => <IdeasListItem idea={idea} />);
    return (
      <div>
        {ideasNodes}
      </div>
    )
  }
});

const IdeasListItem = ({idea}) => (
  <div className='idea'>
    {idea.title}
  </div>
)
