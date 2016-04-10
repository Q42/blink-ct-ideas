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
  <div className="pane">
    <p>Welkom bij de Junior Computer Lab ideeënbus!</p>

    <p>Bij Q42 bedenken en programmeren we slimme producten.
      Maar we hebben jullie hulp nodig! We willen ook slimme producten voor kinderen maken.
      En wie kan beter bedenken wat kinderen willen, dan kinderen!?</p>

    <p>Dus laat ons weten welke gave ideeën jij kunt bedenken, en stuur ze naar ons op.
      Het groepje met het beste idee mag bij Q42 langs komen om het idee te presenteren.
      En natuurlijk om van de glijbaan te gaan, te hoela-hoepen en te gamen!</p>

    <p>Als je je e-mailadres achter laat, dan krijg je van Lukas, Kristin of een andere Q42'er
      te horen wat zij van je idee vinden.</p>

    <p><a href="/nieuw-idee">Stuur je idee op</a></p>

    <p><a href="/ideeen">Bekijk alle ideeën</a></p>
  </div>
);
