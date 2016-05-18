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
    return {
      uploading: false,
      files: []
    };
  },
  changeInput(e) {
    const target = e.target;
    let changedObj = {};
    changedObj[target.name] = target.value;
    this.setState(changedObj);
  },
  updateFiles(e) {
    const target = e.target;
    let files = this.state.files;
    files[target.getAttribute('id')] = target.files;
    this.setState({
      files: files
    });
  },
  getAllFiles() {
    if(!this.state.files) {
      return [];
    }

    return this.state.files.reduce((list, files) => {
      return list.concat(Array.prototype.slice.call(files));
    }, []);
  },
  submitForm(e) {
    e.preventDefault();
    this.setState({uploading:true});
    const filesState = this.state.files;
    Ideas.insert(this.state, (err, _id) => {
      this.setState({
        files: filesState
      });
      if (err) {
        console.error(err);
        toastr.error('Er is iets mis gegaan: ' + (err.reason || err), 'Uh-oh');
        this.afterFailedSubmit(_id);
      } else {
        const files = this.getAllFiles();
        let filesToUpload = files.length;
        if (files.length) {
          const uploaders = _.map(files, (file) => {
            var uploader = new Slingshot.Upload("myFileUploads");
            uploader.send(file, (error, downloadUrl) => {
              filesToUpload--;
              if (error) {
                console.error(error);
                toastr.error('Je afbeelding is niet opgeslagen: ' + (uploader.xhr.response), 'Uh-oh');
                this.afterFailedSubmit(_id);
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
    this.setState({uploading:false});
    FlowRouter.go('/ideeen/' + _id);
  },
  afterFailedSubmit(_id) {
    this.setState({uploading:false});
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
            {this.renderFileInput()}
          </label>
          {submitButton}
        </form>
      </div>
    )
  },
  renderFileInput() {
    let fileInputs;
    if(this.state.files) {
      fileInputs = this.state.files.map((files, id) => {
        return <input id={ id } type="file" multiple="true" key={ id } onChange={ this.updateFiles } />;
      });
    }

    const allInputsHaveValues = (this.state.files || []).reduce((current, files) => {
      return current && files
    }, true);

    if(allInputsHaveValues) {
      const id = this.state.files.length;
      fileInputs.push(<input id={ id } type="file" multiple="true" key={ id } onChange={ this.updateFiles } />);
    }

    return fileInputs;
  }
});
