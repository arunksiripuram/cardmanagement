import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignalrService } from "../../signalr.service";

@Component({
  selector: 'app-update-card-label',
  templateUrl: './update-card-label.component.html',
  styleUrls: ['./update-card-label.component.css']
})
export class UpdateCardLabelComponent implements OnInit {
  cardForm: FormGroup;
  formConfig: any;
  labelNames: any = {};  // Object to store labels

  constructor(private fb: FormBuilder, private signalrService: SignalrService ) {
    // Initialize the form structure
    this.cardForm = this.fb.group({
      // cardLabelDetails: ['', Validators.required],
      // cardType: ['', Validators.required],
      // cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      // cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      // expMonth: ['', Validators.required],
      // expYear: ['', Validators.required],
      // addressLine1: ['', Validators.required],
      // addressLine2: [''],
      // city: ['', Validators.required],
      // state: ['', Validators.required],
      // zip: ['', Validators.required],
      // country: ['USA', Validators.required],
      // primaryCard: [false],
      // newsletterEmail: [''],

      cardHolder:['',Validators.required],
      cardTypeLabel: ['',Validators.required],
      cardTypeSelectDefault: ['',Validators.required],
      cardNumberLabel: ['',Validators.required],
      cvvLabel: ['',Validators.required],
      expirationDateLabel:['',Validators.required],
      addressLabel: ['',Validators.required],
      cityLabel: ['',Validators.required],
      stateLabel: ['',Validators.required],
      stateSelectDefault:['',Validators.required],
      zipLabel: ['',Validators.required],
      countryLabel: ['',Validators.required],
      countrySelectDefault:['',Validators.required],
      useAsPrimaryCardLabel:['',Validators.required],
      footerText: ['',Validators.required],
      addCardButtonText:['',Validators.required],
      cancelButtonText: ['',Validators.required],
      newsletterLabel: ['',Validators.required],
      signUpButtonText: ['',Validators.required],
      surveyText: ['',Validators.required],
      surveyLinkText:['',Validators.required],
      termsAndConditionsText:['',Validators.required],
      privacyPolicyText:['',Validators.required],
    });

    // Default configuration for dynamic labels and placeholders
    this.formConfig = {
      cardLabelDetails:'Add New Card',
      cardHolderLabel: "Card Holder Label Name",
      cardTypeLabel: "Select Card Type Label Name",
      cardTypeSelectDefault: "Visa",
      cardNumberLabel: "Enter Card Number Label Name" ,
      cvvLabel: 'Enter cvv Label Name',
      cvvPlaceholder:  "cvv Placeholder Label Name" ,
      expirationDateLabel:  "expiration Date Label Name",
      addressLabel: "Enter Address Label Name" ,
      cityLabel: "Enter City Label Name",
      stateLabel: "Enter State Label Name",
      stateSelectDefault:  "state Select Default Label Name",
      zipLabel: "Enter Zip Code Label Name",
      countryLabel: "Enter Country Label Name",
      countrySelectDefault:  "Country Select Default Label Name ",
      useAsPrimaryCardLabel: "Use as primary card Label Name",
      footerText:  "footer Text Label Name.",
      addCardButtonText:  "Add",
      cancelButtonText:  "Cancel",
      newsletterLabel:  "newsletter Label Name",
      signUpButtonText:  "signup Button Text Label Name",
      surveyText:  "survey Text Label Name",
      surveyLinkText:  "survey Link Text Label Name",
      termsAndConditionsText:  "terms And Conditions Text Label Name.",
      privacyPolicyText:  "privacy Policy Text Label Name"
    };
  }

  ngOnInit(): void {
    this.getLabelValue();
  }

  getLabelValue(){
    this.signalrService.getLabelValue().subscribe(
      (data: any) => {
        console.log(data);
        data = data[0];
        this.cardForm.patchValue({
          cardHolder: data.cardHolderLabel,
          cardTypeLabel: data.cardTypeLabel,
          cardTypeSelectDefault: data.cardTypeSelectDefault,
          cardNumberLabel: data.cardNumberLabel,
          cvvLabel: data.cvvLabel,
          expirationDateLabel: data.expirationDateLabel,
          addressLabel: data.addressLabel,
          cityLabel: data.cityLabel,
          stateLabel: data.stateLabel,
          stateSelectDefault: data.stateSelectDefault,
          zipLabel: data.zipLabel,
          countryLabel: data.countryLabel,
          countrySelectDefault: data.countrySelectDefault,
          useAsPrimaryCardLabel: data.useAsPrimaryCardLabel,
          footerText: data.footerText,
          addCardButtonText: data.addCardButtonText,
          cancelButtonText: data.cancelButtonText,
          newsletterLabel: data.newsletterLabel,
          newsletterPlaceholder: data.newsletterPlaceholder,
          signUpButtonText: data.signUpButtonText,
          surveyText: data.surveyText,
          surveyLinkText: data.surveyLinkText,
          termsAndConditionsText: data.termsAndConditionsText,
          privacyPolicyText: data.privacyPolicyText,

        });
      }, error => {
        console.error('Error fetching user data:', error);
      })
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      console.log('Form Submitted:', this.cardForm.value);
      let req = {
        "id": 1,
        "cardHolderLabel": this.cardForm.value.cardHolder,
        "cardTypeLabel": this.cardForm.value.cardTypeLabel,
        "cardTypeSelectDefault": this.cardForm.value.cardTypeSelectDefault,
        "cardNumberLabel": this.cardForm.value.cardNumberLabel,
        "cvvLabel": this.cardForm.value.cvvLabel,
        "expirationDateLabel":this.cardForm.value.expirationDateLabel,
        "addressLabel": this.cardForm.value.addressLabel,
        "cityLabel": this.cardForm.value.cityLabel,
        "stateLabel": this.cardForm.value.stateLabel,
        "stateSelectDefault": this.cardForm.value.stateSelectDefault,
        "zipLabel": this.cardForm.value.zipLabel,
        "countryLabel":this.cardForm.value.countryLabel,
        "countrySelectDefault": this.cardForm.value.countrySelectDefault,
        "useAsPrimaryCardLabel": this.cardForm.value.useAsPrimaryCardLabel,
        "footerText": this.cardForm.value.footerText,
        "addCardButtonText": this.cardForm.value.addCardButtonText,
        "cancelButtonText": this.cardForm.value.cancelButtonText,
        "newsletterLabel": this.cardForm.value.newsletterLabel,
        "signUpButtonText": this.cardForm.value.signUpButtonText,
        "surveyText": this.cardForm.value.surveyText,
        "surveyLinkText": this.cardForm.value.surveyLinkText,
        "termsAndConditionsText": this.cardForm.value.termsAndConditionsText,
        "privacyPolicyText": this.cardForm.value.privacyPolicyText
      }
      this.signalrService.UpdateLabelName(req).subscribe(
        (data: any) => {
          
        })
      // Perform API integration here
    }
  }

   // Update labels dynamically
   onLabelUpdate(updatedLabels: any): void {
    this.labelNames = updatedLabels;  // Update label values dynamically
  }



  cancel(): void {
    this.cardForm.reset();
  }
}