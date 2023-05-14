import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as fileSaver from 'file-saver'
@Component({
  selector: 'app-detailsactivite',
  templateUrl: './detailsactivite.component.html',
  styleUrls: ['./detailsactivite.component.scss']
})
export class DetailsactiviteComponent implements OnInit {
  id=''
  dataActivite:any
  messageErr=''
 
  file:any
  constructor(private route:ActivatedRoute, private ds:DataService, private http:HttpClient) {
    this.route.params.subscribe(response=>this.id=response['id'])

    this.ds.getOneActivite(this.id).subscribe(response=>{this.dataActivite=response
      this.file="http://localhost:3000/static/"+this.dataActivite.file},(err:HttpErrorResponse)=>this.messageErr="nous n'avons pas trouvé cet activite dans notre base de données")
   }

  ngOnInit(): void {
    
    
  }
  
}
