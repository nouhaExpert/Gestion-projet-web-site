import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams , HttpRequest, HttpEvent  } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { TokenStorageService } from '../services/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  token:any=sessionStorage.getItem('auth-token')
  

  params=new HttpParams()
  .set('secret',environment.secret)
  .set('client',environment.client)




  constructor(private http:HttpClient,private tokene: TokenStorageService) { }
  getAllemployees(){
    return this.http.get(`${environment.urlBackend}`+'employees',{params:this.params})
  }
  getAllemployeesActive(){
    return this.http.get(`${environment.urlBackend}`+'employees/active',{params:this.params})
  }
  getOneEmployee(id:any){
    return this.http.get(`${environment.urlBackend}`+'employees/'+id,{params:this.params})
  }
  
  addemployee(profile:any){
    return this.http.post(`${environment.urlBackend}`+'employees',profile,{params:this.params})
  }
  deleteemployee(id:any){
    return this.http.delete(`${environment.urlBackend}`+'employees/'+id,{params:this.params})
  }
  updateemployee(id:any,newprofile:any){
    return this.http.put(`${environment.urlBackend}`+'employees/'+id,newprofile,{params:this.params})
  }
  updateemployeeEtat(id:any,newprofile:any){
    return this.http.put(`${environment.urlBackend}`+'employees/etat/'+id,newprofile,{params:this.params})
  }
  countEmploye(){
    return this.http.get(`${environment.urlBackend}`+'employees/countEmploye',{params:this.params})
  }
  countProjetCree(id:any){
    return this.http.get(`${environment.urlBackend}`+'employees/countProjetCree/'+id,{params:this.params})
  }
  countProjet(id:any){
    return this.http.get(`${environment.urlBackend}`+'employees/countProjet/'+id,{params:this.params})
  }
  countActivite(id:any){
    return this.http.get(`${environment.urlBackend}`+'employees/countActivite/'+id,{params:this.params})
  }
  countActiviteCree(id:any){
    return this.http.get(`${environment.urlBackend}`+'employees/countActiviteCree/'+id,{params:this.params})
  }
  countTacheRealisee(id:any){
    return this.http.get(`${environment.urlBackend}`+'employees/countTacheRealisee/'+id,{params:this.params})
  }
  countBugCree(id:any){
    return this.http.get(`${environment.urlBackend}`+'employees/countBugCree/'+id,{params:this.params})
  }
  
  addrole(data:any){
    return this.http.post(`${environment.urlBackend}`+'roles',data,{params:this.params})
  }
  getAllrole(){
    return this.http.get(`${environment.urlBackend}`+'roles',{params:this.params})
  }
  getrolesansAdmin(){
    return this.http.get(`${environment.urlBackend}`+'roles/sansadmin',{params:this.params})
  }
  updaterole(id:any,newrole:any){
    return this.http.put(`${environment.urlBackend}`+'roles/'+id,newrole,{params:this.params})
  }
  deleterole(id:any){
    return this.http.delete(`${environment.urlBackend}`+'roles/'+id,{params:this.params})
  }

  getOnefonction(id:any){
    return this.http.get(`${environment.urlBackend}`+'fonctions/'+id,{params:this.params})
  }
  getAllfonction(){
    return this.http.get(`${environment.urlBackend}`+'fonctions',{params:this.params})
  }
  addfonction(data:any){
    return this.http.post(`${environment.urlBackend}`+'fonctions',data,{params:this.params})
  }
  updatefonction(id:any,newfonction:any){
    return this.http.put(`${environment.urlBackend}`+'fonctions/'+id,newfonction,{params:this.params})
  }
  deletefonction(id:any){
    return this.http.delete(`${environment.urlBackend}`+'fonctions/'+id,{params:this.params})
  }

  getAllgrade(){
    return this.http.get(`${environment.urlBackend}`+'grades',{params:this.params})
  }
 
  addgrade(data:any){
    return this.http.post(`${environment.urlBackend}`+'grades',data,{params:this.params})
  }
  updategrade(id:any,newgrade:any){
    return this.http.put(`${environment.urlBackend}`+'grades/'+id,newgrade,{params:this.params})
  }
  deletegrade(id:any){
    return this.http.delete(`${environment.urlBackend}`+'grades/'+id,{params:this.params})
  }
  getOnegrade(id:any){
    return this.http.get(`${environment.urlBackend}`+'grades/'+id,{params:this.params})
  }
  getAllprojets(){
    return this.http.get(`${environment.urlBackend}`+'projets',{params:this.params})
  }
  addprojet(data:any){
    return this.http.post(`${environment.urlBackend}`+'projets',data,{params:this.params})
  }
  deleteprojet(id:any){
    return this.http.delete(`${environment.urlBackend}`+'projets/'+id,{params:this.params})
  }
  updateprojet(id:any,newprojet:any){
    return this.http.put(`${environment.urlBackend}`+'projets/'+id,newprojet,{params:this.params})
  }
  getOneProjet(id:any){
    return this.http.get(`${environment.urlBackend}`+'projets/'+id,{params:this.params})
  }
  


  getAlltaches(id:any){
    return this.http.get(`${environment.urlBackend}`+'projets/'+id+'/tache',{params:this.params})
  }
  getEquipe(id:any){
    return this.http.get(`${environment.urlBackend}`+'projets/'+id+'/equipe',{params:this.params})
  }
  

  getMesprojets(id:any){
    return this.http.get(`${environment.urlBackend}`+'employees/'+id+'/projet',{params:this.params})
  }

  getMesprojetsParAnnee(id:any,annee:any){
    return this.http.get(`${environment.urlBackend}`+'employees/'+id+'/projet/'+annee,{params:this.params})
  }

  addtache(data:any){
    return this.http.post(`${environment.urlBackend}`+'taches',data,{params:this.params})
  }
  deletetache(id:any){
    return this.http.delete(`${environment.urlBackend}`+'taches/'+id,{params:this.params})
  }
  updatetache(id:any,newtache:any){
    return this.http.put(`${environment.urlBackend}`+'taches/'+id,newtache,{params:this.params})
  }
  getOneTache(id:any){
    return this.http.get(`${environment.urlBackend}`+'taches/'+id,{params:this.params})
  }
  updatetacheTerminee(id:any,data:any){
    return this.http.put(`${environment.urlBackend}`+'taches/terminee/'+id,data,{params:this.params})
  }
  getTacheRealiserParProjet(idemployee:any,idprojet:any){
    return this.http.get(`${environment.urlBackend}`+'taches/'+idemployee+'/'+idprojet,{params:this.params})
  }
  PourcentageTacheRealiseProjet(idemployee:any,idprojet:any){
    return this.http.get(`${environment.urlBackend}`+'projets/tache/'+idemployee+'/'+idprojet,{params:this.params})
  }
  PourcentageBugProjet(idemployee:any,idprojet:any){
    return this.http.get(`${environment.urlBackend}`+'projets/bug/'+idemployee+'/'+idprojet,{params:this.params})
  }
  getAllactivites(){
    return this.http.get(`${environment.urlBackend}`+'activites',{params:this.params})
  }
  
  deleteactivite(id:any){
    return this.http.delete(`${environment.urlBackend}`+'activites/'+id,{params:this.params})
  }
  updateactivite(id:any,newactivite:any){
    return this.http.put(`${environment.urlBackend}`+'activites/'+id,newactivite,{params:this.params})
  }
  getMesactivites(id:any){
    return this.http.get(`${environment.urlBackend}`+'employees/'+id+'/activite',{params:this.params})
  }
  getMesactivitesParAnnee(id:any,annee:any){
    return this.http.get(`${environment.urlBackend}`+'employees/'+id+'/activite/'+annee,{params:this.params})
  }
  getactivitesType(data:any){
    return this.http.get(`${environment.urlBackend}`+'activites/type/'+data,{params:this.params})
  }
  affecterActivite(id:any,newactivite:any){
    return this.http.put(`${environment.urlBackend}`+'activites/affecter/'+id,newactivite,{params:this.params})

  }
  getOneActivite(id:any) {
    return this.http.get(`${environment.urlBackend}`+'activites/'+id,{params:this.params})
  }
  addactivite(data:any){
   
    return this.http.post(`${environment.urlBackend}`+'activites',data,{params:this.params})
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${environment.urlBackend}`+'activites/upload', formData ,{
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  
  getFiles(): Observable<any> {
    return this.http.get(`${environment.urlBackend}`+'activites/files');
  }
  sendEmail(data:any) {
    return this.http.post(`${environment.urlBackend}`+"employees/sendmail", data);
  }
  EnvoyerEmailTache(data:any) {
    return this.http.post(`${environment.urlBackend}`+"taches/EnvoyerEmailTache", data);
  }
  getAllbugs(id:any){
    return this.http.get(`${environment.urlBackend}`+'taches/'+id+'/bug',{params:this.params})
  }
  addbug(data:any){
    return this.http.post(`${environment.urlBackend}`+'bugs',data,{params:this.params})
  }
  deletebug(id:any){
    return this.http.delete(`${environment.urlBackend}`+'bugs/'+id,{params:this.params})
  }
  updatebug(id:any,newbug:any){
    return this.http.put(`${environment.urlBackend}`+'bugs/'+id,newbug,{params:this.params})
  }
  getOneBug(id:any){
    return this.http.get(`${environment.urlBackend}`+'bugs/'+id,{params:this.params})
  }
  getBugParProjetParEmployee(idemployee:any,idprojet:any){
    return this.http.get(`${environment.urlBackend}`+'bugs/'+idemployee+'/'+idprojet,{params:this.params})
  }
  getBugParTacheParEmployee(idemployee:any,idtache:any){
    return this.http.get(`${environment.urlBackend}`+'bugs/bugTache/'+idemployee+'/'+idtache,{params:this.params})
  }
  uploadImage(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${environment.urlBackend}`+'employees/upload', formData ,{
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getAllnotification(){
    return this.http.get(`${environment.urlBackend}`+'notifications',{params:this.params})
  }
  addnotification(data:any){
    return this.http.post(`${environment.urlBackend}`+'notifications',data,{params:this.params})
  }
  getOneNotification(id:any){
    return this.http.get(`${environment.urlBackend}`+'notifications/'+id,{params:this.params})
  }
  updateNotification(id:any,data:any){
    return this.http.put(`${environment.urlBackend}`+'notifications/'+id,data,{params:this.params})
  }
  getMesNotification(id:any){
    return this.http.get(`${environment.urlBackend}`+'employees/'+id+'/notification',{params:this.params})
  }
}
