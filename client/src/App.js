import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import TodoApp from './components/TodoApp';

class App extends Component {

  render() {
    return(
   
        <Layout>
        <TodoApp/>
          </Layout>   
  )};
}
export default App;