import { Ideas } from '/imports/collections';

Ideas.allow({
  insert(userId, doc) {
    return true;
  },
  update(userId, doc, fields, modifier) {
    if (userId) {
      return fields.length == 2 && fields[0] == "reactions" || fields[1] == "reactions" && modifier.$push;
    }
    return fields.length == 2 && fields[0] == "attachments" || fields[1] == "attachments" && modifier.$push;
  }
})
