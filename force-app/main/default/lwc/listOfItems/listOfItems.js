import { LightningElement } from 'lwc';

export default class ListOfItems extends LightningElement {


    fruits = [
                {id:'1', Name:'Apple'},
                {id:'2', Name:'Banana'},
                {id:'3', Name:'Grapes'},
                {id:'4', Name:'Watermelon'}
            ];


    get itemList(){
        return this.fruits;
    }

    removeItem(event){

        console.log('dataset '+JSON.stringify(event.target.dataset));
        const itemId = event.target.dataset.id;
        this.fruits = this.fruits.filter(item => item.id !=itemId);
    }
}