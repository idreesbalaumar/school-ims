import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ResultPreviewService } from './result-preview.service';
import { School } from '../../school.model';
import { SchoolService } from 'app/services/school.service';
import { environment } from 'environments/environment';
import { GradeData } from '../../settings/pages/grade-system/grade.model';
import { GeneralService } from '../../general.service';
import Swal from 'sweetalert2';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-result-preview',
  templateUrl: './result-preview.component.html',
  styleUrls: ['./result-preview.service.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultPreviewComponent implements OnInit, OnDestroy {
  // public
  public contentHeader: object;

  school: School;
  grades: GradeData[] = [];

  schoolLogo = 'assets/images/noimage.gif';
  basePath = environment.apiUrl;

  public apiData;
  public urlLastValue;
  public url = this.router.url;
  public sidebarToggleRef = false;
  public paymentSidebarToggle = false;
  public paymentDetails = {
    totalDue: '$12,110.55',
    bankName: 'American Bank',
    country: 'United States',
    iban: 'ETD95476213874685',
    swiftCode: 'BR91905'
  };

  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {ResultPreviewService} _resultPreviewService
   * @param {CoreSidebarService} _coreSidebarService
   */

   @ViewChild('pdfTable')
   pdfTable!: ElementRef;
   
  constructor(
    private router: Router,
    private _resultPreviewService: ResultPreviewService,
    private _coreSidebarService: CoreSidebarService,
    private schoolService: SchoolService,
    private generalService: GeneralService,
  ) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
    this.school = new School();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // content header
    this.contentHeader = {
      headerTitle: 'Results',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Dashboard',
            isLink: true,
            link: '/dashboard/school'
          },
          {
            name: 'List',
            isLink: true,
            link: '/apps/result/list'
          },
          {
            name: `Preview Result`,
            // name: `Teachers ID: ${id}`,
            isLink: false
          }
        ]
      }
    };

    this._resultPreviewService.onInvoicPreviewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.apiData = response;
    });
    Swal.showLoading();
    this.schoolService.getSchoolInfor().subscribe(
        ({ data }) => {
        this.school = data.attributes;
        this.schoolLogo = this.basePath + this.school.logo.data.attributes.url;
        },
        err => {
          console.log(err);
        }
      );

      this.generalService.getAllGrades().subscribe(
        ({ data }) => {
          this.grades = data;
        },
        err => {
          console.log(err);
        }
      );

      Swal.close();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  goBack() {
    window.history.back();
  }

  exportAsPDF() {
    Swal.showLoading();
    let data = this.pdfTable.nativeElement; //document.getElementById('divId'); 
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
      let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      let fileWidth = pdf.internal.pageSize.getWidth();
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, fileWidth, fileHeight);
      // pdf.addImage(contentDataURL, 'PNG', 0, 0, fileWidth, fileHeight);
      // const filename = this.awardLetter.contract_title + '.pdf'; 
      const filename = "result" + '.pdf'; 

      setTimeout(function(){
        pdf.save(filename);
      }, 1000);
      Swal.close();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'File Generated successfully, Please Check your Download Folder',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      });
    });
  }
}
