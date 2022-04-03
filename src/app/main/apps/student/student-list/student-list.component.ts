import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { StudentListService } from 'app/main/apps/student/student-list/student-list.service';
import { StudentsFakeData } from '@fake-db/students.data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { BeforeOpenEvent } from '@sweetalert2/ngx-sweetalert2';
import { StudentService } from '../student.service';
import { Student } from '../student.model';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
// import { environment } from 'environments/environment';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentListComponent implements OnInit {
  // Public
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousClassFilter = '';
  public previousGenderFilter = '';
  public previousStatusFilter = '';
  public exportCSVData;

  students: Student[] = [];
  apiModel: Student;
  basePath = environment.apiUrl;

  // students: StudentsFakeData[];

  public contentHeader: object;

  public selectClass: any = [
    { name: 'All', value: '' },
    { name: 'JSS-1', value: 'JSS-1' },
    { name: 'JSS-2', value: 'JSS-2' },
    { name: 'JSS-3', value: 'JSS-3' },
    { name: 'SS-1', value: 'SS-1' },
    { name: 'SS-2', value: 'SS-2' },
    { name: 'SS-3', value: 'SS-3' }
  ];

  public selectGender: any = [
    { name: 'All', value: '' },
    { name: 'Male', value: 'Male' },
    { name: 'Female', value: 'Female' }
  ];

  public selectStatus: any = [
    { name: 'All', value: '' },
    // { name: 'Pending', value: 'Pending' },
    { name: 'Active', value: 'Active' },
    { name: 'Inactive', value: 'Inactive' }
  ];

  public selectedClass = [];
  public selectedGender = [];
  public selectedStatus = [];
  public searchValue = '';

  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  private timerInterval: any;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {StudentListService} _studentListService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private router: Router,
    private readonly studentService: StudentService,
    private _studentListService: StudentListService,
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private modalService: NgbModal
  ) {
    this._unsubscribeAll = new Subject();
    this.loadProfile = this.loadProfile.bind(this);
    this.loadItem = this.loadItem.bind(this);
    this.apiModel = new Student();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */

  loadProfile(event) {
    window.open('/apps/student/student-view/' + event.row.data.id, '_blank')
  }

  loadItem(id) {
    this.router.navigate(['/apps/student/student-view/', id.row.data.id])
  }

  studentAdd() {
    this.router.navigate(['/apps/student/student-add'])
  }

  modalOpenVC(modalVC) {
    this.modalService.open(modalVC, {
      centered: true
    });
  }

  autoCloseBeforeOpen(event: BeforeOpenEvent) {
    Swal.showLoading();

    this.timerInterval = setInterval(function () {
      let timeLeft: HTMLElement = event.modalElement.querySelector('strong');
      timeLeft.textContent = <any>Swal.getTimerLeft();
    }, 100);
  }

  // deleteItem(id) {
  //     swal.fire({
  //         title: 'Delete',
  //         text: 'Are you sure you want to delete this item?',
  //         type: 'warning',
  //         showCancelButton: true,
  //         confirmButtonText: 'Yes',
  //         cancelButtonText: 'No'
  //     }).then(result => {
  //         if (result.value) {
  //             this.appraisalSystemsService.delete(id.row.data.id).subscribe(
  //                 _ => {
  //                     this.appraisalSystems = this.appraisalSystems.filter(
  //                         e => e.id !== id.row.data.id
  //                     );
  //                     this.alert.success('Record deleted');
  //                 },
  //                 error => {
  //                     this.alert.error(
  //                         error
  //                     );
  //                 }
  //             );
  //         } else if (result.dismiss === swal.DismissReason.cancel) {
  //         }
  //     });
  // }

  deleteItem() {
    Swal.fire({
      title: 'Delete',
      text: "Are you sure you want to delete this item?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then(function (result) {
      if (result.value) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Record has been deleted.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
      }
    });
  }

  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedClass = this.selectClass[0];
    this.selectedGender = this.selectGender[0];
    this.selectedStatus = this.selectStatus[0];

    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.first_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Filter By Classes
   *
   * @param event
   */
  filterByClass(event) {
    const filter = event ? event.value : '';
    this.previousClassFilter = filter;
    this.temp = this.filterRows(filter, this.previousGenderFilter, this.previousStatusFilter);
    this.rows = this.temp;
  }

  /**
   * Filter By Gender
   *
   * @param event
   */
  filterByGender(event) {
    const filter = event ? event.value : '';
    this.previousGenderFilter = filter;
    this.temp = this.filterRows(this.previousClassFilter, filter, this.previousStatusFilter);
    this.rows = this.temp;
  }

  /**
   * Filter By Status
   *
   * @param event
   */
  filterByStatus(event) {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.temp = this.filterRows(this.previousClassFilter, this.previousGenderFilter, filter);
    this.rows = this.temp;
  }

  /**
   * Filter Rows
   *
   * @param classFilter
   * @param genderFilter
   * @param statusFilter
   */
  filterRows(classFilter, genderFilter, statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    classFilter = classFilter.toLowerCase();
    genderFilter = genderFilter.toLowerCase();
    statusFilter = statusFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialClassMatch = row.classs.toLowerCase().indexOf(classFilter) !== -1 || !classFilter;
      const isPartialGenderMatch = row.gender.toLowerCase().indexOf(genderFilter) !== -1 || !genderFilter;
      const isPartialStatusMatch = row.status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialClassMatch && isPartialGenderMatch && isPartialStatusMatch && isPartialStatusMatch;
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {

    // console.log(`basePath`+this.apiModel)
    
    this.studentService.getAll().subscribe(
      ({ data }) => {
        this.students = data;
        this.students = this.students.map(student => {
          return { ...student, url: this.basePath+student.attributes.photo.data.attributes.url }
          // return { ...letter, reference_no: `NCDMB/DLS/${letter.reference_no.toUpperCase()}` , contract_sum: `₦${letter.contract_sum}`}
        });
      },
      err => {
        console.log(err);
      }
    );
    // Subscribe config change
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
      if (config.layout.animation === 'zoomIn') {
        setTimeout(() => {
          this._studentListService.onStudentListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.rows = response;
            this.tempData = this.rows;
          });
        }, 450);
      } else {
        this._studentListService.onStudentListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
          this.rows = response;
          this.tempData = this.rows;
          this.exportCSVData = this.rows;
        });

        // content header
        this.contentHeader = {
          headerTitle: 'Students',
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
                name: 'Student List',
                isLink: false
              }
            ]
          }
        };

      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
