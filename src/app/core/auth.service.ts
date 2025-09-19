import { Injectable } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) {}

  //  Registrar usuario
  async register(email: string, password: string, name: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      const userDocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        email,
        name,
        createdAt: new Date()
      });

      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  //  Iniciar sesión
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  //  Cerrar sesión
  async logout() {
    try {
      await signOut(this.auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
