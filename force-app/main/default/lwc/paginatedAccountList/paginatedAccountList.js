import { LightningElement, wire } from 'lwc';
import getAccountsWithDetails from '@salesforce/apex/GetAccountRecords.getAccountsWithDetails';

export default class PaginatedAccountList extends LightningElement {



    allAccounts = [];
    pageAccounts = [];
    error;

    pageSize = 5;
    pageNumber = 1;
    totalPages = 0;

    @wire(getAccountsWithDetails)
    wiredAccounts({error,data}){
        if(data){
            this.allAccounts = data;
            this.totalPages = Math.ceil(this.allAccounts.length/this.pageSize);
            console.log('totalPages '+this.totalPages);
            this.updatePageData();
        }else if(error){
            this.error = error;
            console.error(error);
        }

        console.log('allAccounts '+JSON.stringify(this.allAccounts));
    }


    updatePageData(){
        const start = (this.pageNumber - 1) * this.pageSize;
        const end = this.pageNumber * this.pageSize;
        console.log("pageNumber "+this.pageNumber);
        this.pageAccounts = this.allAccounts.slice(start,end);
    }

    handleNext(){
        if(this.pageNumber<this.totalPages){
            this.pageNumber++;
            this.updatePageData();
        }
    }

    handlePrevious(){
        if(this.pageNumber>1){
            this.pageNumber--;
            this.updatePageData();
        }
    }

    get disableNext(){
        return this.pageNumber === this.totalPages;
    }

    get disablePrevious(){
        return this.pageNumber === 1;
    }
}