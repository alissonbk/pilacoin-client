import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  email: string;
  password: string;
  loading: boolean = false;
  submitted: boolean = false;
  formLogin: FormGroup<any>;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.email = '';
    this.password =  '';

    this.formLogin = this.fb.group({
      email: this.fb.control(this.email, [Validators.required, Validators.email, Validators.minLength(10)]),
      password: this.fb.control(this.password, [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit(): void {
    this.formLogin.reset();
  }

  auth() {
    this.loading = true;
    this.submitted = true;

    if (this.formLogin?.valid) {
        this.loginService.login(this.formLogin.value.email, this.formLogin.value.password).subscribe();
    } else {
        this.loading = false;
        this.formLogin.reset();
        Swal.fire('Formulário preenchido incorretamente.', '', 'warning');
    }
}

}
