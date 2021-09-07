import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     shelfs: []
  }
  /**
   * @description method that calls BooksAPI getAll method and stores the results into
   * the component state
   */
  getData = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          shelfs: books
        }));
    })
  };
  /**
   * @description load data from the server in the componentDidMount using getData method
   */
  componentDidMount() {
    this.getData();
  }
  /**
   * @description method that is called in the SelectBook component each time a user changes the
   * selected books shelf. this causes a change in the state 'shelfs' and forces a re-render in the
   * ListBooks component
   */
  handleOnUpdate = () => {
    this.getData();
  }
  /**
   * @description renders the ListBooks and SelectBook components
   * @returns an html element
   */
  render() {
    return (
      <div>
      <Route exact path='/' render={()=>(
          <ListBooks shelfs={this.state.shelfs} handleOnUpdate={this.handleOnUpdate}/>
      )} />
      <Route path='/search' render={()=>(
          <SearchBooks shelfs={this.state.shelfs} handleOnUpdate={this.handleOnUpdate}/>
      )} />
      </div>
    )
  }
}

export default BooksApp
