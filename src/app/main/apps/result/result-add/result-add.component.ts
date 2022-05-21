import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';
import { ResultAddService } from './result-add.service';
import { School } from '../../school.model';
import { GradeData } from '../../settings/pages/grade-system/grade.model';
import { environment } from 'environments/environment';
import { Student } from '../../student/student.model';
import { StudentService } from '../../student/student.service';

@Component({
  selector: 'app-result-add',
  templateUrl: './result-add.component.html',
  styleUrls: ['./result-add.component.scss'],
  animations: [repeaterAnimation],
  encapsulation: ViewEncapsulation.None
})
export class ResultAddComponent implements OnInit, OnDestroy {
  // public
  public apiData;
  public sidebarToggleRef = false;
  public resultSelect;
  public resultSelected;
  public studentSelected;

  public contentHeader: object;

  school: School;
  students: Student[] = [];
  apiModel: Student;
  state: any;
  schoolLogo = 'assets/images/noimage.gif';
  basePath = environment.apiUrl;

  public paymentDetails = {
    totalDue: '$12,110.55',
    bankName: 'American Bank',
    country: 'United States',
    iban: 'ETD95476213874685',
    swiftCode: 'BR91905'
  };

  public items = [{ itemId: '', itemName: '', itemQuantity: '', itemCost: '' }];

  public item = {
    itemName: '',
    itemQuantity: '',
    itemCost: ''
  };

  // ng2-flatpickr options
  public dateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input result-edit-input',
    defaultDate: ['2020-05-01'],
    altFormat: 'Y-n-j'
  };
  public dueDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input result-edit-input',
    defaultDate: ['2020-05-17'],
    altFormat: 'Y-n-j'
  };

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ResultAddService} _resultAddService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _resultAddService: ResultAddService,
    private _coreSidebarService: CoreSidebarService,
    private readonly studentService: StudentService,
    ) {
    this._unsubscribeAll = new Subject();
    this.apiModel = new Student();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Item
   */
  addItem() {
    this.items.push({
      itemId: '',
      itemName: '',
      itemQuantity: '',
      itemCost: ''
    });
  }

  /**
   * DeleteItem
   *
   * @param id
   */
  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Toggle Sidebar
   *
   * @param name
   */
  toggleSidebar(name) {
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
            name: `Create Result`,
            // name: `Teachers ID: ${id}`,
            isLink: false
          }
        ]
      }
    }

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

    this._resultAddService.onInvoicAddChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      let responseData = response;
      this.apiData = responseData.slice(5, 10);
    });
    this.resultSelect = this.apiData;
    this.resultSelected = this.resultSelect;
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
