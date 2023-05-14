import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-detailsemployee',
  templateUrl: './detailsemployee.component.html',
  styleUrls: ['./detailsemployee.component.scss']
})
export class DetailsemployeeComponent implements OnInit {
  id=''
  dataobject:any
  messageErr=''

  constructor(private route:ActivatedRoute, private ds:DataService) { 
    this.route.params.subscribe(response=>this.id=response['id'])

    this.ds.getOneEmployee(this.id).subscribe(response=>this.dataobject=response,(err:HttpErrorResponse)=>this.messageErr="nous n'avons pas trouvé cet employé dans notre base de données")
  }

  ngOnInit(): void {
  }

}
