import React from 'react';
import {BrowserRouter, Switch, Link, Route, Redirect, withRouter} from 'react-router-dom'
import About from './common/About.jsx';
import SellProductPage from './product/SellProductPage.jsx';
import History from './history/History.jsx';
import Analytics from './analytics/Analytics.jsx';
import Error from './common/Error.jsx';
import GenericItemForm from './product/GenericItemForm.jsx';
import PhoneItemForm from './product/PhoneItemForm.jsx';
import ShoeItemForm from './product/ShoeItemForm.jsx';


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={History}/>
      <Route path='/error' component={Error}/>
      <Route path='/sell' component={SellProductPage}/>
      <Route path='/analytics' component={Analytics}/>    
      <Route path='/about' component={About}/>
      <Route path='/genericitemform' component={GenericItemForm}/>
    </Switch>
  </main>   
)



export default Main;