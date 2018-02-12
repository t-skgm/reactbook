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

const TextAreaCounter = createReactClass({
  propTypes: {
    textAreaValue: PropTypes.string
  },

  getDefaultProps: function() {
    return {
      textAreaValue: 'initial'
    };
  },

  getInitialState: function() {
    return {
      textAreaValue: this.props.textAreaValue
    };
  },

  _textChange: function(ev) {
    this.setState({
      textAreaValue: ev.target.value
    })
  },

  render: function() {
    return (
      <div>
        <textarea onChange={ this._textChange } defaultValue={ this.props.textAreaValue }></textarea>
      <h3>{ this.state.textAreaValue.length }</h3>
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(TextAreaCounter, {
    textAreaValue: "Arthur"
  }),
  document.getElementById("app")
);
