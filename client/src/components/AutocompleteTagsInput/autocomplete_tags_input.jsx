import React, { Component } from 'react';
import './autocomplete_tags_input.sass'
import TagsInput from 'react-tagsinput'
import Autosuggest from 'react-autosuggest';

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

class AutocompleteTagsInput extends React.Component {
  constructor () {
    super()
    this.state = {tags: []}

    this.handleChange = this.handleChange.bind(this);
    this.autocompleteRenderInput = this.autocompleteRenderInput.bind(this);
  }

  handleChange (tags) {
    this.setState({tags})
    this.props.updateTags(tags)
  }

  autocompleteRenderInput ({addTag, ...props}) {
    const handleOnChange = (e, {newValue, method}) => {
      if (method === 'enter') {
        e.preventDefault()
      } else {
        props.onChange(e)
      }
    }

    const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
    const inputLength = inputValue.length

    let suggestions = this.props.tags().filter((state) => {
      return state.name.toLowerCase().slice(0, inputLength) === inputValue && !this.state.tags.includes(state.name)
    })

    const styles = {
      container: {
        flexGrow: 1,
        position: 'relative',
        display: 'inline-block'
      },
      suggestionsContainerOpen: {
        position: 'absolute',
        // marginTop: 10,
        // marginBottom: 10 * 3,
        left: 0,
        right: 0,
        // 'border-color': 'black'
      },
      suggestion: {
        display: 'block',
        background: 'white',
        fontFamily: 'sans-serif',
        fontSize: '13px',
        fontWeight: '400',
        marginBottom: '5px',
        marginRight: '5px',
        padding: '5px'
      },
      suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
      },
      textField: {
        width: '100%',
      },
      suggestionHighlighted: {
        background:'grey'
      }
    }

    return (
      <Autosuggest
        ref={props.ref}
        suggestions={suggestions}
        shouldRenderSuggestions={(value) => value && value.trim().length > 0}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
        inputProps={{...props, onChange: handleOnChange}}
        onSuggestionSelected={(e, {suggestion}) => {
          addTag(suggestion.name)
        }}
        onSuggestionsClearRequested={() => {}}
        onSuggestionsFetchRequested={() => {}}
        theme={styles}
      />
    )
  }

  render () {
    return <TagsInput renderInput={this.autocompleteRenderInput} value={this.state.tags} onChange={this.handleChange} onlyUnique={true} />
  }
}

export default AutocompleteTagsInput
