import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'calculator' },
    { title: 'Pemasukan', url: '/pemasukan', icon: 'arrow-down' },
    { title: 'Pengeluaran', url: '/pengeluaran', icon: 'arrow-up' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
