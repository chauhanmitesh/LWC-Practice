import { LightningElement } from 'lwc';

export default class DependablePicklist extends LightningElement {

    dataMap = {
        INDIA : ["Maharastra", "Gujarat", "Karnataka"],
        USA : ["California", "Texas", "Florida"],
        Canada: ["Ontario", "Quebec", "Alberta"]
    }

    selectedCountry = '';
    selectedState = '';


    get countryOptions(){
        return Object.keys(this.dataMap).map(country => ({
            label: country,
            value: country
        }))
    }

    get stateOptions(){
        if(!this.selectedCountry) return [];
        return this.dataMap[this.selectedCountry].map(state =>({
            label:state,
            value:state
        }));
    }

    get isStateDisabled(){
        return !this.selectedCountry;
    }
    
    handleCountryChange(event){
        this.selectedCountry = event.target.value;
        this.selectedState = '';
    }

    handleStateChange(event){
        this.selectedState = event.target.value;
    }
}