import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Line, Circle } from 'rc-progress';
import { gql, graphql } from 'react-apollo';
import './create_post.sass'

import TagsInput from 'react-tagsinput'
import Autosuggest from 'react-autosuggest';

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
function states () {
  return [
    {abbr: 'AL', name: 'Alabama'},
    {abbr: 'AK', name: 'Alaska'},
    {abbr: 'AZ', name: 'Arizona'},
    {abbr: 'AR', name: 'Arkansas'},
    {abbr: 'CA', name: 'California'},
    {abbr: 'CO', name: 'Colorado'},
    {abbr: 'CT', name: 'Connecticut'},
    {abbr: 'DE', name: 'Delaware'},
    {abbr: 'FL', name: 'Florida'},
    {abbr: 'GA', name: 'Georgia'},
    {abbr: 'HI', name: 'Hawaii'},
    {abbr: 'ID', name: 'Idaho'},
    {abbr: 'IL', name: 'Illinois'},
    {abbr: 'IN', name: 'Indiana'},
    {abbr: 'IA', name: 'Iowa'},
    {abbr: 'KS', name: 'Kansas'},
    {abbr: 'KY', name: 'Kentucky'},
    {abbr: 'LA', name: 'Louisiana'},
    {abbr: 'ME', name: 'Maine'},
    {abbr: 'MD', name: 'Maryland'},
    {abbr: 'MA', name: 'Massachusetts'},
    {abbr: 'MI', name: 'Michigan'},
    {abbr: 'MN', name: 'Minnesota'},
    {abbr: 'MS', name: 'Mississippi'},
    {abbr: 'MO', name: 'Missouri'},
    {abbr: 'MT', name: 'Montana'},
    {abbr: 'NE', name: 'Nebraska'},
    {abbr: 'NV', name: 'Nevada'},
    {abbr: 'NH', name: 'New Hampshire'},
    {abbr: 'NJ', name: 'New Jersey'},
    {abbr: 'NM', name: 'New Mexico'},
    {abbr: 'NY', name: 'New York'},
    {abbr: 'NC', name: 'North Carolina'},
    {abbr: 'ND', name: 'North Dakota'},
    {abbr: 'OH', name: 'Ohio'},
    {abbr: 'OK', name: 'Oklahoma'},
    {abbr: 'OR', name: 'Oregon'},
    {abbr: 'PA', name: 'Pennsylvania'},
    {abbr: 'RI', name: 'Rhode Island'},
    {abbr: 'SC', name: 'South Carolina'},
    {abbr: 'SD', name: 'South Dakota'},
    {abbr: 'TN', name: 'Tennessee'},
    {abbr: 'TX', name: 'Texas'},
    {abbr: 'UT', name: 'Utah'},
    {abbr: 'VT', name: 'Vermont'},
    {abbr: 'VA', name: 'Virginia'},
    {abbr: 'WA', name: 'Washington'},
    {abbr: 'WV', name: 'West Virginia'},
    {abbr: 'WI', name: 'Wisconsin'},
    {abbr: 'WY', name: 'Wyoming'}
  ]
}

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
    this.handleTagChange = this.handleTagChange.bind(this);
    this.getTags = this.getTags.bind(this);
    this.autosuggestRenderInput = this.autosuggestRenderInput.bind(this);
  }

  handleChange(event) {
    console.log(event.target)
    this.setState({title: event.target.value});
  }

  handleTagChange(tags){
    this.setState({tags})
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

  autosuggestRenderInput ({addTag, ...props}) {
    const handleOnChange = (e, {newValue, method}) => {
      if (method === 'enter') {
        e.preventDefault()
      } else {
        props.onChange(e)
      }
    }
    const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
    const inputLength = inputValue.length

    let suggestions = this.getTags().filter((state) => {
      return state.name.toLowerCase().slice(0, inputLength) === inputValue
    })

    return (
      <Autosuggest
        ref={props.ref}
        suggestions={suggestions}
        shouldRenderSuggestions={(value) => value && value.trim().length > 0}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
        inputProps={{...props, onChange: handleOnChange}}
        onSuggestionSelected={(e, {suggestion}) => {
          addTag(suggestion.name)
        }}
        onSuggestionsClearRequested={() => {}}
        onSuggestionsFetchRequested={() => {}}
      />
    )
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
        <TagsInput renderInput={this.autosuggestRenderInput} value={this.state.tags} onChange={this.handleTagChange} />
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
