import { LightningElement, api } from 'lwc';

export default class AccountCard extends LightningElement {

    @api account;

    get buttonLabel(){
        return this.account?.showContacts ? 'Hide Contacts' : 'Show Contacts';
    }
    

    togglecontacts(){
        
        //console.log('button clicked');
        //console.log('accountId ',this.account.Id);

        const toggleEvent = new CustomEvent('togglecontacts', {
            detail: this.account.Id
        });

        this.dispatchEvent(toggleEvent);

    }
    
}