// __mocks__/react-router-dom.js
const React = require('react');

module.exports = {
  // Always return a default pageId for testing purposes.
  useParams: () => ({ pageId: 'S1' }),
  
  // Minimal BrowserRouter mock that simply renders its children.
  BrowserRouter: ({ children }) => <>{children}</>,
  
  // If you use Link, provide a basic mock:
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
};
