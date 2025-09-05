import { LightningElement, api } from 'lwc';

export default class ContactList extends LightningElement {

    @api contacts;

    handleFavoriteEvent(event){
        this.dispatchEvent(new customEvent('favorite', {
            detail: event.detail,
            bubbles: true,
            composed: true
        }));
    }
    
}