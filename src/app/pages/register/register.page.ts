import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  async registerUser() {
    try {
      const user = await this.authService.register(this.email, this.password, this.name);
      console.log('✅ Usuario registrado:', user);
      alert('Registro exitoso ');
    } catch (error: any) {
      console.error(error);
      alert('❌ Error: ' + error.message);
    }
  }
}
