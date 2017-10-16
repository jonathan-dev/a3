/**
 * Extracted email text generation for reseting password
 * */

const resetPasswordURL = 'http://studio17.com.au/reset/';

// generate the password email text with the given validation token
export function generateEmailText (token) {
    return (
        'You are receiving this because you (or someone else) have requested the reset of the password + ' +
        'for your account.\n\nPlease click on the following link, or paste this into your browser to complete + ' +
        'the process:\n\n' + resetPasswordURL + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        );
}
