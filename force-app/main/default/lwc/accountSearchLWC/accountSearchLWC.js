import { LightningElement, track } from 'lwc';
import searchAccounts from '@salesforce/apex/GetAccountRecords.searchAccounts';

export default class AccountSearchLWC extends LightningElement {

    @track inp = ''; 
    @track accounts = [];
    error;
    @track showDropdown = false;
    timer;

    handleSearch(event){
        console.log(event.target.value);
        this.inp = event.target.value;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            console.log('inp length '+this.inp.length);
            if(this.inp.length > 2){
                
                searchAccounts({input:this.inp})
                    .then(data=>{
                    this.accounts = data;
                    this.showDropdown = this.accounts.length > 0;
                    console.log('acc length '+this.accounts.length);
                    console.log(this.showDropdown);
                })
                .catch(err=>{
                    this.error = err;
                    this.showDropdown = false;
                })

            }else{
                this.accounts = [];
                this.showDropdown = false;
            }

        },300)  
    }

    handleSelect(event){
        console.log(event.target.dataset.name);
        this.inp = event.target.dataset.name;
        this.showDropdown = false;
    }
}