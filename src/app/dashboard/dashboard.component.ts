import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id:any
  nb_employe:any
  nb_projet_cree:any
  nb_projet:any
  nb_activite:any
  nb_activiteCree:any
  showAdmin:any
  showDirecteur:any
  showDeveloppeur:any
  showTesteur:any
  dataMesProjet:any
  ArrayProjet:any=[]
  ArrayProjetBug:any=[]
  dataTache:any
  nb_Tache:any
 
  ArrayPourcentage:any=[]
  ArrayPourcentageBug:any=[]
  pourcentageTache:any
  nb_bug:any
  PourcentageTache:any
  PourcentageBug:any
  constructor(private ds:DataService,private authService:AuthService,private token: TokenStorageService) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
    this.showAdmin=this.authService.loggedAdmin()
    this.showDirecteur=this.authService.loggedDirecteur()
    this.showDeveloppeur=this.authService.loggedDeveloppeur()
    this.showTesteur=this.authService.loggedTesteur()


    this.id=this.token.getUser().id
    this.ds.countEmploye().subscribe(data=>this.nb_employe=data)
      this.ds.countProjet(this.id).subscribe(data=>this.nb_projet=data)
      this.ds.countProjetCree(this.id).subscribe(data=>this.nb_projet_cree=data)
      this.ds.countActivite(this.id).subscribe(data=>this.nb_activite=data)
      this.ds.countTacheRealisee(this.id).subscribe(data=>this.nb_Tache=data)
      this.ds.countBugCree(this.id).subscribe(data=>this.nb_bug=data)

      this.ds.getMesprojets(this.token.getUser().id).subscribe(data=>{this.dataMesProjet=data
        
        for (let i = 0; i < this.dataMesProjet.length; i++) {
          if(this.showDeveloppeur || this.showDirecteur){
          this.ds.PourcentageTacheRealiseProjet(this.id,this.dataMesProjet[i]._id).subscribe(data=>{this.PourcentageTache=data
            
            this.ArrayPourcentage.push(this.PourcentageTache);
           
          this.ArrayProjet.push(this.dataMesProjet[i].titre);
          
       
        const dataDailySalesChart: any = {
        
          labels: this.ArrayProjet,
          series: [
            this.ArrayPourcentage
          ]
      };
      const optionsDailySalesChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 120, 
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    }

    var dailySalesChart = new Chartist.Line('#TacheChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);

        
      })
    }
    if(this.showTesteur){
      this.ds.PourcentageBugProjet(this.id,this.dataMesProjet[i]._id).subscribe(data=>{this.PourcentageBug=data
           
              this.ArrayPourcentageBug.push(this.PourcentageBug);
             
            this.ArrayProjetBug.push(this.dataMesProjet[i].titre);
            
         
          const dataDailySalesChart1: any = {
          
            labels: this.ArrayProjetBug,
            series: [
              this.ArrayPourcentageBug
            ]
        };
        const optionsDailySalesChart1: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 120, 
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }
  
      var dailySalesChart1 = new Chartist.Line('#BugChart', dataDailySalesChart1, optionsDailySalesChart1);
  
      this.startAnimationForLineChart(dailySalesChart1);
  
          
        })
      
    }
      }
       })
      }

 /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

     
      



      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
      
      
     


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    //   const dataCompletedTasksChart: any = {
    //       labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
    //       series: [
    //           [230, 750, 450, 300, 280, 240, 200, 190]
    //       ]
    //   };

    //  const optionsCompletedTasksChart: any = {
    //       lineSmooth: Chartist.Interpolation.cardinal({
    //           tension: 0
    //       }),
    //       low: 0,
    //       high: 1000, 
    //       chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    //   }

    //   var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      
    //   this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
//       if(this.showDirecteur){
//       this.ds.countProjetCree(this.id).subscribe(data=>{this.nb_projet_cree=data
//         this.ds.countProjet(this.id).subscribe(data=>{this.nb_projet=data
//           this.ds.countActivite(this.id).subscribe(data=>{this.nb_activite=data
//             this.ds.countActivite(this.id).subscribe(data=>{this.nb_activiteCree=data
//       var datawebsiteViewsChart = {
//         labels: ['projets créés', 'projets réalisés', 'activités créés', 'activités participés'],
//         series: [
//           [100, 50, 80, 100]

//         ]
//       };
   
//       var optionswebsiteViewsChart = {
//           axisX: {
//               showGrid: false
//           },
//           low: 0,
//           high: 120,
//           chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
//       };
//       var responsiveOptions: any[] = [
//         ['screen and (max-width: 640px)', {
//           seriesBarDistance: 5,
//           axisX: {
//             labelInterpolationFnc: function (value) {
//               return value[0];
//             }
//           }
//         }]
//       ];
//       var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
      

    
//       this.startAnimationForBarChart(websiteViewsChart);
//     })
//   })
// })
// })
//       }else if(this.showDeveloppeur || this.showTesteur){


        
//           this.ds.countProjet(this.id).subscribe(data=>{this.nb_projet=data
//             this.ds.countActivite(this.id).subscribe(data=>{this.nb_activite=data
//               this.ds.countActivite(this.id).subscribe(data=>{this.nb_activiteCree=data
//         var datawebsiteViewsChart = {
//           labels: ['projets réalisés', 'activités créés', 'activités participés'],
//           series: [
//             [this.nb_projet, this.nb_activiteCree, this.nb_activite]
  
//           ]
//         };
     
//         var optionswebsiteViewsChart = {
//             axisX: {
//                 showGrid: false
//             },
//             low: 0,
//             high: 25,
//             chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
//         };
//         var responsiveOptions: any[] = [
//           ['screen and (max-width: 640px)', {
//             seriesBarDistance: 5,
//             axisX: {
//               labelInterpolationFnc: function (value) {
//                 return value[0];
//               }
//             }
//           }]
//         ];
//         var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
        
  
//         //start animation for the Emails Subscription Chart
//         this.startAnimationForBarChart(websiteViewsChart);
//       })
//     })
//   })
 

//       }



    }


