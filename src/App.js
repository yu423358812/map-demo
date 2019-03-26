import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import Saved from './pages/saved';
import store from './store';

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
      	<BrowserRouter>
      		<div>
            <Header />
      			<Route path='/' exact component={Home}></Route>
            <Route path='/saved' exact component={Saved}></Route>
      		</div>
      	</BrowserRouter>
      </Provider>
    );
  }
}

export default App;

