// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-file-upload',
//   templateUrl: './file-upload.component.html',
//   styleUrls: ['./file-upload.component.css']
// })
// export class FileUploadComponent {
//   fileToUpload: File | null = null;

//   constructor(private http: HttpClient) { }
//     handleFileInput(files: FileList) {
//       this.fileToUpload = files.item(0);
//     }
//     uploadFileToStorage() {
//       if (!this.fileToUpload) { // check if fileToUpload is null
//         return;
//       }
//       const endpoint = 'http://localhost:3000/upload';
//       const formData: FormData = new FormData();
//       formData.append('file', this.fileToUpload, this.fileToUpload.name);
//       this.http.post(endpoint, formData).subscribe(
//         (response) => console.log(response),
//         (error) => console.log(error)
//       );
//     }
//   }
import { Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxDropzoneModule  } from 'ngx-dropzone';



@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [
    {
      provide: 'dropzoneConfig',
      useValue: <NgxDropzoneModule >{
        url: 'http://localhost:8000/upload',
        acceptedFiles: '.xls,.xlsx,.csv'
      }
    }
  ]
})
export class FileUploadComponent {
  componentRef: any;
  dropzone: any;

  constructor(private http: HttpClient) { }

  // config: NgxDropzoneModule = {
  //   url: 'http://localhost:8000/upload',
  //   maxFilesize: 50,
  //   acceptedFiles: '.xls, .xlsx, .csv'
  // };
  onUploadSuccess(event: any) {
    console.log(event);
    alert('File uploaded successfully!');
    this.uploadFileToStorage()
  }

  onUploadError(event: any) {
    console.error(event);
    alert('An error occurred while uploading the file.');
  }

  files: any
  onSelect(event: any){
    console.log(event);
    this.files=event.addedFiles;
    this.handleFileInput(this.files)
  }
    fileToUpload: File | null = null;

  handleFileInput(files: any) {
    this.fileToUpload = files[0];
  }
  uploadFileToStorage() {
    if (!this.fileToUpload) { // check if fileToUpload is null
      return;
    }
    const options = { withCredentials: true };
    const endpoint = '/upload';
    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.http.post(endpoint, formData, options).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    }
}