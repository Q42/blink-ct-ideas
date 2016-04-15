import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './imports/layout.jsx';
import {Ideas} from '/imports/collections';

FlowRouter.route("/nieuw-idee", {
  action() {
    mount(Layout, {
      content: (<NewIdea />),
      homeBtn: (<a href="/" className="btn-home">Home</a>)
    });
  }
});

Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
});

const NewIdea = React.createClass({
  getInitialState() {
    return { uploading: false };
  },
  changeInput(e) {
    let changedObj = {};
    changedObj[e.target.name] = e.target.value;
    this.setState(changedObj);
  },
  submitForm(e) {
    e.preventDefault();
    this.setState({uploading:true});
    Ideas.insert(this.state, (err, _id) => {
      if (err) {
        console.error(err);
        toastr.error('Er is iets mis gegaan: ' + (err.reason || err), 'Uh-oh');
      } else {
        const files = $('#file').get(0).files;
        let filesToUpload = files.length;
        if (files.length) {
          const uploaders = _.map(files, (file) => {
            var uploader = new Slingshot.Upload("myFileUploads");
            uploader.send(file, (error, downloadUrl) => {
              filesToUpload--;
              if (error) {
                console.error(error);
                toastr.error('Je afbeelding is niet opgeslagen: ' + (uploader.xhr.response), 'Uh-oh');
              }
              else {
                Ideas.update({_id: _id}, {$push: {attachments: downloadUrl}});
                if (filesToUpload == 0) {
                  this.afterSuccessfulSubmit(_id);
                }
              }
            });
            return uploader;
          });

        } else {
          this.afterSuccessfulSubmit(_id);
        }
      }
    });
  },
  afterSuccessfulSubmit(_id) {
    FlowRouter.go('/ideeen/' + _id);
  },
  render() {
    let submitButton;
    if (this.state.uploading)
      submitButton = <input className="cta" type="submit" value="Bezig met versturen..." disabled="disabled" />
    else
      submitButton = <input className="cta" type="submit" value="Verstuur naar het Lab" />

    return (
      <div className="pane small">
        <h2>Tof dat je een idee hebt!</h2>
        <form onSubmit={this.submitForm}>
          <label>
            Wat zijn jullie namen?
            <input name="authors" type="text" onChange={this.changeInput} value={this.state.authors} />
          </label>
          <label>
            Wil je een mailtje ontvangen als Lukas, Kristin, of een andere Q42'er op jullie idee heeft gereageerd?<br />Vul dan hier een e-mailadres in
            <input name="emails" type="text" onChange={this.changeInput} value={this.state.emails} />
          </label>
          <label>
            Wat is de naam van jullie idee?
            <input name="title" type="text" onChange={this.changeInput} value={this.state.title} />
          </label>
          <label>
            Schrijf hier kort op wat jullie idee is:
            <textarea name="description" onChange={this.changeInput}>{this.state.description}</textarea>
          </label>
          <label>
            En je kan er ook nog foto's bij doen als je wilt:
            <input id="file" type="file" multiple="true" />
          </label>
          {submitButton}
        </form>
      </div>
    )
  }
});
