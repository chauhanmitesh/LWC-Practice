import { LightningElement, wire, track } from 'lwc';
import getRecords from '@salesforce/apex/GetAccountRecords.getRecords';

export default class DisplayAccounts extends LightningElement {

    @track accounts;
    @track errors;
    
    //wire a property
    //@wire(getRecords) accounts;


    //wire a function
    /*@wire(getRecords)
    wireAccounts({error, data}){
        if(data){
            this.accounts = data;
        }else if(error){
            this.errors = error;
        }
    }*/

    //call a method imperatively
    loadAccounts(){
        getRecords()
        .then(result =>{
            this.accounts = result;
        })
        .catch(error =>{
            this.errors = error;
        })
    }
    
}