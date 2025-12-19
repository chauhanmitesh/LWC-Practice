import { LightningElement } from 'lwc';

export default class RealTimeDisplay extends LightningElement {

    inputText = '';

    handleChange(event){
        this.inputText = event.target.value;
        console.log("inputText ", this.inputText);
    }

    get hasText(){
        return this.inputText && this.inputText.trim() !=='';
    }
}