import { Ideas } from '/imports/collections';
import { Commons } from '/helpers'

Meteor.methods({
  'idea.reactions.push'(ideaID, message) {
    if(!this.userId) {
      return;
    }

    const email = Meteor.users.findOne(this.userId).services.google.email;
    console.log('idea.reactions.push', ideaID, email, message);
    Ideas.update({_id: ideaID}, {
      $push: {
        reactions: {
          author: email,
          message: message
        }
      }
    }, (err, res) => {
      if (err) console.error(err);
      console.log('idea.reactions.push returned', res);

      const idea = Ideas.findOne(ideaID, {
        fields: {
          emails: 1,
        }
      });

      if(idea && idea.emails) {
        Email.send({
          from: email,
          to: idea.emails,
          subject: 'Reactie van Q42',
          text: `${ Commons.nl2br(message) }<br/><br/><i>${ email }</i>`
        });
      }
    });
  }
})
