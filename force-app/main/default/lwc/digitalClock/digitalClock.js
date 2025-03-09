import { LightningElement, track } from 'lwc';

export default class DigitalClock extends LightningElement {


    currentTime = '';
    is24HourFormat = false;

    timer;
    
    connectedCallback(){
        this.updateTime();
        this.timer = setInterval(()=>{
            this.updateTime();
        },1000);
    }

    updateTime(){
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let amPm = '';

        if(!this.is24HourFormat){
            amPm = hours >=12 ? 'PM' : 'AM';
            hours = hours%12 || 12;
        }

        this.currentTime = `${this.formatNumber(hours)}:${this.formatNumber(minutes)}:${this.formatNumber(seconds)} ${amPm}`;
    }

    formatNumber(num){
        return num < 10 ? 0 + num : num;
    }

    toggleFormat(){
        this.is24HourFormat = !this.is24HourFormat;
        this.updateTime();
    }

    get toggleLabel(){
        return this.is24HourFormat ? "12-Hour Format" : "24-Hour Format";
    }

    disconnectedCallback(){
        clearInterval(this.timer);
    }
}