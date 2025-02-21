import { LightningElement } from 'lwc';

export default class WordCounts extends LightningElement {

inputText = '';


handleInputChange(event){
    this.inputText = event.target.value;
    console.log(this.inputText);    
}


get counts(){
    const words = this.inputText.trim().split(/\s+/).filter(Boolean);
    return words.length > 0 ? `word count: ${words.length}` : 'No words entered';
}


}