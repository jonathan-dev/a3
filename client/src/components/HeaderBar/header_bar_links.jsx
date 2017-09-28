// links that will always be displayed
const standardHeaderBarLinks = [
  <Link to="/">Home</Link>,
  <Link to="/create">create</Link>,
];

// links that will only be displayed when user not logged in
export const unauthenticatedHeaderBarLinks = standardHeaderBarLinks.concat([
  <Link to="/login">login</Link>,
  <Link to="/register">register</Link>
]);

export const authenticatedHeaderBarLinks = standardHeaderBarLinks.concat([
  <Link to="/logout">logout</Link>
]);
