import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import LoggerBox from './components/component-generic'

jQuery(function() {
  ReactDOM.render(
    <LoggerBox />,
    document.getElementById('logger-box'),
    function() {
        console.log('Ready!');
    }
  );
})
