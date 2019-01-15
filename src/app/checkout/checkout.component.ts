import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  template: `
  <div class="mt-3 d-flex justify-content-center">
    <div class="card col-sm-6 shadow">
      <div class="card-body text-center">
        <h5 class="card-title">
          You have checked out succesfully!
        </h5>
        <h6 class="card-subtitle">
          You will be redirected in few seconds...
        </h6>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['\home']);
    }, 3000);
  }

}
