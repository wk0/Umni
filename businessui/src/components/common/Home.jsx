import React from 'react';
import {Form, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import Web3 from 'web3';
import getWeb3 from '../../utils/getWeb3';
import Factory from '../../../build/contracts/Factory.json';
import PreSaleWrapper from '../../../build/contracts/PreSaleWrapper.json';
import Lookup from '../../../build/contracts/Lookup.json';
import { withGlobalState } from 'react-globally'

class Home extends React.Component {
    
        constructor(props){
            super(props)
            
            this.state ={
                web3 : null
            }
            this.handleContractsInit = this.handleContractsInit.bind(this);
        }
    
        componentWillMount(){    
            getWeb3.then(results => {
            this.setState({
            web3: results.web3
            });
            });
        }
    
    
        handleContractsInit(){
            const presaleWrapperContract = this.state.web3.eth.contract(PreSaleWrapper['abi']);
            presaleWrapperContract.new({
                data: '0x' + PreSaleWrapper["bytecode"],
                from: this.state.web3.eth.coinbase,
                gas: 90000*2
            }, (err, res)=>{
                this.state.web3.eth.getTransactionReceipt(res.transactionHash, (err, res)=>{
                    const presaleContractAddress = res.contractAddress;
                    const LookupContract = this.state.web3.eth.contract(Lookup['abi']);
                    
                    LookupContract.new({
                        data: '0x' + Lookup["bytecode"],
                        from: this.state.web3.eth.coinbase,
                        gas: 90000*2
                    }, (err, result)=>{
                       this.state.web3.eth.getTransactionReceipt(result.transactionHash, (err, res)=>{
                        const lookupContractAddress = res.contractAddress;
                        this.props.setGlobalState({
                         presaleContractAddress : presaleContractAddress,
                         lookupContractAddress : lookupContractAddress
                        });
                           
                        console.log(presaleContractAddress);
                        console.log(lookupContractAddress);
                            
                       });
                        
                        
                    });
                    
                    
                    
                    
                });
            });
            
        }
    

    
        render(){
            return(
            <div>
            <Button onClick={this.handleContractsInit}>Initialize Base Contracts</Button>
            </div> 
            );
        }
}

export default withGlobalState(Home)