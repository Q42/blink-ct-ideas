import { Ideas } from '/imports/collections';

const ITEMS_PER_PAGE = 10;
const OVERVIEW_FIELDS = {authors: 1, title: 1, description: 1, images: 1, updatedDate: 1};
const DETAIL_FIELDS = {school: 1, authors: 1, title: 1, description: 1, images: 1, updatedDate: 1, reactions: 1};

Meteor.publish('ideas.paged', (page: number = 1):object => {
  let query = {};
  if(!this.userId) {
    query.deletedBy = null;
  }
  page = Math.max(page, 1);
  console.log('publishing ideas.paged', page);
  return Ideas.find(query, {
    sort: { updatedDate: -1 },
    limit: ITEMS_PER_PAGE,
    skip: (page - 1) * ITEMS_PER_PAGE,
    fields: OVERVIEW_FIELDS
  });
});

Meteor.publish('ideas.all', () => {
  let query = {};
  if(!this.userId) {
    query.deletedBy = null;
  }

  console.log('publishing ideas.all');
  return Ideas.find(query, {
    sort: { updatedDate: -1 },
    fields: OVERVIEW_FIELDS
  });
});

Meteor.publish('idea', (id: string):object => {
  let query = {_id: id};
  if(!this.userId) {
    query.deletedBy = null;
  }

  return Ideas.find(query, {fields: DETAIL_FIELDS});
});
