import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pemasukan',
  templateUrl: './pemasukan.page.html',
  styleUrls: ['./pemasukan.page.scss'],
})
export class PemasukanPage implements OnInit {
  dataPemasukan: any = [];
  id: number | null = null;
  nama_transaksi: string = '';
  jumlah: string = '';
  modal_tambah: boolean = false;
  modal_edit: boolean = false;

  constructor(
    private _apiService: ApiService,
    private modal: ModalController
  ) {  }

  ngOnInit() {
    this.getPemasukan();
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

  reset_model() {
    this.id = null;
    this.nama_transaksi = '';
    this.jumlah = '';
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilPemasukan(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  tambahPemasukan() {
    if (this.nama_transaksi != '' && this.jumlah != '') {
      let data = {
        nama_transaksi: this.nama_transaksi,
        jumlah: this.jumlah,
      };
      this._apiService.tambah(data, '/tambahDataPemasukan.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah pemasukan');
          this.getPemasukan();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah pemasukan');
        },
      });
    } else {
      console.log('gagal tambah pemasukan karena masih ada data yg kosong');
    }
  }

  hapusPemasukan(id: any) {
    this._apiService.hapus(id, '/hapus.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getPemasukan();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilPemasukan(id: any) {
    this._apiService.lihat(id, '/lihatDataPemasukan.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let pemasukan = hasil;
        this.id = pemasukan.id;
        this.nama_transaksi = pemasukan.nama_transaksi;
        this.jumlah = pemasukan.jumlah;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editPemasukan() {
    let data = {
      id: this.id,
      nama_transaksi: this.nama_transaksi,
      jumlah: this.jumlah,
    };
    this._apiService.edit(data, '/editDataPemasukan.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getPemasukan();
        console.log('berhasil edit Pemasukan');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Pemasukan');
      },
    });
  }

}
