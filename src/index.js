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

const logMixin = {
  _log: function(methodName, args) {
    console.log(this.name + '::' + methodName, args);
  },

  componentWillUpdate: function() {
    this._log('componentWillUpdate', arguments);
  },

  componentDidUpdate: function() {
    this._log('componentDidUpdate', arguments);
  },

  componentWillMount: function() {
    this._log('componentWillMount', arguments);
  },

  componentDidMount: function() {
    this._log('componentDidMount', arguments);
  },

  componentWillUnmount: function() {
    this._log('componentWillUnmount', arguments);
  },
};

const Counter = createReactClass({
  name: 'Counter',
  // mixins: [logMixin],

  propTypes: {
    count: PropTypes.number.isRequired,
  },

  shouldComponentUpdate(nextProps, _nextState) {
    return nextProps.count !== this.props.count;
  },

  render: function() {
    console.log(this.name + '::render()');
    return <span>{ this.props.count }</span>;
  },
});

const TextAreaCounter = createReactClass({
  name: 'TextAreaCounter',
  // mixins: [logMixin],

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
    console.log(this.name + '::render()');
    let counter = null;
    if (this.state.text.length > 0) {
      counter = <h3><Counter count={ this.state.text.length }/></h3>;
    }
    return(
      <div>
        <textarea onChange={ this._textChange } value={ this.state.text }></textarea>
        { counter }
      </div>
    );
  },
});

const myTextAreaCounter = ReactDOM.render(
  React.createElement(TextAreaCounter, {
    defaultValue: "Arthur"
  }),
  document.getElementById("app")
);
