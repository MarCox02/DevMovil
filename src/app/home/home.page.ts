import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuario } from 'src/app/services/usuario';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private menuCtrl: MenuController,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private activerouter: ActivatedRoute,
    private bd: ServicebdService,
    private storage: NativeStorage,
    private servicesbd: ServicebdService,
  ) {}


  ngOnInit() {
    this.menuCtrl.enable(false, 'comprador');
    this.menuCtrl.enable(false, 'vendedor');
    this.bd.crearBD();
    this.servicesbd.fetchUsuarios().subscribe((data: Usuario[]) => {
    this.usuarios = data;
    
    });
  }
  usuario: string = '';
  contrasena: string = '';
  rol: string = '';



  // Usuarios estáticos para el ejemplo
  /* listaUsuarios: Usuario[] = [
    { rut: '12345678-9', nombre: 'Angel', apellido: 'Perugini', usuario: 'Angel',telefono: '933336269', correo: 'angel@example.com', contrasena: 'Angel123', rol: 'vendedor' },
    { rut: '87654321-0', nombre: 'Martin', apellido: 'Cox', usuario: 'Martin', telefono: '955555555',correo: 'martin@example.com', contrasena: 'Martin123', rol: 'vendedor' },
    { rut: '13579246-8', nombre: 'Victor', apellido: 'Gonzalez', usuario: 'Victor',telefono: '966665555', correo: 'victor@example.com', contrasena: 'Victor123', rol: 'comprador' }
  ]; */


/* Agrega usuarios registrados
registrarUsuario(nuevoUsuario: Usuario) {
  this.listaUsuarios.push(nuevoUsuario);
}*/

async login() {
  try {
    const user = await this.servicesbd.consultarUsuario(this.usuario, this.contrasena);
    
    if (user) {
      this.alerta_t("Login exitoso", "Has iniciado sesión correctamente.");

      // Guardar un valor de prueba en LocalStorage
      await this.storage.setItem('prueba', 'testValue');
      
      // Leer el valor de prueba para asegurarte de que NativeStorage funciona correctamente
      const testValue = await this.storage.getItem('prueba');
      console.log('Valor de prueba:', testValue); // Deberías ver 'testValue' en la consola

      if (user.id_rol === '1') { // Si es vendedor
        await this.storage.setItem('rutVendedor', user.rut); // Guardar el RUT
      }

      // Define los extras de navegación con el usuario
      const navigationExtras: NavigationExtras = {
        state: {
          user: user.user,
        },
      };

      // Verifica el rol del usuario para redirigir
      if (user.id_rol === '1') {
        this.menuCtrl.enable(true, 'vendedor'); // Habilita el menú del vendedor
        this.router.navigate(['/catalogov'], navigationExtras); // Redirige al catálogo del vendedor
      } else if (user.id_rol === '2') {
        this.menuCtrl.enable(true, 'comprador'); // Habilita el menú del comprador
        this.router.navigate(['/catalogoc'], navigationExtras); // Redirige al catálogo del comprador
      } else {
        this.alerta("Error de login", "Rol de usuario no válido.");
      }
    } else {
      this.alerta("Error de login", "Usuario o contraseña incorrectos.");
    }
  } catch (error) {
    console.error("Error en el login:", error);
    this.alerta("Error de login", "Hubo un problema al intentar iniciar sesión.");
  }
}



  /* alertas */
  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alerta_t(titulo: string, mensaje: string) {
    const alert_t = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });

    await alert_t.present();
  }
}
