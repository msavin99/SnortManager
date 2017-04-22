import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-import-rules',
  templateUrl: './import-rules.component.html',
  styleUrls: ['./import-rules.component.css']
})

export class ImportRulesComponent implements OnInit {



  @ViewChild('uploadFinishedModal') public uploadFinishedModal: ModalDirective;

  allowedMimeType = ['application/vnd.ms-excel','text/csv','text/comma-separated-values'];
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:8080/api/upload', itemAlias: 'CSVFILE', removeAfterUpload: true, allowedMimeType: this.allowedMimeType });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  constructor() { }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit() {
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("Uploaded:", item, response, status);
    };
    this.uploader.onCompleteAll = () => {
      console.log("Completed all uploads!");
      this.showUploadFinishedModal();
    }
  }

  clearList() {
    for (let item of this.uploader.queue) {
      this.uploader.removeFromQueue(item);
    }
  }

  public showUploadFinishedModal(): void {
    this.uploadFinishedModal.show();
  }

  public hideUploadFinishedModal(): void {
    this.clearList();
    this.uploadFinishedModal.hide();
  }

}
