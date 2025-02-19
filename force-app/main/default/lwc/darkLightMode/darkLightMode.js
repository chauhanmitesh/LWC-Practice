import { LightningElement } from 'lwc';

export default class DarkLightMode extends LightningElement {

    btnText = 'light Mode';
    isDarkMode = false;

    handleToggle(event){
        this.isDarkMode = !this.isDarkMode;
        this.btnText = this.isDarkMode ? 'Enable Light Mode' : 'Enable Dark Mode';
    }

    get backColor(){
        //console.log(this.isDarkMode);
        return this.isDarkMode ? 'dark-mode' : 'light-mode';
    }
}