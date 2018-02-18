import React from 'react';
import {BrowserRouter, Switch, Link, Route, withRouter} from 'react-router-dom';
import {Form, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Web3 from 'web3';


export default class GenericItemForm extends React.Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            pubKey: props.pubKey,
            name: "",
            quantity: 0,
            startingPrice: 0,
            trustedRedeemer : [],
            payoutAddress : props.pubKey
        }
        
        
        this.handleChange = this.handleChange.bind(this);
        this.handleRedeemersChange = this.handleRedeemersChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(evt){
        const value = evt.target.value;
        
        this.setState({
            [evt.target.id] : value
        });
    }

    handleRedeemersChange(evt){
        let value = evt.target.value;
        value = value.split(',')
        this.setState({
            trustedRedeemer : value
        });
    }
    
    
    handleSubmit(){
        console.log(this.state);
        
        
        
        
    }
    
    
    
    render(){
        return (
        <div>
        <Form inline>
        <FormGroup controlId="name">
            <ControlLabel>Product Name</ControlLabel>{' '}
            <FormControl value={this.state.name}  onChange={this.handleChange} type="text" placeholder="Name" />
        </FormGroup>{' '}    
        <FormGroup controlId="quantity">
            <ControlLabel>Quantity</ControlLabel>{' '}
            <FormControl  value={this.state.Quantity} onChange={this.handleChange} type="text" placeholder="Quantity" />
        </FormGroup>{' '}
        <FormGroup controlId="startingPrice">
            <ControlLabel>Starting Price</ControlLabel>{' '}
            <FormControl value={this.state.startingPrice} onChange={this.handleChange} type="text" placeholder="Price" />
        </FormGroup>{' '}      
        </Form>
        
        <Form>    
        <FormGroup controlId="trustedRedeemer">
            <ControlLabel>Trusted Redeemers</ControlLabel>{' '}
            <FormControl value={this.state.trustedRedeemer} onChange={this.handleRedeemersChange} type="text" placeholder="Addresses of trusted redeemer" />
        </FormGroup>{' '} 
        <FormGroup controlId="payoutAddress">
            <ControlLabel>Payout Address</ControlLabel>{' '}
            <FormControl  value={this.state.payoutAddress} onChange={this.handleChange} type="text" placeholder="Payout Address" />
        </FormGroup>{' '}    
        <Button onClick={this.handleSubmit}>Create</Button>
        </Form>
        </div>
        );
    }
    
    
}