import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Line, Circle } from 'rc-progress';
import { gql, graphql } from 'react-apollo';

const PostMutations = gql`
mutation PostMutations($post: PostInput!) {
  createPost(post: $post) {
    title
  }
}
`;

class createPost extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: [],
      loaded: 0
    }

    this.onDropHandler = this.onDropHandler.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log('click')
    this.props.mutate({
      variables: { post: {title:"create test", imageId:"23798739", tags: []} }
    })
      .then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  onDropHandler(accepted, rejected) {
    this.setState({ accepted, rejected});
    if(accepted) {

      let formData = new FormData();
      formData.append("index", 1);
      formData.append("image", accepted[0]);

      axios.post(window.location.origin+'/upload', formData, {
        onUploadProgress: (e) => {
          if (e.lengthComputable) {
            let loaded = Math.round((e.loaded / e.total) * 100);
            this.setState({loaded: loaded})
          }
        }
      })
      .then(response => {
        let data = response.data;
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
    }
   }

  render() {
    this.state.accepted.map(f => console.log('f: ', f))
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={this.onDropHandler}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
            <p>Only *.jpeg and *.png images will be accepted</p>
          </Dropzone>
          <Line percent={this.state.loaded} strokeWidth="4" strokeColor="#F00" />
        </div>
        <aside>
          <h2>Accepted files</h2>
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes
                <img src={f.preview}/></li>)
            }
          </ul>
          <h2>Rejected files</h2>
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
        <button onClick={this.onClick}>post</button>
      </section>
    );
  }
}

export default graphql(PostMutations)(createPost)
