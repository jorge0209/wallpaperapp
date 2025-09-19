import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { ToastController } from '@ionic/angular';

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

  constructor(
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  async onRegister() {
    try {
      const user = await this.authService.register(
        this.email,
        this.password,
        this.name
      );
      console.log('✅ Usuario registrado:', user);
      this.showToast('Usuario creado con éxito ✅', 'success');
    } catch (error: any) {
      console.error('❌ Error en el registro:', error.message);
      this.showToast('Error: ' + error.message, 'danger');
    }
  }

  private async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    toast.present();
  }
}
