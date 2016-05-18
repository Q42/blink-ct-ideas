import { Ideas } from '/imports/collections.js';

Meteor.startup(() => {
  if (!Ideas.findOne()) {
    console.log('Empty DB! I\'ll fill it with some stuff...');
    _.range(1,22).forEach((i) => {
      Ideas.insert({
        authors: 'Piet, Henkie en Arie',
        emails: 'piet@piet.nl, henkie@henkie.nl arie@arie.nl',
        title: 'Post versturen met een speedboot',
        description: 'Post versturen kost veel energie dus als we daar nou een speedboot voor gebruiken dan heb je niet zoveel asfalt nodig.\ngoed idee toch?\n\nEn voor lange afstanden een straaljagert.',
        attachments: [
          'https://blink-ct-ideas.storage.googleapis.com/89a90031-2ad8-4013-8d59-146acad8a67f',
          'https://blink-ct-ideas.storage.googleapis.com/b0fd1bce-ee8c-4322-8e29-e1187ca1251a'
        ],
        images: [
          'https://blink-ct-ideas.storage.googleapis.com/89a90031-2ad8-4013-8d59-146acad8a67f',
          'https://blink-ct-ideas.storage.googleapis.com/b0fd1bce-ee8c-4322-8e29-e1187ca1251a'
        ],
        reactions: [
          {author: 'lukas@q42.nl', message: 'Super gaaf! Mijn handen jeuken om er mee aan de slag te gaan :)\n\nJe zou zelfs nog een duikboot kunnen gebruiken.'}
        ]
      }, {
        validate: false
      });
    });
  }
});
