import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path: '',
  canActivateChild: [TokenSetterGuard],
  canActivate: [TokenSetterGuard],
  children: [
    {
      path: '',
      loadChildren: () => import('/').then((m) => m.myComponentModule)
    },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
