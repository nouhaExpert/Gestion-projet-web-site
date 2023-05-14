import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { DataService } from '../services/data.service';
import{FormBuilder,FormGroup,FormControl, Validators}from'@angular/forms'
import { jsPDF } from "jspdf";
import * as html2pdf from'html2pdf.js'
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {



  formValue!: FormGroup
  currentUser: any;
  anneeCompte:any
  date:any
  grade:any
  dataProjet:any
  dataActivite:any
  dataTache:any
  dataTacheRealise:any
  dataBug:any
  dataProjetAvecTache:any
  dataTacheBug:any
  dataAnnee:any=[]
  annee:any
  selected:any
  showDirecteur:any
  showDeveloppeur = false;
  showTesteur = false;
  constructor(private ds:DataService,private token: TokenStorageService,private authService:AuthService) { }

  ngOnInit(): void {
    this.date=Date.now()
  
    this.selected=new Date(Date.now()).getFullYear().toString()
    this.currentUser = this.token.getUser();
    this.anneeCompte = new Date(this.currentUser.date_creation).getFullYear();
    
    this.annee = new Date(Date.now()).getFullYear()
    while (this.annee >= this.anneeCompte) {
     
      this.dataAnnee.push(this.annee)
      this.annee=this.annee-1
 
    }
    
    this.showDirecteur=this.authService.loggedDirecteur()
    this.showDeveloppeur=this.authService.loggedDeveloppeur()
    this.showTesteur=this.authService.loggedTesteur()
    
    this.ds.getOnegrade(this.currentUser.grade).subscribe((response)=>this.grade=response)
    this.ds.getMesprojetsParAnnee(this.currentUser.id,this.selected).subscribe((response)=>this.dataProjet=response)
    this.ds.getMesactivitesParAnnee(this.currentUser.id,this.selected).subscribe((response)=>this.dataActivite=response)


    
    this.ds.getMesprojetsParAnnee(this.currentUser.id,this.selected).subscribe((response)=>{this.dataProjetAvecTache=response
      for (let i = 0; i < this.dataProjetAvecTache.length; i++) {
        if(this.showTesteur &&(this.showDeveloppeur || this.showDirecteur)){

          this.ds.getAlltaches(this.dataProjetAvecTache[i]._id).subscribe(data=>{this.dataTache=data
            this.dataProjetAvecTache[i].tacheBug=this.dataTache
            for (let j = 0; j < this.dataProjetAvecTache[i].tacheBug.length; j++) {
            this.ds.getBugParTacheParEmployee( this.currentUser.id,this.dataProjetAvecTache[i].tacheBug[j]._id).subscribe(data=>{this.dataBug=data
         
              this.dataProjetAvecTache[i].tacheBug[j].bug=this.dataBug
              })}})



          // this.ds.getBugParProjetParEmployee( this.currentUser.id,this.dataProjetAvecTache[i]._id).subscribe(data=>{this.dataBug=data
          
          //   this.dataProjetAvecTache[i].bug=this.dataBug
            this.ds.getTacheRealiserParProjet( this.currentUser.id,this.dataProjetAvecTache[i]._id).subscribe(data=>{this.dataTache=data
        
              this.dataProjetAvecTache[i].tache=this.dataTache})
  
          // })

        }else if(this.showTesteur){
          this.ds.getAlltaches(this.dataProjetAvecTache[i]._id).subscribe(data=>{this.dataTache=data
            this.dataProjetAvecTache[i].tacheBug=this.dataTache
            for (let j = 0; j < this.dataProjetAvecTache[i].tacheBug.length; j++) {
            this.ds.getBugParTacheParEmployee( this.currentUser.id,this.dataProjetAvecTache[i].tacheBug[j]._id).subscribe(data=>{this.dataBug=data
         
              this.dataProjetAvecTache[i].tacheBug[j].bug=this.dataBug
              })}})
          // this.ds.getBugParProjetParEmployee( this.currentUser.id,this.dataProjetAvecTache[i]._id).subscribe(data=>{this.dataBug=data
          
          //   this.dataProjetAvecTache[i].bug=this.dataBug})
        }else if(this.showDeveloppeur || this.showDirecteur){
          this.ds.getTacheRealiserParProjet( this.currentUser.id,this.dataProjetAvecTache[i]._id).subscribe(data=>{this.dataTacheRealise=data
        
            this.dataProjetAvecTache[i].tache=this.dataTacheRealise})

        }

      } })
      // this.ds.getMesprojetsParAnnee(this.currentUser.id,this.selected).subscribe((response)=>{this.dataProjetAvecTache=response
      //   for (let i = 0; i < this.dataProjetAvecTache.length; i++) {
      //   this.ds.getBugParProjetParEmployee( this.currentUser.id,this.dataProjetAvecTache[i]._id).subscribe(data=>{this.dataBug=data
          
      //   this.dataProjetAvecTache[i].tache=this.dataTache})} })
  

      
  
   
   
   
   
  }
  onChange(newValue:any) {
    this.selected = newValue;
    this.ds.getMesprojetsParAnnee(this.currentUser.id,this.selected).subscribe((response)=>this.dataProjet=response)
    this.ds.getMesactivitesParAnnee(this.currentUser.id,this.selected).subscribe((response)=>this.dataActivite=response)
    this.ds.getMesprojetsParAnnee(this.currentUser.id,this.selected).subscribe((response)=>{this.dataProjetAvecTache=response
      for (let i = 0; i < this.dataProjetAvecTache.length; i++) {
      this.ds.getTacheRealiserParProjet( this.currentUser.id,this.dataProjetAvecTache[i]._id).subscribe(data=>{this.dataTache=data
        
      this.dataProjetAvecTache[i].tache=this.dataTache})}
   })
  }
  // @ViewChild('content',{static:false}) el!:ElementRef
  // makePdf(){
  //   const doc = new jsPDF('p','pt','a4');

  //   doc.html(this.el.nativeElement,{
  //     callback:(pdf)=>{
  //       doc.save("rapport.pdf");
  //     }
  //   })
   
     
  // } 
  export(){
    const options={
      filename:'rapport.pdf',
     
      html2canavas:{},
      jsPDF:{orientation:'landscape'}

    }
    const content: Element=document.getElementById('content');
    html2pdf()
    .from(content)
    .set(options)
    .save()
  }
  
  
}
