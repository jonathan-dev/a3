import React, { Component } from 'react';
import './autocomplete_tags_input.sass';
import TagsInput from 'react-tagsinput';
import Autosuggest from 'react-autosuggest';

/**
 * Combine TagsInput Autosuggest to a custom input for Tag selection
 *
 * The state is handled intern to keep this component modular and independent
 */
class AutocompleteTagsInput extends Component {

    autocompleteRenderInput = ({ addTag, ...props }) => {

        const inputValue = (props.value && props.value.trim().toLowerCase()) || '';
        const inputLength = inputValue.length
        let tags = this.props.tags || [];
        let suggestions = tags.filter((state) => {
            if (state.name) {
                return state.name.toLowerCase().slice(0, inputLength) === inputValue && !tags.includes(state.name)
            }
        }).slice(0,5);

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
                background: 'grey'
            }
        }

        return (
            <Autosuggest
                ref={props.ref}
                suggestions={suggestions}
                shouldRenderSuggestions={(value) => value && value.trim().length > 0}
                getSuggestionValue={(suggestion) => suggestion.name}
                renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
                inputProps={{ ...props, onChange: props.onChange }}
                onSuggestionSelected={(e, { suggestion }) => {
                    addTag(suggestion.name)
                }}
                onSuggestionsClearRequested={() => { }}
                onSuggestionsFetchRequested={() => { }}
                theme={styles}
            />
        )
    }

    render() {
        return <TagsInput
        addKeys={[32, 9, 13]}
        renderInput={this.autocompleteRenderInput}
        value={this.props.selectedTags}
        onChange={this.props.onUpdateTags}
        onlyUnique={true} />
    }
}

export default AutocompleteTagsInput
