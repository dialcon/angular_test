import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, ClientService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  title = 'WebApp';

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private clientsService: ClientService,

  ) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      identification: ['', Validators.required],
      birthdate: ['', Validators.required]
    });
  }
  //getter to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.clientsService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Registro exitoso', true);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
