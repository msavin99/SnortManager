import { Component, ViewChild, Host , Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { RulesComponent } from '../rules/rules.component';
@Component({
  selector: 'modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css'],
})
export class ModalDialogComponent {

   id: number;
   //With input , we can declare an input parameter as this : <modal-dialog #modal [parent]='this'></modal-dialog> KEWL.
   @Input() parent : any;
   @ViewChild('childModal') public childModal:ModalDirective;
   
  public showChildModal(id: number):void {
    this.id = id;
    this.childModal.show();
  }
 
  public hideChildModal():void {
    this.childModal.hide();
  }

  public deleteItem():void{
    this.parent.deleteItemById(this.id);
    this.childModal.hide();
  }
}
