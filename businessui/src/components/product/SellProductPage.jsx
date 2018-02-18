import React from 'react';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import {Jumbotron, DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap';
import Web3 from 'web3'
import CheckIfMetaMask from '../common/CheckIfMetaMask';
import Error from '../common/Error';
import GenericItemForm from './GenericItemForm.jsx';

export default class SellProductPage extends React.Component {
    
  constructor(props) {
      super(props)
      
      
      this.state = {
          pubKey: null,
          metamask: false,
          web3 : null,
          productTypes : ['Generic', 'Shoes', 'Tickets', 'Phone', 'Service'],
          form: null
      }
      
      this.renderDropDown = this.renderDropDown.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
      this.renderForm = this.renderForm.bind(this);
  }

  componentWillMount() {
      CheckIfMetaMask.then((web3)=>{
          if(web3){              
              web3.eth.getAccounts((err, res) => {                   
                this.setState({
                    pubKey: res[0],
                    web3 : web3
                });
              });
              this.setState({
                  metamask: true
              });
          }
      });
  }
    
  handleSelect(evt){
        this.renderForm(evt);
  }
    
    

  renderDropDown(){
  return (
    <DropdownButton
        title="Select Product Type"
        onSelect={this.handleSelect}
        id ="dropdown"
    >
      {this.state.productTypes.map((item, index)=>
        <MenuItem key={index} id={index} eventKey={item}>{item}</MenuItem>       
      )}
    </DropdownButton>
  );
  }
  
  renderForm(formType){
      switch (formType) {
        case 'Generic':
        this.setState({
            form : <GenericItemForm pubKey={this.state.pubKey}></GenericItemForm>
        });
        break;
        case 'Shoes':
        break;
        case 'Tickets':
        break;
        case 'Phone':
        break;
        case 'Service':
        break;
    }
  }
    
    
    
    
    
    
  render() {
    return (
      <div> 
      {this.state.metamask ? this.renderDropDown()
        : <Error></Error>}
      {this.state.form}
     </div>
    );
  }
}