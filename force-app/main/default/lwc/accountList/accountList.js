import { LightningElement, track, wire } from 'lwc';
import getAccWrapper from '@salesforce/apex/GetAccountRecords.getAccWrapper';

export default class AccountList extends LightningElement {

    @track accounts=[];

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
                        Contacts: contlst
                    });
                });
                
                this.accounts = tempAccounts;
                //console.log('accontData ',JSON.stringify(this.accounts));
    
            }else if(error){
                this.error = error;
            }
        }


    handleToggle(event){

        const accountId = event.detail;
        //console.log('test ', event.detail);
        this.accounts = this.accounts.map( acc => {

            if(acc.Id === accountId){
                
                return {
                    ...acc,
                    showContacts:!acc.showContacts
                };
            }
            return acc;
        });
    }
}