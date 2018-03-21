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
    headers: PropTypes.arrayOf(
      PropTypes.string
    ),
    initialData: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.string
      )
    ),
  },

  getInitialState: function() {
    return {
      data: this.props.initialData,
      sortby: null,
      descending: false,
      edit: null, // { row: row-index, cell: cell-index }
      search: false,
    };
  },

  _sort: function(e) {
    const column = e.target.cellIndex;
    const data = Array.from(this.state.data);
    const descending = this.state.sortby === column && !this.state.descending;

    data.sort(function(a, b) {
      return descending
        ? (a[column] < b[column] ? 1 : -1)
        : (a[column] > b[column] ? 1 : -1);
    });

    this.setState({
      data: data,
      sortby: column,
      descending: descending,
    });
  },

  _showEditor: function(e) {
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex,
      }
    });
  },

  _save: function(e) {
    e.preventDefault(); // Disable default submit action
    const input = e.target.firstChild;
    const data = this.state.data.slice();
    data[this.state.edit.row][this.state.edit.cell] = input.value;

    this.setState({
      edit: null, // finish editing
      data: data,
    });
  },

  _preSearchData: null,

  _toggleSearch: function() {
    if (this.state.search) {
      this.setState({
        data: this._preSearchData,
        search: false,
      });
      this._preSearchData = null;
    } else {
      this._preSearchData = this.state.data;
      this.setState({
        search: true,
      });
    }
  },

  _search: function(e) {
    const needle = e.target.value.toLowerCase();
    if (!needle) { // when search text is empty
      this.setState({ data: this._preSearchData });
      return;
    }
    const idx = e.target.dataset.idx; // target column idx
    const searchData = this._preSearchData.filter(function(row) {
      return row[idx].toString().toLowerCase().indexOf(needle) > -1;
    });
    this.setState({ data: searchData });
  },

  render: function() {
    return(
      <div>
        { this._renderToolbar() }
        { this._renderTable() }
      </div>
    )
  },

  _renderToolbar: function() {
    return <button onClick={ this._toggleSearch } className="toolbar">検索</button>;
  },

  _renderSearch: function() {
    if (!this.state.search) {
      return null;
    }
    return(
      <tr onChange={ this._search }>
        {
          this.props.headers.map(function(_, idx) {
            return(
              <td key={ idx }>
                <input type="text" data-idx={ idx } />
              </td>
            );
          })
        }
      </tr>
    );
  },

  _renderTable: function() {
    return(
      <table className="table table-striped">
        <thead onClick={ this._sort }>
          <tr>
            {
              this.props.headers.map(function(title, idx) {
                if (this.state.sortby === idx) {
                  title += this.state.descending ? ' \u2191' : ' \u2193'
                }
                return <th key={ idx }>{ title }</th>;
              }, this)
            }
          </tr>
        </thead>
        <tbody onDoubleClick={ this._showEditor }>
          { this._renderSearch() }
          { this.state.data.map(function(row, rowidx) {
              return(
                <tr key={ rowidx }>
                  {
                    row.map(function(cell, idx) {
                      let content = cell;
                      const edit = this.state.edit;
                      if (edit && edit.row === rowidx && edit.cell === idx) {
                        content =
                          <form onSubmit={ this._save }>
                            <input type="text" defaultValue={ content } />
                          </form>;
                      }
                      return(<td key={ idx } data-row={ rowidx }>{ content }</td>);
                    }, this)
                  }
                </tr>
              );
            }, this)
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
