import React, {Component} from 'react';
import {render} from 'react-dom';
import Axios from 'axios'
import ImagesUploader from 'react-images-uploader';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    Axios.post('/create/post', {
      title: "Kekse Title",
      file: this.state.file
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form action="/create/post" encType="multipart/form-data" method="post">
          <input className="fileInput"
                 type="file"
                 name="upload"
                 onChange={(e)=>this._handleImageChange(e)} />
          <input type="submit" value="upload" />
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}

class PostUpload extends React.Component {
  render () {
    return ();
  }
}

const element = (<form action="/create/post" enctype="multipart/form-data" method="post">
  Title:<br/>
  <input name="title"><br /><br />

    File:<br />
    <input type="file" name="upload" multiple="multiple"><br /><br />
      <input type="submit" value="Upload">
</form>));))))))))))))))

render(<ImageUpload/>, document.getElementById("app"));
