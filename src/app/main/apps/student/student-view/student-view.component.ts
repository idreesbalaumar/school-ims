import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StudentViewService } from 'app/main/apps/student/student-view/student-view.service';
import { Student } from '@fake-db/students.data';
import { StudentListService } from '../student-list/student-list.service';
import Swal from 'sweetalert2';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CoreConfigService } from '@core/services/config.service';
import { ResultListService } from '../../result/result-list/result-list.service';
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
  private _unsubscribeAll: Subject<any>;
  public rows;
  public tempFilterData;
  public previousTermFilter = '';

  
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

  students: Student[];

  public contentHeader: object;

  

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {StudentViewService} _studentViewService
   * @param {CoreConfigService} _coreConfigService
   * @param {CalendarService} _calendarService
   * @param {ResultListService} _resultListService
   */
  constructor(private router: Router, private _studentViewService: StudentViewService, private route: ActivatedRoute, private _studentsListServe: StudentListService,private _resultListService: ResultListService, private _coreConfigService: CoreConfigService) {
    this._unsubscribeAll = new Subject();
    // get empId from url
    this.stuId = this.route.snapshot.params.id;
    console.log(this.students);
    this.loadItem = this.loadItem.bind(this);
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  loadItem(id) {
    this.obj = this.data.find(item => item.id === id.row.data.id);
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
    this._studentViewService.onStudentViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.data = response;
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
