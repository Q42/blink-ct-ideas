Slingshot.GoogleCloud.directiveDefault.GoogleSecretKey = Assets.getText('google-cloud-service-key.pem');

Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
});

Slingshot.createDirective("myFileUploads", Slingshot.GoogleCloud, {
  bucket: Meteor.settings.GoogleCloudBucket,
  // If we leave out the ACL it will just use the default ACL of the bucket which is better.
  // The public-read ACL makes the oauth service account the only user and removes all other users :(
  //"acl": "public-read",

  authorize: function () {
    return true;
  },

  key: function (file) {
    return Meteor.uuid();
  }
});
