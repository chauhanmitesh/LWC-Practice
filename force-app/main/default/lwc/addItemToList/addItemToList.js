import { LightningElement, track } from 'lwc';

export default class AddItemToList extends LightningElement {

    @track inputText = '';
    isDisabled = true;

    @track fruits = [
                {Id:1, Name:'Apple'},
                {Id:2, Name:'Banana'},
                {Id:3, Name:'Watermelon'},
                {Id:4, Name:'Grapes'}
            ];

    get itemList(){
        return this.fruits;
    }     

    handleInputChange(event){
        this.inputText = event.target.value.trim();
        /*if(this.inputText!='' && this.inputText!=undefined && this.inputText!=null){
            this.isDisabled = false;
        }else{
            this.isDisabled = true;
        }*/

        this.isDisabled = this.inputText==='';
    }

    addItemToList(event){
        let last = this.fruits.length ? this.fruits[this.fruits.length-1] : 0;
        console.log('last '+last);
        let newItem = {Id:last.Id+1, Name:this.inputText};
        this.fruits = [...this.fruits, newItem];
        this.inputText = '';
        this.isDisabled = true;        
    }

    handleRemoveItem(event){
        let itemId = parseInt(event.target.dataset.id,10);
        this.fruits = this.fruits.filter(item=> item.Id!=itemId);
    }
}