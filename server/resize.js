import { Ideas } from '/imports/collections';
import { HTTP } from 'meteor/http';

Ideas.after.insert((userId, doc) => {
  const urlEmail = process.env.ROOT_URL + '/ideeen/' + doc._id;
  Email.send({
    from: 'no-reply@q42.nl',
    to: Meteor.settings.EmailNewIdea,
    subject: 'Nieuw idee op juniorcomputerlab.q42.nl',
    text: `${ doc.description }\n\n- ${ doc.authors }\n\n${ urlEmail }`
  });

  const attachments = doc.attachments;
  if(!attachments || attachments.length === 0) return;

  attachments.forEach(attachment => {
    if(attachment.indexOf('https://blink-ct-ideas.storage.googleapis.com/') === 0) {
      const blobId = attachment.substr('https://blink-ct-ideas.storage.googleapis.com/'.length);
      console.log('resizing', blobId);
      HTTP.post('https://blink-ct-3000.appspot.com/serveurl', {
        params: {
          bucket: 'blink-ct-ideas',
          image: blobId
        }
      }, (err, res) => {
        if(err) console.error(err);
        if(res.content.indexOf('http://') === 0 && res.content.indexOf('googleusercontent.com/') >= 0) {
          Ideas.update({_id: doc._id}, {$push: {images: res.content}});
        } else {
          console.error('Something error happens during image upload', res);
        }
      });
    } else {
      console.warn('Got an attachment not in googleapis', attachment);
    }
  });
});
