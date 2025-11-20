import { LightningElement, wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import getAccountDetails from '@salesforce/apex/GetAccountRecords.getAccountDetails';

export default class AccountDetails extends LightningElement {

    recordId;
    account;
    error;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference){
        if(currentPageReference){
            this.recordId = currentPageReference.state.c__recordId;
            console.log('Page Ref', JSON.stringify(currentPageReference.state));
            console.log('Record Id ',this.recordId);
            this.fetchAccount();
        }
    }

    fetchAccount(){
        if(!this.recordId) return;

        getAccountDetails({accountId: this.recordId})
        .then(result => {
            this.account = result;
        })
        .catch(error => {
            this.error = error;
        });
    }

}