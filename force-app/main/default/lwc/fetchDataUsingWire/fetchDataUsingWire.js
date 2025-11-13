import { LightningElement, track, wire } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';

export default class FetchDataUsingWire extends LightningElement {

    @track searchKey = '';

    @wire(searchAccounts, {searchKey:'$searchKey'})
    accounts;

    handleSearchChange(event){
        this.searchKey = event.target.value;
    }
}