import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { AuthenticationService } from '../services/authentication.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  dataPemasukan: any = [];
  dataPengeluaran: any = [];
  id: number | null = null;

  constructor(
    public _apiService: ApiService, 
    private modal:ModalController,
    private authService: AuthenticationService,
    private alertController: AlertController, 
    private router: Router
  ) {  }

  ngOnInit() {
    this.getPemasukan();
    this.getPengeluaran();
  }

  getPemasukan() {
    this._apiService.tampil('tampilDataPemasukan.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataPemasukan = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getPengeluaran() {
    this._apiService.tampil('tampilDataPengeluaran.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataPengeluaran = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  logout(){
    this.alertController.create({
      header: 'Perhatian',
      subHeader: 'Yakin Logout Aplikasi ?',
      buttons: [{
        text: 'Batal',
        handler: (data: any) => {
          console.log('Canceled',data);
        }
      },
      {
        text: 'Yakin',
        handler: (data: any) => {
          this.authService.logout();
          this.router.navigateByUrl('/',{replaceUrl:true});
        }
      }
      ]
    }).then(res=> {
      res.present();
    })
  }
}
