import { LightningElement, wire } from 'lwc';
import getAccountsWithDetails from '@salesforce/apex/GetAccountRecords.getAccountsWithDetails';
import Id from '@salesforce/schema/Account.Id';

export default class ShowHideAccountDetails extends LightningElement {

    accounts=[];
    error;

    @wire(getAccountsWithDetails)
    wiredAccounts({error,data}){
        if(data){
            this.accounts = data.map(acc=> ({
                Id: acc.Id,
                Name: acc.Name,
                Industry: acc.Industry,
                Phone: acc.Phone,
                showDetails:false,
                buttonLabel: 'Show Details'
            }));
            console.log('accounts ',this.accounts[0]);
        }else if(error){
            this.error = error;
        }
    }

    toggleDetails(event){

        console.log(event.target.dataset.id);
        const accId = event.target.dataset.id;
        
        try{
            this.accounts = this.accounts.map( acc=>{
                if(acc.Id === accId){ 
                    const newShowDetails = !acc.showDetails;
                    return {
                        ...acc,
                        showDetails: newShowDetails,
                        buttonLabel: newShowDetails ? 'Hide Details' : 'Show Details'
                    }
                    }else{
                        return acc;
                    }
            });
            
        }catch(ex){
            console.log('exception ',JSON.stringify(ex));
        }
        
    }

}