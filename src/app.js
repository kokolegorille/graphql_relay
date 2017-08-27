import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

main();

function main() {
  const app = document.getElementById('app');
  render(
    <h1>Hello world!</h1>,
    app
  );
}