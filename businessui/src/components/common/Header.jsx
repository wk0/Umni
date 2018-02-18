import React from 'react';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import {Navbar, Nav, NavItem, MenuItem} from 'react-bootstrap';
import Web3 from 'web3'
import CheckIfMetaMask from './CheckIfMetaMask';
import {Jumbotron} from 'react-bootstrap';


export default class NewHeader extends React.Component {
    
  constructor(props) {
      super(props)
      
      
      this.state = {
          pubKey: "",
      }
      
  }

  componentWillMount() {
      CheckIfMetaMask.then((web3)=>{
          if(web3){              
              web3.eth.getAccounts((err, res) => {                   
                this.setState({
                    pubKey: res[0],
                });
              });
          }
      });
  }
    
    
    
    
    
    
    
  render() {
    return (
      <div> 
    <Navbar>
    <Navbar.Header>
    <Navbar.Brand>
      Welcome {this.state.pubKey} !
    </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href='/history'>Home</NavItem>
      <NavItem eventKey={2} href='/sell'>Sell Products</NavItem>
      <NavItem eventKey={3} href='/analyitcs'>Analytics</NavItem>
      <NavItem eventKey={4} href='/about'>About</NavItem>
    </Nav>
  </Navbar>
     </div>
    );
  }
}