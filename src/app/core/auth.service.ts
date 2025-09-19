import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore: Firestore) {}

  // Método para registrar usuario
  async register(email: string, password: string, name: string) {
    try {
      // Crea el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Guarda información adicional en Firestore
      const userDocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        email: email,
        name: name,
        createdAt: new Date()
      });

      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
