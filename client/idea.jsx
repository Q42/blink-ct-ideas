import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './imports/layout.jsx';
import {Ideas} from '/imports/collections';

FlowRouter.route('/ideeen/:idea', {
  action(params) {
    mount(Layout, {
      content: (<IdeaPage {...params} />),
      homeBtn: (<a href="/" className="btn-home">Home</a>)
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
        <Reactions idea={this.data.idea._id} reactions={this.data.idea.reactions} />
      </div>
    );
  }
});

const Reactions = React.createClass({
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
        <AddReaction idea={this.props.idea} />
      </div>
    );
  }
});


const AddReaction = React.createClass({
  getInitialState() {
    return { userId: Meteor.userId(), description: '' };
  },

  login(e) {
    e.preventDefault();
    Meteor.loginWithGoogle(() => {
      this.setState({ userId: Meteor.userId() });
    });
  },

  submitForm(e) {
    e.preventDefault();
    console.log('storing', this.state);
    Meteor.call('idea.reactions.push', this.props.idea, this.state.description);
  },

  changeDescription(e) {
    this.setState({ description: e.target.value });
  },

  render() {
    if (!this.state.userId) {
      return (
        <p>
          Werk je bij Q42? <a href="#" onClick={this.login}>Log dan in om te reageren</a>!
        </p>
      );
    } else {
      return (
        <form onSubmit={this.submitForm}>
          <label>
            Hey Q42'er! Wat vind je van dit idee?
            <textarea name="description" onChange={this.changeDescription} value={this.state.description}></textarea>
          </label>
          <input className="cta" type="submit" value="Voeg deze reactie toe" />
        </form>
      );
    }
  }
});
