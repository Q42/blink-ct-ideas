export const Ideas = new Mongo.Collection('ideas');

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

var reactionSchema = new SimpleSchema({
  author: {
    label: 'Q42\'er',
    type:String
  },
  message: {
    label: 'Feedback',
    type:String
  }
});

Ideas.attachSchema({
  createdDate: {
    label: 'Aangemaakt',
    type: Date,
    denyUpdate: true,
    autoValue() {
      if ( this.isInsert ) {
        return new Date;
      }
    }
  },
  updatedDate: {
    label: 'Laatst aangepast',
    type: Date,
    autoValue() {
      return new Date;
    }
  },
  authors: {
    label: 'Auteur(s)',
    type: String,
    denyUpdate: true,
  },
  emails: {
    label: 'Email(s)',
    type: String,
    denyUpdate: true,
    optional: true
  },
  title: {
    label: 'Idee',
    type:String,
    denyUpdate: true,
  },
  description: {
    label: 'Omschrijving',
    type: String,
    optional: true,
    denyUpdate: true,
  },
  attachments: {
    label: 'Afbeeldingen',
    type: [String],
    optional: true,
    denyUpdate: true,
  },
  reactions: {
    label: 'Reacties',
    optional: true,
    // denyInsert: true, // needed for bootstrap script
    blackbox: true,
    type: [reactionSchema]
  }
});

SimpleSchema.messages({
  required: "[label] is verplicht",
  minString: "[label] moet minimaal [min] karakters bevatten ([value])",
  maxString: "[label] mag niet langer dan [max] karakters zijn",
  minNumber: "[label] moet minimaal [min] zijn",
  maxNumber: "[label] mag maximaal [max] zijn",
  minDate: "[label] mag niet voor [min] zijn",
  maxDate: "[label] mag niet na [max] zijn",
  badDate: "[label] is geen valide datum",
  minCount: "Je moet minimaal [minCount] waardes invoeren",
  maxCount: "Je mag maximaal [maxCount] waardes invoeren",
  noDecimal: "[label] moet een getal zijn",
  notAllowed: "[value] mag hier niet",
  expectedString: "[label] moet een tekst zijn",
  expectedNumber: "[label] moet een getal zijn",
  expectedBoolean: "[label] moet ja of nee zijn",
  expectedArray: "[label] moet een lijst zijn",
  expectedObject: "[label] moet een object zijn",
  expectedConstructor: "[label] moet een [type] zijn",
  regEx: [
    {msg: "[label] failed regular expression validation"},
    {exp: SimpleSchema.RegEx.Email, msg: "[value] is geen valide mailadres"},
    {exp: SimpleSchema.RegEx.WeakEmail, msg: "[value] is geen valide mailadres"},
    {exp: SimpleSchema.RegEx.Domain, msg: "[label] is geen valide domein"},
    {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] is geen valide domein"},
    {exp: SimpleSchema.RegEx.IP, msg: "[label] is geen valide IP adres"},
    {exp: SimpleSchema.RegEx.IPv4, msg: "[label] is geen valide IPv4 adres"},
    {exp: SimpleSchema.RegEx.IPv6, msg: "[label] is geen valide IPv6 adres"},
    {exp: SimpleSchema.RegEx.Url, msg: "[label] is geen valide URL"},
    {exp: SimpleSchema.RegEx.Id, msg: "[label] is geen valide alfanumeriek ID"}
  ],
  keyNotInSchema: "Veld [key] mag niet",
  notUnique: "[label] moet uniek zijn",
  insertNotAllowed: "[label] cannot be set during an insert",
  updateNotAllowed: "[label] cannot be set during an update"
});
