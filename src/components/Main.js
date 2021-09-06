import React, { Component } from 'react';
import Select from './Select';

class Main extends Component {

    getBooksByShelf = (shelf) => {
        let results = this.props.shelfs;
        results = results.filter((book) => {
            return (book.shelf === shelf);
            }).map((book) => (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                            <Select book={book} shelfs={this.props.shelfs} handleOnUpdate={this.props.handleOnUpdate} />
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', ') : ''}</div>
                        </div>
                </li>
        ));
        return results;
    }

    render() {
        let currentlyReading = this.getBooksByShelf('currentlyReading');
        let wantToRead = this.getBooksByShelf('wantToRead');
        let read = this.getBooksByShelf('read');

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {currentlyReading}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {wantToRead}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {read}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;