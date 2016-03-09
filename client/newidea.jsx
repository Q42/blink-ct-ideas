import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './imports/layout.jsx';
// import toastr from 'toastr'; can't load the css of toastr from npm :(

FlowRouter.route("/nieuw-idee", {
  action() {
    toastr.info('yo!');
    mount(Layout, {
      content: (<NewIdea />)
    });
  }
});

const NewIdea = () => (
  <div>
    Tof dat je een idee hebt!
    Form
  </div>
);

//   AutoForm.hooks({
//     insertIdeaForm: {
//       after: {
//         insert: function(error, result) {
//           if (error) {
//             toastr.error(error.message, 'Het is niet gelukt om je idee toe te voegen');
//             throw error;
//           }
//           toastr.success('Dank voor je idee!');
//           lookingAtIdea.set(null);
//         }
//       }
//     }
//   });
//
