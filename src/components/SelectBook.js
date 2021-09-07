import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from '../BooksAPI';

class SelectBook extends Component {
    handleOnChange = (event) => {
        const shelf = event.target.value;
        const book = this.props.book;
        this.setState({ value: shelf});
        BooksAPI.update(book, shelf)
                .then((books) => {
                    this.setState(() => ({
                        results: books
                    }));
                }).then(() => {
                    this.props.handleOnUpdate();
                })
    };

    getCurrentShelf = () => {
        let shelf = 'none'
        let results = this.props.shelfs;
        results= Array.isArray(results) ? results : [];
        results = results.filter((book) => (
           book.id === this.props.book.id
        ))
        if(results.length > 0) {
            shelf = results[0].shelf;
        }
        return shelf;
    };

    render() {
        const shelf = this.getCurrentShelf();

        return (
            <div className="book-shelf-changer">
                <select value={shelf} onChange={this.handleOnChange}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

SelectBook.propTypes = {
    book: PropTypes.object.isRequired,
    shelfs: PropTypes.array.isRequired,
    handleOnUpdate: PropTypes.func.isRequired,
};

export default SelectBook;