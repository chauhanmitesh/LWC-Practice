import { LightningElement } from 'lwc';

export default class CharsCounts extends LightningElement {

    inputText = '';

    handleInputChange(event){
        //console.log(event.target.value);
        this.inputText = event.target.value;
    }

    get countChars(){
        return this.inputText.length;
    }

    get limitExceeded(){
        return this.countChars > 50;
    }

}