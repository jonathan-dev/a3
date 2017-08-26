import React from 'react';
import {render} from 'react-dom';

class PostUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      file: '',
      imagePreviewUrl: ''
    };

    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  handleImageChange(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file)
  }

  // TODO: make generic attribute change, so that this method can be used for all input changes except file changes
  handleInputChange (event) {
    this.setState {
      title: event.target.value;
    }
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">No image selected</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(event)=>this.handleSubmit(event)}>
          <label>
            Title:
            <input type="text" value={this.state.title} onChange={this.handleInputChange} />
          </label>
          <input className="fileInput"
                 type="file"
                 onChange={(event)=>this.handleImageChange(event)} />
          <button className="submitButton"
                  type="submit"
                  onClick={(event)=>this.handleSubmit(event)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    );
  }
}

render(<PostUpload/>, document.getElementById("app"));
