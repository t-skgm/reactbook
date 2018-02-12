import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
const createReactClass = require('create-react-class');

const Component = createReactClass({
  propTypes: {
    name: PropTypes.string.isRequired
  },
  render: function() {
    return <span>I'm { this.props.name }.</span>;
  }
});

ReactDOM.render(
  React.createElement(Component, {
    // name: "Bob"
  }),
  document.getElementById("app")
);
