import { LightningElement, wire } from 'lwc';
import getAccWrapper from '@salesforce/apex/GetAccountRecords.getAccWrapper';

export default class ShowAccountContactList extends LightningElement {

    accountData = [];
    error;

    @wire(getAccWrapper)
    wiredAccountWrapper({data,error}){
        if(data){
            //console.log('accountData ',JSON.stringify(data));

            const tempAccounts = [];

            data.forEach(wrapper => {
                const acc = wrapper.accRecord;
                
                //contacts arrary
                const contlst = [];

                if(acc.Contacts){
                    acc.Contacts.forEach(con => {
                        contlst.push({
                            Id: con.Id,
                            FullName: `${con.FirstName || ''} ${con.LastName || ''}`.trim()
                        });
                    });
                }

                tempAccounts.push({
                    Id: acc.Id,
                    Name: acc.Name,
                    showContacts: false,
                    buttonLabel: 'Show Contacts',
                    Contacts: contlst
                });
            });
            
            this.accountData = tempAccounts;
            console.log('accontData ',JSON.stringify(this.accountData));

        }else if(error){
            this.error = error;
        }
    }


    toggleContacts(event) {
        const accId = event.target.dataset.id;

        // Create a new array with updated showContacts and buttonLabel
        this.accountData = this.accountData.map(acc => {
    
            if (acc.Id === accId) {
                const newShow = !acc.showContacts;
                return {
                    ...acc,
                    showContacts: newShow,
                    buttonLabel: newShow ? 'Hide Contacts' : 'Show Contacts'
                };
            }
   
            return acc;
        });
    }

}