import { Ideas } from '/imports/collections';

Meteor.methods({
  'idea.reactions.push'(idea, message) {
    const email = Meteor.users.findOne(this.userId).services.google.email;
    console.log('idea.reactions.push', idea, email, message);
    Ideas.update({_id: idea}, {
      $push: {
        reactions: {
          author: email,
          message: message
        }
      }
    }, (err, res) => {
      if (err) console.error(err);
      console.log('idea.reactions.push returned', res);
    });
  }
})
