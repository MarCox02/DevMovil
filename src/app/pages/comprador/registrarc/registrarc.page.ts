import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrarc',
  templateUrl: './registrarc.page.html',
  styleUrls: ['./registrarc.page.scss'],
})
export class RegistrarcPage implements OnInit{

  constructor(private menuCtrl: MenuController,private alertController: AlertController,  private router: Router, private toastController: ToastController) {}

  ngOnInit() {
    this.menuCtrl.enable(false,'vendedor')
    this.menuCtrl.enable(false,'comprador')

  }


  
Comprador: any ={
  rut: '',
  nombre: '',
  apellido: '',
  usuario: '',
  correo: '',
  contrasena: '',
  confirmarContrasena: ''
}

  rut!:string;
  nombre!:string;
  apellido!:string;
  usuario!:string;
  correo!:string;
  contrasena!:string;
  confirmarContrasena!:string;

  formulario(){
    const patronEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(this.rut == undefined
      || this.nombre == undefined
      || this.apellido == undefined
      || this.usuario == undefined
      || this.correo == undefined
      || this.contrasena == undefined
      || this.confirmarContrasena == undefined
      || this.rut == ""
      || this.nombre == ""
      || this.apellido == ""
      || this.usuario == ""
      || this.correo == ""
      || this.contrasena == ""
      || this.confirmarContrasena == ""
    ){

      const Titulo = "Campos vacios"
      const Mensaje = "Todos los campos son obligatorios"
      this.alerta(Titulo, Mensaje)
      return;
    }
    if(this.contrasena!= this.confirmarContrasena){
      const Titulo = "Contraseñas no coinciden"
      const Mensaje = "Las contraseñas no coinciden"
      this.alerta(Titulo, Mensaje)
      return;
    }

    if (!this.validarRUT(this.rut)) {
      const Titulo = "RUT inválido";
      const Mensaje = "El RUT ingresado no es válido";
      this.alerta(Titulo, Mensaje);
      return;
    }

    if (!patronEmail.test(this.correo)) {
      const Titulo = "Correo inválido";
      const Mensaje = "Por favor, ingrese un correo electrónico válido.";
      this.alerta(Titulo, Mensaje);
      return;
    }


    
    const Titulo = "Registro exitoso"
    const Mensaje = "Te has registrado correctamente, ahora puedes iniciar sesión"
    this.presentToast(Titulo, Mensaje)
    this.router.navigate(['/loginc']);
    return
  }

  validarRUT(rut: string): boolean {
    // Eliminar los puntos y guiones del RUT
    rut = rut.replace(/\./g, '').replace(/-/g, '');
  
    // Obtener el cuerpo del RUT y el dígito verificador
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
  
    // Validar que el cuerpo sea numérico y que tenga la longitud correcta
    if (cuerpo.length < 7 || cuerpo.length > 8 || isNaN(Number(cuerpo))) {
      return false;
    }
  
    // Calcular el dígito verificador
    let suma = 0;
    let multiplo = 2;
  
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i)) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
  
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
  
    // Comparar el dígito verificador calculado con el ingresado
    return dvCalculado === dv;
  }
  






/*alertas */
  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(titulo: string, mensaje: string ) {
    const alert_t = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });

    await alert_t.present();
  }
}
