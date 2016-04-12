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

    let attachments = <br />
    if (this.data.idea.attachments) {
      attachments = this.data.idea.attachments.map((att) => {
        return (<p>
          <img src={att} className="detail" />
        </p>);
      });
    }

    return (
      <div className="pane">
        <h2>{this.data.idea.title}</h2>
        <h3>door {this.data.idea.authors}</h3>
        {this.data.idea.description}
        {attachments}
        <Reactions reactions={this.data.idea.reactions} />
      </div>
    );
  }
});

const Reactions = React.createClass({
  login(e) {
    e.preventDefault();
    Meteor.loginWithGoogle();
  },

  render() {
    reactionsHtml = (this.props.reactions || []).map((reaction) => {
      return (<p>
        <bold>{reaction.author}</bold>: {reaction.message}
      </p>);
    });

    return (
      <div>
        <h3>Reacties van Q42'ers</h3>
        {reactionsHtml}
        Werk je bij Q42? <a href="#" onClick={this.login}>Log dan in om te reageren</a>!
      </div>
    );
  }
});
