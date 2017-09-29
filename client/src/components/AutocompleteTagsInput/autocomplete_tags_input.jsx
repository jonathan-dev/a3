import React, { Component } from 'react';
import './autocomplete_tags_input.sass'
import TagsInput from 'react-tagsinput'
import Autosuggest from 'react-autosuggest';

class AutocompleteTagsInput extends Component {
  constructor () {
    super()
    this.state = {tags: []}
  }

  handleChange = (tags) => {
    this.setState({tags})
    this.props.updateTags(tags)
  }

  autocompleteRenderInput = ({addTag, ...props}) => {
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
      if (state.name) {
        return state.name.toLowerCase().slice(0, inputLength) === inputValue && !this.state.tags.includes(state.name)
      }
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
