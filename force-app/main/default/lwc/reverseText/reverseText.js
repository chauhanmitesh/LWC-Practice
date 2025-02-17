import { LightningElement, track } from 'lwc';

export default class ReverseText extends LightningElement {

    @track revStr;
    inputText = '';

    handleInputChange(event){
        this.inputText = event.target.value;
    }

    get revText(){
        return this.inputText.split('').reverse().join('');
    }
}