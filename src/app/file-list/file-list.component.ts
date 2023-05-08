import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  fileList: any;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getFileList().subscribe((data) => {
      this.fileList = data;
    })
  }

}
