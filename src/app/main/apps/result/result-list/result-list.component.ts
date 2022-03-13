import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, Input } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { CoreConfigService } from '@core/services/config.service';
import { ResultListService } from './result-list.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultListComponent implements OnInit, OnDestroy {
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

  @Input("loadHeader") loadHeader : boolean = true;

  public contentHeader: object;

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

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {CalendarService} _calendarService
   * @param {ResultListService} _resultListService
   */
  constructor(private _resultListService: ResultListService, private _coreConfigService: CoreConfigService) {
    this._unsubscribeAll = new Subject();
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
    // Subscribe config change
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
      if (config.layout.animation === 'zoomIn') {
        setTimeout(() => {
          this._resultListService.onResultListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.data = response;
            this.rows = this.data;
            this.tempData = this.rows;
            this.tempFilterData = this.rows;
          });
        }, 450);
      } else {
        this._resultListService.onResultListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
          this.data = response;
          this.rows = this.data;
          this.tempData = this.rows;
          this.tempFilterData = this.rows;
        });
      }
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Result',
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
            name: 'Result List',
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
