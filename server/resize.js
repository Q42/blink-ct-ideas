import { Ideas } from '/imports/collections';
import { HTTP } from 'meteor/http';

Ideas.after.update((userId, doc, fieldNames, modifier, options) => {
  console.log(modifier, fieldNames);

  const attachment = modifier['$push'] && modifier['$push'].attachments;
  if (!attachment) return;

  if (attachment.indexOf('https://blink-ct-ideas.storage.googleapis.com/') == 0) {
    const blobId = attachment.substr('https://blink-ct-ideas.storage.googleapis.com/'.length);
    console.log('resizing', blobId);
    HTTP.post('https://blink-ct-3000.appspot.com/serveurl', {
      params: {
        bucket: 'blink-ct-ideas',
        image: blobId
      }
    }, (err, res) => {
      if (err) console.error(err);
      console.log('Done resizing image', attachment, blobId, res);
      if (res.content.indexOf('http://') == 0 && res.content.indexOf('googleusercontent.com/') >= 0) {
        Ideas.update({_id:doc._id}, {$push:{images: res.content}});
      }
    })
  } else {
    console.warn('Got an attachment not in googleapis', attachment);
  }
});
