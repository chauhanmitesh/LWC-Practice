import { LightningElement, api } from 'lwc';


export default class ContactRow extends LightningElement {

    @api contact;

    /*connectedCallback() {
        console.log('ContactRow initialized with:', JSON.stringify(this.contact));
    }*/

    get fullName(){
        return this.contact ? `${this.contact.FirstName || ''} ${this.contact.LastName || ''}` : '';
    }

    get buttonLabel() {
    return this.contact && this.contact.isFavorite
        ? '★ Unfavorite'
        : '☆ Favorite';
    }


    toggleFavorite(event){
        try{
            //console.log("Toggle Favorite ",JSON.stringify(this.contact?.Id));
            this.dispatchEvent(new CustomEvent('favorite',{ detail: this.contact?.Id }));
        }catch(error){
            console.log("Error ",error);
        }
    }

}