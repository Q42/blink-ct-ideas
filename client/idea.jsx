import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './imports/layout.jsx';
import {Ideas} from '/imports/collections';
import {Commons} from '/helpers';

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
    Meteor.subscribe('idea', this.props.idea);
    return {
      idea: Ideas.findOne({_id: this.props.idea})
    };
  },

  render() {
    if(!this.data.idea) {
      return (
        <div className="pane">Bezig met laden...</div>
      );
    }

    let attachments = <br />;
    if(this.data.idea.images) {
      attachments = this.data.idea.images.map((att, id) => {
        const src = att + '=s700';
        return (<figure key={ id }>
          <img src={src} className="detail" />
        </figure>);
      });
      if(this.data.idea.images.length > 0) {
        attachments = <div className="figures">{attachments}</div>;
      }
    }

    let author = this.data.idea.authors;
    if(this.data.idea.school) {
      author += ` (${ this.data.idea.school })`;
    }

    let notOK;
    if(this.data.idea.deletedBy) {
      notOK = ' (NOT OK)';
    }

    return (
      <div className="pane">
        <a href="/ideeen" className="back-btn">&lsaquo; Terug naar overzicht</a>
        <h2>{this.data.idea.title}{ notOK }</h2>
        <h3 className="idea-authors">door {author}</h3>
        <p className="pre">{this.data.idea.description}</p>
        {attachments}
        <Reactions idea={this.data.idea} reactions={this.data.idea.reactions} />
      </div>
    );
  }
});

const Reactions = React.createClass({
  render() {
    reactionsHtml = (this.props.reactions || []).map((reaction, id) => {
      return (<blockquote key={ id }>
        <p className="pre" dangerouslySetInnerHTML={{ __html: Commons.nl2br(reaction.message) }} />
        <cite>{reaction.author}</cite>
      </blockquote>);
    });

    return (
      <div>
        <h3>Reacties van Q42&#39;ers</h3>
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
    Meteor.call('idea.reactions.push', this.props.idea._id, this.state.description, (error, respons) => {
      if(!error) {
        this.setState({
          description: ''
        });
      }
    });
  },

  changeDescription(e) {
    this.setState({ description: e.target.value });
  },

  removeIdea(e) {
    e.preventDefault();
    Meteor.call('idea.remove', this.props.idea._id);
  },

  render() {
    if(!this.state.userId) {
      return (
        <p>
          Werk je bij Q42? <a href="#" onClick={this.login}>Log dan in om te reageren &rsaquo;</a>
        </p>
      );
    }

    let deleteButton;
    if(!this.props.idea.deletedBy) {
      deleteButton = <button className="no" onClick={ this.removeIdea }>Dit is NIET OK</button>;
    }

    return (
      <form onSubmit={this.submitForm}>
        <label>
          Hey Q42&#39;er! Wat vind je van dit idee?
          <textarea name="description" onChange={this.changeDescription} value={this.state.description}></textarea>
        </label>
        <input className="cta" type="submit" value="Voeg deze reactie toe" />
        { deleteButton }
      </form>
    );
  }
});
