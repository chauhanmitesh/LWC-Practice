import { LightningElement, track } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';
import createContact from '@salesforce/apex/GetContactRecords.createContact';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class CreateContactForm extends LightningElement {


    @track firstName = '';
    @track lastName = '';
    @track email = '';

    @track SelectedAccountId = '';
    @track accountOptions = [];
    @track searchKey = '';


    handleInputChange(event){
        this[event.target.dataset.field] = event.target.value;
    }


    handleAccountSelect(event){
        this.SelectedAccountId = event.target.value;
    }

    handleAccountSearch(event){
        this.searchKey = event.target.value;

        if(this.searchKey.length < 2){
            this.accountOptions = [];
            return;
        }

        searchAccounts({searchKey: this.searchKey})
            .then(result =>{
                this.accountOptions = result.map(acc =>({
                    label: acc.Name,
                    value: acc.Id
                }))   
            })
            .catch(error => {
                console.error('Error searching accounts: ', error);
            })
    }

    saveContact(event){

        console.log('Create Contact');
        
        if(!this.SelectedAccountId){
            this.showToast('Error', 'Please select an Account', 'error');
            return;
        }

        createContact({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            accountId: this.SelectedAccountId
        })
            .then(() => {
                this.showToast('Success', 'Contact created successfully!', 'success');
                this.resetForm();
            })

            .catch(error =>{
                console.error('Error creating contact: ', error);
                this.resetForm();
            })
    }

    resetForm(){
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.SelectedAccountId = '';
        this.accountOptions = [];
    }


    showToast(title, message, variant) {
    const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        
        this.dispatchEvent(evt);
    }
}