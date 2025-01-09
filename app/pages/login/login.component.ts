import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  http = inject(HttpClient);
  router =inject(Router);

  loginobj:any = {
    userName:'',
    password:''
  }

  onLogin(){
    debugger
    this.http.post("https://projectapi.gerasim.in/api/EmployeeManagement/login",this.loginobj).subscribe((res:any)=>{
        if(res.result)
        {
            localStorage.setItem('employeeApp',JSON.stringify(res.data));
            this.router.navigateByUrl('dashboard')
        }
        else{
          alert(res.message);
        }    
    })
  }
}
