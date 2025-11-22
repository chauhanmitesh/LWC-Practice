import { LightningElement } from 'lwc';

export default class ContactForm extends LightningElement {
    // Use immutable updates to ensure reactivity
    contact = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    };

    // Holds validation messages per field
    errors = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    };

    // Saved contact object after successful submit
    savedContact = null;

    // Generic handler for inputs using data-field attributes
    handleInputChange(event) {
        const field = event.target.dataset.field;
        const value = (event.target.value || '').trim();

        // update contact immutably (reactive)
        this.contact = { ...this.contact, [field]: value };

        // validate field right away
        this.validateField(field, value);
    }

    // Validate a single field and set an errors message if invalid
    validateField(field, value) {
        switch (field) {
            case 'firstName':
                this.errors.firstName = value ? '' : 'First name is required.';
                break;
            case 'lastName':
                this.errors.lastName = value ? '' : 'Last name is required.';
                break;
            case 'email':
                // basic email regex (reasonable for client-side validation)
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    this.errors.email = 'Email is required.';
                } else if (!emailRegex.test(value)) {
                    this.errors.email = 'Please enter a valid email address.';
                } else {
                    this.errors.email = '';
                }
                break;
            case 'phone':
                // allow only digits, must be 10 digits
                const digitsOnly = value.replace(/\D/g, '');
                if (!value) {
                    this.errors.phone = 'Phone is required.';
                } else if (digitsOnly.length !== 10) {
                    this.errors.phone = 'Phone must contain exactly 10 digits.';
                } else {
                    this.errors.phone = '';
                }
                break;
            default:
                break;
        }
    }

    // Validate all fields before submit
    validateAll() {
        // run validateField for each
        this.validateField('firstName', this.contact.firstName);
        this.validateField('lastName', this.contact.lastName);
        this.validateField('email', this.contact.email);
        this.validateField('phone', this.contact.phone);

        // return boolean whether all errors are empty
        return !this.errors.firstName && !this.errors.lastName && !this.errors.email && !this.errors.phone;
    }

    // Computed getter to disable submit if invalid
    get isSubmitDisabled() {
        // also ensure all fields have some value
        const requiredFilled = this.contact.firstName && this.contact.lastName && this.contact.email && this.contact.phone;
        const noErrors = !this.errors.firstName && !this.errors.lastName && !this.errors.email && !this.errors.phone;
        return !(requiredFilled && noErrors);
    }

    // Submit handler
    handleSubmit() {
        // Validate everything
        const valid = this.validateAll();

        if (!valid) {
            // If invalid, do nothing - the UI shows messages and button is disabled anyway
            return;
        }

        // Save the contact locally (no Apex) - clone to freeze snapshot
        this.savedContact = { ...this.contact };

        // Optionally clear the form or keep values - here we'll clear
        this.contact = {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        };

        // Clear errors
        this.errors = {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        };

        // Optionally show a tiny visual cue: scroll to the saved card or focus
        // For brevity, not implemented; you could dispatch a toast here if desired.
    }

    // Clear form
    handleClear() {
        this.contact = {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        };
        this.errors = {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        };
        this.savedContact = null;
    }
}
