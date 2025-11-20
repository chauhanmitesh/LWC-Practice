import { LightningElement, wire } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
import getRecords from '@salesforce/apex/GetAccountRecords.getRecords';

export default class NavAccountList extends NavigationMixin(LightningElement) {


    accounts = [];
    error;

    
    @wire(getRecords)
    wiredAccounts({error, data}){
        if(data){
            this.accounts = data;
        }else if(error){
            this.error = error;
        }
    }

    handleNavigate(event) {
        const accountId = event.target.dataset.id;

        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'AccountDetailsPage' // 👈 EXACT App Page API Name
            },
            state: {
                c__recordId: accountId // 👈 MUST prefix with c__
            }
        });
    }
}