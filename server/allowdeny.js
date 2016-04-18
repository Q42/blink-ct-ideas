import { Ideas } from '/imports/collections';
import { _ } from 'meteor/underscore';

const ALLOWED_FIELDS = ['attachments', 'images', 'updatedDate'];

Ideas.allow({
  insert(userId, doc) {
    return true;
  },
  update(userId, doc, fields, modifier) {
    var allowed_fields = ALLOWED_FIELDS;
    if (userId) {
      allowed_fields.push('reactions');
    }
    return modifier['$push'] &&
      _.without.apply(_, [fields].concat(allowed_fields)).length == 0;
  }
})
