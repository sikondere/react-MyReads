import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI';

/**
 * @description class component that represents the select menu used to move books to different shelfs
 * @constructor
 */
class SelectBook extends Component {
    /**
     * @description event handler for when a user changes a book's shelf
     * @param {event} e -the observed event
     * @listens event
     */
    handleOnChange = (event) => {
        const shelf = event.target.value;
        const book = this.props.book;
        BooksAPI.update(book, shelf)
                .then(() => {
                    this.props.handleOnUpdate();
                })
    };
    /**
     * @description a function that checks if the currently selected book is on the user's shelfs and returns
     * the name of the shelf or returns 'none'
     * @returns {string} the shelf of the selected book
     */
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
    /**
     * @description renders a single select element
     * @returns a single select element
     */
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
    /**
     * @description represnts a single book object
     */
    book: PropTypes.object.isRequired,
    /**
     * @description an array that represents the books on a users books shelf
     */
    shelfs: PropTypes.array.isRequired,
    /**
     * @description a function to handle the change of a book from one shelf to another
     */
    handleOnUpdate: PropTypes.func.isRequired,
};

export default SelectBook;