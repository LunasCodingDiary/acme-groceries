import React from 'react';
import { connect } from 'react-redux';

const Nav = ({ groceries, view })=> {  // the name should be exactly the same, because that's how they are exported.
  const needs = groceries.filter(grocery => !grocery.purchased);
  const purchased = groceries.filter(grocery => grocery.purchased);
  return (
    <nav>
      <a href='#' className={ !view ? 'selected': ''}>All ({ groceries.length })</a>
      <a href='#needs' className={ view === 'needs' ? 'selected': ''}>Needs ({ needs.length})</a>
      <a href='#purchased' className={ view === 'purchased' ? 'selected': ''}>Purchased ({ purchased.length })</a>
    </nav>
  );
};


export default connect(state => state )(Nav);
