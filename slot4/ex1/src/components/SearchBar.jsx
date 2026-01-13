import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  return (
    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search orchid..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </Form>
  );
}

export default SearchBar;
