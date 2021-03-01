import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-not-available-in-location',
  templateUrl: './not-available-in-location.component.html',
  styleUrls: ['./not-available-in-location.component.scss']
})
export class NotAvailableInLocationComponent implements OnInit {

  @Input() countryCode;
  @Input() city;
  @Input() country;

  isCompleted = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onCTAClick(email: string) {
    console.log(email);

    this.http.post('company/foreign-lead',
      {
        email,
        countryCode: this.countryCode,
        country: this.country,
        city: this.city
      }).subscribe(res => {
        console.log(res);
        // this.isCompleted = true;
        document.location.href = 'https://veevolunteers.com';
      });
  }

}
