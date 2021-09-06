import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';

class Select extends Component {
    
    handleOnChange = (event) => {
        let shelf = event.target.value;
        let book = this.props.book;
        this.setState({ value: shelf});
        BooksAPI.update(book, shelf)
                .then((books) => {
                    this.setState(() => ({
                        results: books
                    }));
                })
        this.props.handleOnUpdate();
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
        
        let shelf = this.getCurrentShelf();

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

export default Select;