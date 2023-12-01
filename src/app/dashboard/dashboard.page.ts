import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';


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
    private _apiService: ApiService,
    private modal: ModalController
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
}
