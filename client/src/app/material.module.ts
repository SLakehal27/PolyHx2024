import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';


const materialModules = [MatButtonModule, MatIconModule, MatDialogModule];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
  providers: [],
})
export class AngularMaterialModule {}
