import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StudentViewService } from 'app/main/apps/student/student-view/student-view.service';
import { Student } from '@fake-db/students.data';
import { StudentListService } from '../student-list/student-list.service';
// import { id } from '@fake-db/students.data';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentViewComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;
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

  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {StudentViewService} _studentViewService
   */
  constructor(private router: Router, private _studentViewService: StudentViewService, private route: ActivatedRoute, private _studentsListServe: StudentListService) {
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
