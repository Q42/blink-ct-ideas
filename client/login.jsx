import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'react-mounter';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import {Layout} from './imports/layout.jsx';


FlowRouter.route("/login", {
  action() {
    mount(Layout, {
      content: (<LoginButtons />)
    });
  }
});

const LoginButtons = () => (
  <div className="pane small">
    <h2>Welkom bij de Junior Computer Lab ideeënbus!</h2>

    <p>Werk je bij Q42? Dan kan je hier inloggen.</p>

    <AccountsUIWrapper />
  </div>
);

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}
