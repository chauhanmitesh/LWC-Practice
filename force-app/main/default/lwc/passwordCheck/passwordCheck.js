import { LightningElement } from 'lwc';

export default class PasswordCheck extends LightningElement {

    inputText = '';
    strength = '';

    handleInputChange(event){
        console.log(event.target.value);
        this.inputText = event.target.value;
    }

    get strengthColor(){
        const strength = this.pwdStrength; // Get computed strength
        return strength === 'Strong' ? 'strong' : strength === 'Medium' ? 'medium' : 'weak';
    }

    get pwdStrength(){
        let exp = /[!@#$%^&*(),.?":{}|<>]/;

        if(exp.test(this.inputText) && this.inputText.length>8){
            return this.strength = 'Strong';
        }else if(this.inputText.length>8){
            return this.strength = 'Medium';
        }else{
            return this.strength = 'Weak';
        }
    }


}