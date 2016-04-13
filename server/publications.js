import { Ideas } from '/imports/collections';

const ITEMS_PER_PAGE = 10;

Meteor.publish('ideas.paged', (page: number = 1):object => {
  page = Math.max(page, 1);
  console.log('publishing ideas.paged', page);
  return Ideas.find({}, {
    sort: { updatedDate: -1 },
    limit: ITEMS_PER_PAGE,
    skip: (page-1)*ITEMS_PER_PAGE
  });
});

Meteor.publish('ideas.all', () => {
  console.log('publishing ideas.all');
  return Ideas.find({}, {
    sort: { updatedDate: -1 }
  });
});

Meteor.publish('idea', (id: string):object => {
  return Ideas.find({_id:id});
});
