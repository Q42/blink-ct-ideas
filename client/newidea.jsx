import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './imports/layout.jsx';
import {Ideas} from '/imports/collections';

FlowRouter.route("/nieuw-idee", {
  action() {
    mount(Layout, {
      content: (<NewIdea />)
    });
  }
});

const NewIdea = React.createClass({
  getInitialState() {
    return {};
  },
  changeInput(e) {
    this.state[e.target.name] = e.target.value;
  },
  submitForm(e) {
    e.preventDefault();
    console.log('submitting', this.state);
    Ideas.insert(this.state, function(err, _id) {
      if (err) {
        console.error(err);
        toastr.error('Er is iets mis gegaan:' + (err.reason || err), 'Uh-oh');
      } else {
        toastr.info('Kom over een paar dagen terug voor antwoord van een Q42\'er op je idee.', 'Bedankt voor je idee!');
        FlowRouter.go('/ideeen/' + _id);
      }
    });
  },
  render() {
    return (
      <div>
        Tof dat je een idee hebt!
        <form onSubmit={this.submitForm}>
          <input name="submitters" type="text" onChange={this.changeInput} />
          <input name="title" type="text" onChange={this.changeInput} />
          <textarea name="description" onChange={this.changeInput}></textarea>
          <input type="submit" />
        </form>
      </div>
    )
  }
});
