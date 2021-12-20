import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';
import { StudentEditService } from './student-edit.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentEditComponent implements OnInit, OnDestroy {
  // Public
  public contentHeader: object;
  public url = this.router.url;
  public urlLastValue;
  public rows;
  public currentRow;
  obj = {
    dob : null
  }
  public tempRow;
  public avatarImage: string;

  today = new Date();
  day = this.today.getDay();
  month = this.today.getMonth();
  year = this.today.getFullYear();



  @ViewChild('studentDetailsForm') studentDetailsForm: NgForm;
  @ViewChild('acedemicDetailsForm') acedemicDetailsForm: NgForm;

  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };

  public selectMultiLanguages = ['English', 'Spanish', 'French', 'Russian', 'German', 'Arabic', 'Sanskrit'];
  public selectStateOfOrigin = [{ name: 'Abia' }, { name: 'Adamawa' }, { name: 'Anambra' }, { name: 'Kaduna' }, { name: 'Kano' }, { name: 'Edo' }, { name: 'Benue' }];
  public selectLGA = [{ name: 'Abia' }, { name: 'Adamawa' }, { name: 'Anambra' }, { name: 'Kaduna' }, { name: 'Kano' }, { name: 'Edo' }, { name: 'Benue' }];
  public selectMultiLanguagesSelected = [];

  public selectParent = [
    { name: 'Umar Garba' },
    { name: 'Yusuf Shehu' },
    { name: 'Paul Sawaba' },
    { name: 'Peter Ocheni' },
    { name: 'Mike Sike' },
    { name: 'Yusuf Shehu' }
  ];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {StudentEditService} _studentEditService
   * @param {NgbModal} modalService
   */
  constructor(private router: Router, private _studentEditService: StudentEditService, private modalService: NgbModal) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reset Form With Default Values
   */
  resetFormWithDefaultValues() {
    this.studentDetailsForm.resetForm(this.tempRow);
  }

  resetFormWithDefaultValues1() {
    this.acedemicDetailsForm.resetForm(this.tempRow);
  }

  /**
   * Upload Image
   *
   * @param event
   */
  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  modalSelectOpen(modalSelect) {
    this.modalService.open(modalSelect, {
      windowClass: 'modal'
    });
  }  

  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      console.log('Submitted...!');
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._studentEditService.onStudentEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.rows.map(row => {
        if (row.id == this.urlLastValue) {
          this.currentRow = row;
          this.avatarImage = this.currentRow.avatar;
          this.tempRow = cloneDeep(row);
        }
        // console.log(row.date_of_birth);
        this.obj.dob = row.date_of_birth;

      });
    });

    this.contentHeader = {
      headerTitle: 'Students',
      actionButton: false,
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
            name: 'Student Details',
            isLink: true,
            link: `/apps/student/student-view/${this.currentRow.id}`
          },
          {
            name: 'Edit Record',
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
