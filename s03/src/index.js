import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import PureRenderMixin from 'react-addons-pure-render-mixin';
const createReactClass = require('create-react-class');

const headers = [
  'Book', 'Author(s)', 'Original language', 'First published', 'Approximate sales'
];

const data = [
  ["Don Quixote", "Miguel de Cervantes", "Spanish", "1605", "500 million"],
  ["A Tale of Two Cities", "Charles Dickens", "English", "1859", "200 million"],
  ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954–1955", "150 million"],
  ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"],
  ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "120 million"],
  ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
  ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
  ["紅樓夢/红楼梦 (Dream of the Red Chamber)", "Cao Xueqin", "Chinese", "1754", "100 million"],
  ["Alice's Adventures in Wonderland", "Lewis Carroll", "English", "1865", "100 million"],
]

var Excel = createReactClass({
  displayName: 'Excel',

  propTypes: {
    haders: PropTypes.arrayOf(
      PropTypes.string
    ),
    initialData: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.string
      )
    ),
  },

  getInitialState: function() {
    return { data: this.props.initialData };
  },

  render: function() {
    return(
      <table className="table table-striped">
        <thead>
          <tr>
            {
              this.props.headers.map(function(title, idx) {
                return <th key={ idx }>{ title }</th>;
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            this.state.data.map(function(row, idx) {
              return(
                <tr key={ idx }>
                  {
                    row.map(function(cell, idx) {
                      return(<td key={ idx }>{ cell }</td>);
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
});

ReactDOM.render(
  React.createElement(Excel, {
    headers: headers,
    initialData: data,
  }),
  document.getElementById("app")
);
