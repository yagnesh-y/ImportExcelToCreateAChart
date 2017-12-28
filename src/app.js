import React from 'react';
import ReactDOM from 'react-dom';
import { Charts, Files } from './components/container';

const App = () => (
  <div>
    <Files />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
