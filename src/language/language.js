/**
 * Script for binding all textual language-translations in one language object and exporting it.
 * Import the language object you wish to add here and add it in a new entry in the languages object.
 *
 * To access the actual string reference use: languages[languageKey][entryKey].
 *
 * Example: message = languages['english']['upvotes'];
 *
 * Furthermore, you should use variables for atleast the languageKey in order to dynamically change the
 * desired language during the runtime:
 *
 * let languageKey = 'english';
 * message = languages[languageKey]['upvotes']; // english text for upvotes will be displayed
 *
 * languageKey = 'german'; // user changed language settings
 * message = languages[languageKey]['upvotes']; // german text for upvotes will be displayed, if german language is given
 */

import english from './english_language'

let languages = {
  // reference your imported language here
  english: english
};

export default languages;
