import React, { Component } from 'react';
import Navbar from './components/Navbar';
import './App.css';
 
import {Provider} from 'react-redux'
import store from './store';
import { Dashboard } from './components/Dashboard';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import { Footer } from './components/Footer';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ShoppingCart from './components/ShoppingCart';


class  App extends Component {
 render() {

  return (
    <Provider store={store}>
       <div className="App">
       
     <BrowserRouter>
     <Navbar />
     <Switch>
        
       <Route exact path="/" component={Dashboard} />
       <Route   path="/addBook" component={AddBook} />
       <Route   path="/updateBook/:id" component={UpdateBook} />
       <Route   path="/cart" component={ShoppingCart} />
       <Route   path="/signUp" component={SignUp} />
       <Route   path="/signIn" component={SignIn} />
        </Switch>
         
     </BrowserRouter>
    </div>
    </Provider>
  );
 }
}

export default App;
