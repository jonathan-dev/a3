import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Line } from 'rc-progress';
import { gql, graphql } from 'react-apollo';
import AutocompleteTagsInput from '@/AutocompleteTagsInput/autocomplete_tags_input'

const PostMutations = gql`
mutation PostMutations($post: PostInput!) {
  createPost(post: $post) {
    title
  }
}
`;

const TagsQuery = gql`
query tagListQuery {
  tags {
    id
    name
  }
}
`
class createPost extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: [],
      loaded: 0,
      title: '',
      imageId: '',
      tags: []
    }

    this.onDropHandler = this.onDropHandler.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getTags = this.getTags.bind(this);
    this.updateTags = this.updateTags.bind(this);
  }

  handleChange(event) {
    console.log(event.target)
    this.setState({title: event.target.value});
  }

  onClick() {
    console.log('click')
    this.props.mutate({
      variables: { post: {title:this.state.title, imageId: this.state.imageId, tags: []} }
      //TODO: hadle tags
    })
      .then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
  }

  updateTags(tags){
    this.setState({tags})
  }

  getTags() {
    if(this.props && this.props.data && this.props.data.tags)
      return this.props.data.tags
    return []
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
        this.setState({imageId: data.imageId})
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
        <input type="text" onChange={this.handleChange} />
        <AutocompleteTagsInput updateTags={this.updateTags} tags={this.getTags}/>
        <button onClick={this.onClick}>post</button>
      </section>
    );
  }
}

export default graphql(PostMutations)(
  graphql(TagsQuery)(createPost))

/**
 * TODO: add styling
 * TODO: compress image before upload see trello
 */
