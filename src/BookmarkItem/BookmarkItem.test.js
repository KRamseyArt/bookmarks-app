import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkItem from './BookmarkItem';
import { MemoryRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter>
      <BookmarkItem
        title="Test Title"
        url="http://www.google.com"
      />
    </MemoryRouter>,div);
  ReactDOM.unmountComponentAtNode(div);
});
