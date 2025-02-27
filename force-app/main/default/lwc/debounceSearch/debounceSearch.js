import { LightningElement } from 'lwc';

export default class DebounceSearch extends LightningElement {
    timer;
    searchQuery;

    handleInputChange(event){

        let temp = event.target.value;

        /*
        console.log('event ',event);
        console.log('event target ',event.target);
        console.log('event target value ', event.target.value);
        */

        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            console.log(temp);
            this.searchQuery = temp.trim();
        }, 300);
    }


}