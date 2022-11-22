import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetList } from './assets/asset-list.component';
import { AssetDetails } from './assets/asset-details.component';
import { NewAssetForm } from './assets/new-asset-form.component';

const routes: Routes = [
  { path: 'details/:assetTagId', component: AssetDetails},
  { path: 'new-asset', component: NewAssetForm},
  { path: ':assignedTo', component: AssetList},
  { path: '', component: AssetList}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }