import { LightningElement, track } from 'lwc';
import getContacts from '@salesforce/apex/GetContactRecords.getContacts';

export default class ContactManager extends LightningElement {

    @track contacts = [];

    connectedCallback(){
        getContacts().then(data =>{
            this.contacts = data.map( c => ({
                ...c,
                isFavorite: false
            }));

            //console.log("inside getcontacts", JSON.stringify(this.contacts));
        })
        .catch((error =>{
            console.log("Error fetching contacts", error);
        }));
    }


     handleFavoriteToggle(event) {
        const contactId = event.detail;
        this.contacts = this.contacts.map(contact => {
            if (contact.Id === contactId) {
                return {
                    ...contact,
                    isFavorite: !contact.isFavorite
                };
            }
            return contact;
        });
    }    

    
    
}