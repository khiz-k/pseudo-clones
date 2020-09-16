import React, { useState } from 'react';

export default function SearchBox(props) {
  const [keyword, setKeyword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/search/keyword/${keyword}`);
  };
  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="primary" type="submit">
          <i className="fa fa-search" />
        </button>
      </div>
    </form>
  );
}
