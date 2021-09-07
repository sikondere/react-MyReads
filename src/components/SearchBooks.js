import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SelectBook from './SelectBook';
import * as BooksAPI from '../BooksAPI';

/**
 * @description class based component for the search page
 * @constructor
 */
class SearchBooks extends Component {

    state = {
        results: [],
    }
    /**
     * @description function to handle when a user chnages the book from one shelf to another
     * or removes a book from  their shelves
     * @param {event} e -the observed event
     * @listens event
     */
    handleOnChange = (event) => {
        const query = event.target.value;
        BooksAPI.search(query)
            .then((books) => {
                if(Array.isArray(books)) {
                    this.setState(() => ({
                        results: books
                    }));
                } else {
                    this.setState(() => ({
                        results: []
                    }));
                }
            })
    };
    /**
     * @description renders the search page which comprises of an ordered list of books,
     * an input that alllows the user to search for books and a link  back to the main page
     * @returns an element that is an array of list items
     */
    render() {
        let results = this.state.results;
        results = Array.isArray(results) ? results : [];
        results = results.filter((book) => {
            return (book.imageLinks !== undefined && book.imageLinks !== null);
            }).map((book) => (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                            <SelectBook book={book} shelfs={this.props.shelfs} handleOnUpdate={this.props.handleOnUpdate} />
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', ') : ''}</div>
                        </div>
                </li>
        ));
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search"
                      to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text"
                       onChange={this.handleOnChange}
                       placeholder="Search by title or author" />
                </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {results}
                    </ol>
                </div>
          </div>
        );
    }
}

SearchBooks.propTypes = {
    /**
     * @description an array that represents the books on a users books shelf
     */
    shelfs: PropTypes.array.isRequired,
    /**
     * @description a function to handle the change of a book from one shelf to another
     */
    handleOnUpdate: PropTypes.func.isRequired,
};

export default SearchBooks;