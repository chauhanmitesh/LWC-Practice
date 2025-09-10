import { LightningElement, api } from 'lwc';

export default class ContactList extends LightningElement {

    @api contacts;

    handleFavoriteEvent(event){
        //console.log('contactList got favorite for: '+event.detail);
        this.dispatchEvent(new CustomEvent('favorite', {
            detail: event.detail,
            bubbles: true,
            composed: true
        }));
    }
    
}