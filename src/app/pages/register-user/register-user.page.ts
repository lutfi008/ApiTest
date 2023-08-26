import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api/api-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  form = {
    name : '',
    job :''
  }

  constructor(
    private api : ApiServiceService,
    private alert : AlertController
  ) { }

  private async presentAlert(title : any, message : any) {
    const alert = await this.alert.create({
      header: 'Sample Form',
      subHeader: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  doPostRegisterUser(){
    this.api.CreateUser(this.form)
            .subscribe( data => {
              const jsonResponse = JSON.parse(JSON.stringify(data));
              console.log(jsonResponse.id);
              console.log("Success ==> "+ JSON.stringify(data)); 
              this.presentAlert('Berhasil' , 'Data anda berhasil di registrasi'); 
            },
            err => {
              console.error('Gagal Create user ===> ', err.status);
              this.presentAlert('Gagal', 'Data Anda Gagal Di registrasi');
            });
  }

  doSubmitWithValidateFormInput(){

    var doSubmitForm = true;

    if(this.form.name == null || this.form.name == ''){
      this.presentAlert('Berhasil' , 'Kamu berhasil Registrasi');
      doSubmitForm = false;
    }

    if(this.form.job == null || this.form.job == ''){
      this.presentAlert('Peringatan' , 'Gagal Registrasi');
      doSubmitForm = false;
    }

    if(doSubmitForm){
      this.doPostRegisterUser();
    }

  }

  ngOnInit() {
  }

}