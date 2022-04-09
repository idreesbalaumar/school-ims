import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StudentViewService } from 'app/main/apps/student/student-view/student-view.service';
// import { Student } from '@fake-db/students.data';
import { StudentListService } from '../student-list/student-list.service';
import Swal from 'sweetalert2';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CoreConfigService } from '@core/services/config.service';
import { ResultListService } from '../../result/result-list/result-list.service';
import { StudentService } from '../student.service';
import { Student, Subject, SubjectAttributes, SubjectData } from '../student.model';
import { environment } from 'environments/environment';
// import { id } from '@fake-db/students.data';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentViewComponent implements OnInit, OnDestroy {
  // public
  public data: any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public selectTerm: any = [
    { name: 'All', value: '' },
    { name: '1st', value: '1st' },
    { name: '2nd', value: '2nd' },
    { name: '3rd', value: '3rd' }
  ];

  public selectedTerm = [];
  public searchValue = '';

  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // private
  private tempData = [];
  // private _unsubscribeAll: Subject<any>;
  public rows;
  public tempFilterData;
  public previousTermFilter = '';

  subjects: SubjectData[] = [];
  students: Student[] = [];
  student: Student;
  apiModel: Student;

  studentPhoto = 'assets/images/noimage.gif';


  // public
  public url = this.router.url;
  public lastValue;
  // public data;
  public id;
  // data = [];
  stuId: any;

  obj = {
    id: null,
    first_name: null,
    surname: null,
    other_name: null,
    state_of_origin_id: null,
    lga_id: null,
    gender: null,
    classs_name: null,
    classs: null,
    house: null,
    house_name: null,
    parent_first_name: null,
    parent_surname: null,
    parent_other_name: null,
    parent_gender: null,
    parent_address: null,
    parent_phone: null,
    parent_alt_phone: null,
    parent_email: null,
    status: null,
    avatar: null
  };


  public contentHeader: object;
  basePath = environment.apiUrl;



  /**
   * Constructor
   *
   * @param {Router} router
   * @param {StudentViewService} _studentViewService
   * @param {CoreConfigService} _coreConfigService
   * @param {CalendarService} _calendarService
   * @param {ResultListService} _resultListService
   */
  constructor(private router: Router,
    private _studentViewService: StudentViewService,
    private route: ActivatedRoute,
    private _studentsListServe: StudentListService,
    private _resultListService: ResultListService,
    private _coreConfigService: CoreConfigService,
    private studentService: StudentService,
  ) {
    // this._unsubscribeAll = new Subject();
    // get empId from url
    this.stuId = this.route.snapshot.params.id;
    this.apiModel = new Student();
    this.loadItem = this.loadItem.bind(this);
    // this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  loadItem(id) {
    // this.obj = this.data.find(item => item.id === id.row.data.id);
    let student = this.students.find(
      item => item.id === id.row.data.id
    );
    Object.assign(this.apiModel, student);
  }

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

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedTerm = this.selectTerm[0];

    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.form_master.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByTerm(event) {
    const filter = event ? event.value : '';
    this.previousTermFilter = filter;
    this.tempFilterData = this.filterRows(filter);
    this.rows = this.tempFilterData;
  }

  /**
   * Filter Rows
   *
   * @param statusFilter
   */
  filterRows(statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    statusFilter = statusFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialNameMatch = row.resultTerm.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch;
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // get user info by id
    // this._studentsListServe.getDataTableRows().subscribe(
    //   ({ data }) => this.students = data,
    // );
    // this.studentService.getAll().subscribe(
    //   ({ data }) => this.students = data,
    //   err => {
    //     console.log(err);
    //   }
    // );

    Swal.showLoading();

    // this.studentService.getAll().subscribe(
    //   ({ data }) => {
    //     this.students = data;
    //     this.students = this.students.map(student => {
    //       return { ...student, url: this.basePath + student.attributes.photo.data.attributes.url }
    //     });
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );

    // this._studentViewService.onStudentViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.data = response;
    // });

    this.route.params.subscribe(params => {
      if (params.id) {
        this.studentService.get(params.id)
          .subscribe(response => {
            this.student = response.data;
            this.subjects = response.data.attributes.subjects.data.map((entry) => {
              return entry;
            });
            this.studentPhoto = this.basePath + this.student.attributes.photo.data.attributes.url;
          }, error => {
            console.log(error);

            Swal.fire({
              icon: 'error',
              title: 'Error!!',
              text: error,
              customClass: {
                confirmButton: 'btn btn-danger'
              }
            });
          });
      }
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
            name: 'Students List',
            isLink: true,
            link: '/apps/student/student-list'
          },
          {
            name: `Student Details`,
            // name: `Students ID: ${id}`,
            isLink: false
          }
        ]
      }
    };
    Swal.close();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    // this._unsubscribeAll.next();
    // this._unsubscribeAll.complete();
  }
}
