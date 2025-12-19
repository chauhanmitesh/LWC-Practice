import { LightningElement } from 'lwc';

export default class Counter extends LightningElement {

    count = 0;
    

    handleDecrement(){
        if(this.count>0){
            this.count--;
        }
    }

    handleIncrement(){
        this.count++;
    }

    handleReset(){
        this.count=0;
    }

    get isDecrementDisabled(){
        return this.count===0;
    }

    get showMessage(){
        return this.count===10;
    }
}