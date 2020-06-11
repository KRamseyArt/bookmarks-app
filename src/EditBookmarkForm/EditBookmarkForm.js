import React, { Component } from 'react';
import BookmarksContext from '../BookmarksContext';

import config from '../config';
import './EditBookmarkForm.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

export class EditBookmarkForm extends Component {
  static contextType = BookmarksContext;

  state = {
    id: '',
    title: '',
    url: '',
    description: '',
    rating: 1,
    error: null,
  };

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId;
    fetch(`http://localhost:8000/api/bookmarks/${bookmarkId}`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        console.log(res);
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          id: data.id,
          title: data.title,
          url: data.url,
          description: data.description,
          rating: data.rating
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleSubmit = e => {
    e.preventDefault();
    // get the form fields from the event
    const { title, url, description, rating } = e.target
    const bookmark = {
      title: title.value,
      bookmarkurl: url.value,
      description: description.value,
      rating: rating.value,
    }
    // this.setState({ error: null })
    
    fetch(`http://localhost:8000/api/bookmarks/${this.props.match.params.bookmarkId}`, {
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        console.log(res);
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        this.context.updateBookmark(bookmark)
        this.props.history.push('/')

      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  }
  
  render() {
    const { title, url, description, rating, error } = this.state
    return (
      <section className='EditBookmark'>
        <h2>Edit a bookmark</h2>
        <form
          className='EditBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              defaultValue={title}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              defaultValue={url}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              defaultValue={description}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue={rating}
              min='1'
              max='5'
              required
            />
          </div>
          <div className='EditBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditBookmarkForm;