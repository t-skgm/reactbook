import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
const createReactClass = require('create-react-class');

const Component = createReactClass({
  propTypes: {
    firstName: PropTypes.string.isRequired,
    middleName: PropTypes.string,
    familyName: PropTypes.string.isRequired,
    address: PropTypes.string
  },

  getDefaultProps: function() {
    return {
      middleName: '',
      address: 'unknown'
    };
  },

  render: function() {
    return <span>I'm { this.props.firstName } { this.props.middleName } { this.props.familyName } from { this.props.address }.</span>;
  }
});

ReactDOM.render(
  React.createElement(Component, {
    firstName: "Arthur",
    middleName: "Charles",
    familyName: "Clarke"
  }),
  document.getElementById("app")
);
