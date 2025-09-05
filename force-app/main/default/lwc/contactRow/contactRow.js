import { LightningElement, api } from 'lwc';


export default class ContactRow extends LightningElement {

    @api contact;

    get fullName(){
        //return this.contact ? `${this.contact.FirstName || ''} ${this.contact.LastName || ''}` : '';
        return '';
    }

    get buttonLabel(){
        return this.contact.isFavorite ? '★ Unfavorite' : '☆ Favorite';
    }

    toggleFavorite(){
        try{
            this.dispatchEvent(new CustomEvent('favorite',{
            detail: this.contact.Id
            }));

        }catch(error){
            console.log("Error ",error);
        }
    }

}