export const Ideas = new Mongo.Collection('ideas');

Ideas.attachSchema({
  createdDate: {type: Date},
  updatedDate: {type: Date},
  submitters: {type: [String]},
  title: {type:String},
  description: {type:String, autoform: {rows:4}, optional:true},
  attachments: {type: [String], optional:true},
  reactions: {type: [{
    author: {type:String},
    message: {type:String}
  }], optional:true}
});
