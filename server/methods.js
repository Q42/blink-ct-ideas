import { Ideas } from '/imports/collections';

Meteor.methods({
  'idea.reactions.push'(idea, message) {
    const email = Meteor.users.findOne(this.userId).services.google.email;
    console.log('storing', idea, email, message);
    Ideas.update({_id: idea}, {
      $push: {
        reactions: {
          author: email,
          message: message
        }
      }
    }, (err, res) => {
      console.log(err, res);
    });
  }
})
