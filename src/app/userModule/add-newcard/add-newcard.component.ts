import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignalrService } from 'src/app/signalr.service';

@Component({
  selector: 'app-add-newcard',
  templateUrl: './add-newcard.component.html',
  styleUrls: ['./add-newcard.component.css']
})
export class AddNewcardComponent implements OnInit {
  cardForm: FormGroup;
  cardTypes = ['Visa', 'MasterCard', 'Amex'];
  months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  states = ['Texas', 'California', 'New York', 'Florida'];
  countries = ['USA', 'Canada', 'Mexico'];

  private apiUrl = 'https://api.example.com/cards';

  constructor(private fb: FormBuilder, private http: HttpClient, private signalrService: SignalrService) {
    this.cardForm = this.fb.group({
      cardHolder: ['', Validators.required],
      cardType: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      primaryCard: [false],
      expMonth: ['', Validators.required],
      expYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      newAddress: [false],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['USA', Validators.required]
    });
    
  }

  ngOnInit(): void {
    // this.getLabelValue();
    this.signalrService.messagesSource.subscribe((loggedIn: any) => {
        this.getLabelValue();
    }); 
  }

  labelNames:any=[];
  getLabelValue(){
    this.signalrService.getLabelValue().subscribe(
      (data: any) => {
        this.labelNames = data[0];
      }, (error: any) => {
        console.error('Error fetching user data:', error);
      })
  }

  onSubmit(): void {
    if (this.cardForm.valid) {
      console.log('Form Submitted', this.cardForm.value);
      // Call API here
    }
  }

  // Update labels dynamically
  onLabelUpdate(updatedLabels: any): void {
    console.log('onLabelUpdate',updatedLabels)
    this.labelNames = updatedLabels;  // Update label values dynamically
  }

  addCard(cardData: any): Observable<any> {
    return this.http.post(this.apiUrl, cardData);
  }

  cancel(): void {
    this.cardForm.reset();
  }
}
