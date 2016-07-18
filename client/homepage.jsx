import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './imports/layout.jsx';

FlowRouter.route("/", {
  action() {
    mount(Layout, {
      content: (<Homepage />),
      homeBtn: null
    });
  }
});

const Homepage = () => (
  <div className="pane small">
    <h2>Welkom bij de Junior Computer Lab ideeënbus!</h2>

    <p>Bij Q42 bedenken en programmeren we slimme producten.
      Maar we hebben jullie hulp nodig! We willen ook slimme producten voor kinderen maken.
      En wie kan beter bedenken wat kinderen willen, dan kinderen!?</p>

    <p>Dus laat ons weten welke gave ideeën jij kunt bedenken, en stuur ze naar ons op.</p>

    <p className="calls-to-action">
      <a href="/nieuw-idee" className="btn-send-idea">Stuur je idee naar Q42</a>
      <a href="/ideeen" className="btn-show-ideas">Bekijk alle ideeën</a>
    </p>
    <p>&nbsp;</p>

    <h3>Winnaar bekend!</h3>
    <p>Groepen die hun idee voor juni 2016 ingezonden hebben, deden mee aan een prijsvraag.
      De klas met het winnende idee mocht bij Q42 langs komen en kreeg een programmeer workshop van Master Lukas!</p>
    <p>Door een vakkundige jury van Q42, Blink en CodeUur is <a href="/ideeen/4e4dLzsuW9yCHdnbF">MIC 3000</a> gekozen tot het
      beste idee uit de ideeënbus! <a href="https://www.q42.nl/blog/post/146895610733/winnende-leerlingen-smart-life-bij-q42-aan-de-slag">Lees hier een verslag van hun dag bij Q42</a>, en bekijk hieronder het video verslag.</p>
    <p><iframe style={{width: '100%', height: '315px'}} src="https://www.youtube.com/embed/1IslnoijpA8" frameborder="0" allowfullscreen></iframe></p>
    <p><i>De prijsvraag is inmiddels gesloten, maar je kunt je idee nog steeds naar de Q42 Ideeënbus sturen.</i></p>
  </div>
);
