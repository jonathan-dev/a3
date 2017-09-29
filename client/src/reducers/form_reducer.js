import { FORM_INPUT_CHANGED } from '../constants/action_types';

let initialState = {};

export function FormUpdating(state = initialState, action) {
    switch (action.type) {
        case FORM_INPUT_CHANGED: return Object.assign({}, state, action.changedInput); // changed input is key value pair of changed attribute and its new value
        default: return state;
    }
}
