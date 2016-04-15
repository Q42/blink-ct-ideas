import { Ideas } from '/imports/collections';

const ITEMS_PER_PAGE = 10;
const OVERVIEW_FIELDS = {authors: 1, title: 1, description: 1, attachments: 1};

Meteor.publish('ideas.paged', (page: number = 1):object => {
  page = Math.max(page, 1);
  console.log('publishing ideas.paged', page);
  return Ideas.find({}, {
    sort: { updatedDate: -1 },
    limit: ITEMS_PER_PAGE,
    skip: (page-1)*ITEMS_PER_PAGE,
    fields: OVERVIEW_FIELDS
  });
});

Meteor.publish('ideas.all', () => {
  console.log('publishing ideas.all');
  return Ideas.find({}, {
    sort: { updatedDate: -1 },
    fields: OVERVIEW_FIELDS
  });
});

Meteor.publish('idea', (id: string):object => {
  return Ideas.find({_id:id}, {fields: {email: -1}});
});
