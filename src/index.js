import React from 'react';
import ReactDOM from 'react-dom';
const createReactClass = require('create-react-class');

const Component = createReactClass({
  render: function() {
    return <span>I'm { this.props.name }.</span>;
  }
});

ReactDOM.render(
  React.createElement(Component, {
    name: "Bob"
  }),
  document.getElementById("app")
);
