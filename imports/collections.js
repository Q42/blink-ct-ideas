export const Ideas = new Mongo.Collection('ideas');

Ideas.attachSchema({
  createdDate: {
    label: 'Aangemaakt',
    type: Date,
    denyUpdate: true,
    defaultValue: () => new Date
  },
  updatedDate: {
    label: 'Laatst aangepast',
    type: Date,
    autoValue: () => new Date
  },
  submitters: {
    label: 'Auteur(s)',
    type: String
  },
  title: {
    label: 'Idee',
    type:String
  },
  description: {
    label: 'Omschrijving',
    type: String,
    optional: true
  },
  attachments: {
    label: 'Afbeeldingen',
    type: [String],
    optional: true
  },
  reactions: {
    label: 'Reacties',
    optional: true,
    type: [
      {
        author: {label: 'Q42\'er', type:String},
        message: {label: 'Feedback', type:String}
      }
    ]
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
