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
    defaultValue: PropTypes.string
  },

  getDefaultProps: function() {
    return {
      text: 'initial'
    };
  },

  getInitialState: function() {
    return {
      text: this.props.defaultValue
    };
  },

  _textChange: function(ev) {
    this.setState({
      text: ev.target.value
    })
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      text: newProps.defaultValue,
    });
  },

  render: function() {
    return (
      <div>
        <textarea onChange={ this._textChange } value={ this.state.text }></textarea>
        <h3>{ this.state.text.length }</h3>
      </div>
    );
  }
});

const myTextAreaCounter = ReactDOM.render(
  React.createElement(TextAreaCounter, {
    defaultValue: "Arthur"
  }),
  document.getElementById("app")
);
