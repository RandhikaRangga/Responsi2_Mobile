import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'pemasukan',
    loadChildren: () => import('./pemasukan/pemasukan.module').then(m => m.PemasukanPageModule)
  },
  {
    path: 'pengeluaran',
    loadChildren: () => import('./pengeluaran/pengeluaran.module').then( m => m.PengeluaranPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
