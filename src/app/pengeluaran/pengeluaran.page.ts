import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pengeluaran',
  templateUrl: './pengeluaran.page.html',
  styleUrls: ['./pengeluaran.page.scss'],
})
export class PengeluaranPage implements OnInit {
  dataPengeluaran: any = [];
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
    this.getPengeluaran();
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
    this.ambilPengeluaran(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  tambahPengeluaran() {
    if (this.nama_transaksi != '' && this.jumlah != '') {
      let data = {
        nama_transaksi: this.nama_transaksi,
        jumlah: this.jumlah,
      };
      this._apiService.tambah(data, '/tambahDataPengeluaran.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah pengeluaran');
          this.getPengeluaran();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah pengeluaran');
        },
      });
    } else {
      console.log('gagal tambah pengeluaran karena masih ada data yg kosong');
    }
  }

  hapusPengeluaran(id: any) {
    this._apiService.hapus(id, '/hapusDataPengeluaran.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getPengeluaran();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilPengeluaran(id: any) {
    this._apiService.lihat(id, '/lihatDataPengeluaran.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let pengeluaran = hasil;
        this.id = pengeluaran.id;
        this.nama_transaksi = pengeluaran.nama_transaksi;
        this.jumlah = pengeluaran.jumlah;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editPengeluaran() {
    let data = {
      id: this.id,
      nama_transaksi: this.nama_transaksi,
      jumlah: this.jumlah,
    };
    this._apiService.edit(data, '/editDataPengeluaran.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getPengeluaran();
        console.log('berhasil edit Pengeluaran');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Pengeluaran');
      },
    });
  }

}
