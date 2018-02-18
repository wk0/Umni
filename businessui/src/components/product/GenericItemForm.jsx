import React from 'react';
import {BrowserRouter, Switch, Link, Route, withRouter} from 'react-router-dom';
import {Form, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Web3 from 'web3';
import getWeb3 from '../../utils/getWeb3';
import Factory from '../../../build/contracts/Factory.json';
import PreSaleWrapper from '../../../build/contracts/PreSaleWrapper.json'
import { withGlobalState } from 'react-globally'

class GenericItemForm extends React.Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            pubKey: props.pubKey,
            name: "",
            quantity: 0,
            startingPrice: 0,
            trustedRedeemer : props.pubKey,
            duration: 1,
            payoutAddress : props.pubKey,
            web3: null
        }
        
        
        this.handleChange = this.handleChange.bind(this);
        this.handleRedeemersChange = this.handleRedeemersChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    
    componentWillMount(){    
     getWeb3.then(results => {
        this.setState({
        web3: results.web3
      });
     });
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
         const factoryContract = this.state.web3.eth.contract(Factory['abi']);
         const presaleWrapperContract = this.state.web3.eth.contract(PreSaleWrapper['abi']);
//         factoryContract.setProvider(this.state.web3.currentProvider);
//         presaleWrapperContract.setProvider(this.state.web3.currentProvider);

        var presaleInstance = presaleWrapperContract.at("0x0bf0ad08f07dc6d78753b21045c6c7ee80a4c835");
        presaleInstance.addEntity(this.state.name, this.state.quantity, 0, 268421052600, 157894737, {from: this.state.web3.eth.coinbase}, (err,res) =>{
        alert('Added to Price Engine for Monitoring');

//            if(err) console.log(err);
//            else console.log(res);
//        
//            presaleInstance.getItem(this.state.name, (err,res)=>{
//                if(err) console.log(err);
//                else console.log(res);                        
//            });
        var lookupContract = "0x8d5f62ad174814831bbd072a233f386e12473d45";
        factoryContract.new(lookupContract, this.state.name, {
                        data: '0x' + Factory["bytecode"],
                        from: this.state.web3.eth.coinbase,
                        gas: 95000*2
            }, (err, result)=>{
                alert('Added to Listing Lookup');
                if(err) console.log(err);
                this.state.web3.eth.getTransactionReceipt(result.transactionHash, (err, res)=>{
                    var factContractAddress = res.contractAddress;
                    
                    console.log(factContractAddress);
                    var factInstance = factoryContract.at(factContractAddress);
                    factInstance.createBatch(this.state.quantity, this.state.name, this.state.startingPrice, this.state.duration, this.state.trustedRedeemer, this.state.pubKey, {from: this.state.web3.eth.coinbase}, (err, result)=>{
                        if(err) console.log(err);
                        else console.log(result);
                        alert('Batch Listing Created');
                    })
                    
                })
            })
      
        
        })
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
        <FormGroup controlId="duration">
            <ControlLabel>Duration</ControlLabel>{' '}
            <FormControl value={this.state.duration} onChange={this.handleChange} type="text" placeholder="Duration in Minutes" />
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

export default withGlobalState(GenericItemForm)