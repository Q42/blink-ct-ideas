import React from 'react';
import {mount} from 'react-mounter';
import {Layout} from './imports/layout.jsx';
import {Ideas} from '/imports/collections';

FlowRouter.route("/nieuw-idee", {
  action() {
    mount(Layout, {
      content: (<NewIdea final={false} />),
      homeBtn: (<a href="/" className="btn-home">Home</a>)
    });
  }
});

FlowRouter.route("/idee-klaar", {
  action() {
    mount(Layout, {
      content: (<NewIdea final={true} />),
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
    this.uploadComputations = {};
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
  handleUpload() {
    return new Promise((resolve, reject) => {
      const files = this.getAllFiles();
      let filesToUpload = files.length;

      let attachments = [];

      if(!files.length) {
        return resolve(attachments);
      }

      this.setState({
        nrOfUploads: filesToUpload,
        uploadProgress: []
      });

      files.forEach((file, i) => {
        this.setState(currentState => {
          currentState.uploadProgress[i] = 0;
          return currentState;
        });

        let uploader = new Slingshot.Upload("myFileUploads");
        uploader.send(file, (error, downloadUrl) => {
          this.setState(currentState => {
            currentState.uploadProgress[i] = 100;
            return currentState;
          });
          filesToUpload--;
          this.uploadComputations[i].stop();
          if(error) {
            console.error(error);
            toastr.error('Je afbeelding is niet opgeslagen: ' + (uploader.xhr.response), 'Uh-oh');
            return reject(uploader.xhr.response);
          }

          attachments.push(downloadUrl);

          if(filesToUpload === 0) {
            return resolve(attachments);
          }
        });

        this.uploadComputations[i] = Tracker.autorun(() => {
          const progress = uploader.progress();
          if(progress) {
            this.setState(currentState => {
              currentState.uploadProgress[i] += progress;
              return currentState;
            });
          }
        });
      });
    });
  },
  submitForm(e) {
    e.preventDefault();
    this.setState({uploading: true});

    this.handleUpload().then(attachments => {
      Ideas.insert({
        school: this.state.school,
        authors: this.state.authors,
        emails: this.state.emails,
        title: this.state.title,
        description: this.state.description,
        attachments: attachments,
        final: this.props.final
      }, (err, _id) => {
        if(err) {
          console.error(err);
          toastr.error('Er is iets mis gegaan: ' + (err.reason || err), 'Uh-oh');
          this.afterFailedSubmit();
        } else {
          let currentIdeas = Session.get('myIdeas') || [];
          currentIdeas.push(_id);
          Session.setPersistent({
            myIdeas: currentIdeas
          });

          let successMessage = 'Het idee is toegevoegd! ';
          if(this.state.emails) {
            successMessage += `Jullie krijgen een e-mailbericht op ${ this.state.emails } wanneer er een reactie is.`;
          } else {
            successMessage += 'Bezoek deze pagina regelmatig om nieuwe reacties te zien!';
          }
          toastr.success(successMessage, 'Gelukt!', { timeOut: 10000 });
          this.afterSuccessfulSubmit(_id);
        }
      });
    }).catch(() => {
      this.afterFailedSubmit();
    });
  },
  afterSuccessfulSubmit(_id) {
    FlowRouter.go('/ideeen/' + _id);
  },
  afterFailedSubmit() {
    this.setState({uploading: false});
  },
  render() {
    let submitButton;
    if(this.state.uploading) {
      submitButton = <input className="cta" type="submit" value="Bezig met versturen..." disabled="disabled" />;
    } else if (this.props.final) {
      submitButton = <input className="cta" type="submit" value="Verstuur naar de jury" />;
    } else {
      submitButton = <input className="cta" type="submit" value="Verstuur naar het Lab" />;
    }

    let mailTxt = this.props.final ?
      <p>Vul hier een emailadres in zodat we jullie kunnen laten weten als jullie gewonnen hebben</p> :
      <p>Wil je een mailtje ontvangen als Lukas, Kristin, of een andere Q42'er op jullie idee heeft gereageerd?<br />Vul dan hier een e-mailadres in</p>;

    let h1Txt = this.props.final ?
      <div><h2>Win een bezoek bij Q42!</h2><p>Wie het beste idee opstuurt, wint een bezoek bij Q42. Dus doe je best!</p></div> :
      <div><h2>Tof dat je een idee hebt!</h2><p>Vul hier de gegevens over je idee in, en krijg van Lukas of een andere Q42'er feedback over je idee.</p></div>;

    return (
      <div className="pane small">
        {h1Txt}
        <form onSubmit={this.submitForm}>
          <label>
            Op welke school zitten jullie?
            <input name="school" type="text" onChange={this.changeInput} value={this.state.school} />
          </label>
          <label>
            Wat zijn jullie namen?
            <input name="authors" type="text" onChange={this.changeInput} value={this.state.authors} />
          </label>
          <label>
            {mailTxt}
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
            En je kan er ook nog foto&#39;s bij doen als je wilt:
            {this.renderFileInput()}
          </label>
          {this.renderProgressBar()}
          {submitButton}
        </form>
      </div>
    );
  },
  renderFileInput() {
    let fileInputs = [];
    if(this.state.files) {
      fileInputs = this.state.files.map((files, id) => {
        return <input id={ id } type="file" multiple="true" key={ id } onChange={ this.updateFiles } />;
      });
    }

    const allInputsHaveValues = (this.state.files || []).reduce((current, files) => {
      return current && files;
    }, true);

    if(allInputsHaveValues) {
      const id = this.state.files ? this.state.files.length : -1;
      fileInputs.push(<input id={ id } type="file" multiple="true" key={ id } onChange={ this.updateFiles } />);
    }

    return fileInputs;
  },
  renderProgressBar() {
    if(!this.state.uploading || !this.state.uploadProgress) {
      return null;
    }

    const progress = this.state.uploadProgress.reduce((total, current) => {
      return total + current;
    }, 0);

    const percentage = progress / this.state.nrOfUploads;
    return (
      <div className="progress">
        <div className="progress-bar" role="progressbar" aria-valuenow="{ percentage }" aria-valuemin="0" aria-valuemax="100" style={{ width: percentage + '%' }}>
          <span className="sr-only">{ percentage }% Complete</span>
        </div>
      </div>
    );
  }
});
