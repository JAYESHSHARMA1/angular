import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css'],
})
export class InfoCardComponent implements OnInit {
  successImage: string = '/assets/doneGif.gif';
  warningImage: string = '/assets/warning.gif';
  errorImage: string = '/assets/error.gif';
  image: string;

  data: any = null;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.data = this.auth.getInformationData();

    if (!this.data) {
      this.router.navigate(['/404/invalid-request']);
      return null;
    }

    if (this.data.type == 'success') this.image = this.successImage;
    else if (this.data.type == 'warning') this.image = this.warningImage;
    else if (this.data.type == 'error') this.image = this.errorImage;
  }
}
