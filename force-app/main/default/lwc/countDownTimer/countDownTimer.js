import { LightningElement, track } from 'lwc';

export default class CountDownTimer extends LightningElement {

    @track inputSeconds = 0; // User input
    @track remainingTime = 0; // Countdown value
    @track isRunning = false; // Tracks if timer is running
    
    timer;

    handleInput(event){
        this.inputSeconds = parseInt(event.target.value, 10) || 0; 
    }


    handleStartTimer(){
        if (this.inputSeconds > 0) {
            this.remainingTime = this.inputSeconds;
            this.isRunning = true;

            this.timer = setInterval(() => {
                if (this.remainingTime > 0) {
                    this.remainingTime--;
                } else {
                    this.stopTimer();
                }
            }, 1000);
        }
    }

    handleResetTimer(){
        this.stopTimer();
        this.remainingTime = 0;
        this.inputSeconds = 0;
    }

    stopTimer() {
        clearInterval(this.timer);
        this.isRunning = false;
    }

    get displayTime(){
        return this.remainingTime > 0 ? `${this.remainingTime} seconds`: "Time's up!";
    }

}