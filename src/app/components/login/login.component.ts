import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  formLogin: UntypedFormGroup | undefined;

  constructor(private fb: UntypedFormBuilder, private loginService: LoginService) {
    this.email = '';
    this.password =  '';
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: this.fb.control(this.email, [Validators.required, Validators.email]),
      senha: this.fb.control(this.password, [Validators.required])
    });
  }

  auth() {
    this.loading = true;
    this.submitted = true;

    if (this.formLogin?.valid) {
        this.loginService.login(this.formLogin.value.email, this.formLogin.value.senha).subscribe();
    } else {
        this.loading = false;
        //this.inputs.forEach((child) => {child.markErrors()});
        Swal.fire('Formulário preenchido incorretamente.', '', 'warning');
    }
}

}
