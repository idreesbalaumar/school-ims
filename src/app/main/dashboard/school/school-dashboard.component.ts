import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { CoreConfigService } from '@core/services/config.service';
import { CoreTranslationService } from '@core/services/translation.service';

import { User as OldUser } from 'app/auth/models';
import { colors } from 'app/colors.const';
import { AuthenticationService } from 'app/auth/service';
import { DashboardService } from 'app/main/dashboard/dashboard.service';

import { locale as english } from 'app/main/dashboard/i18n/en';
import { locale as french } from 'app/main/dashboard/i18n/fr';
import { locale as german } from 'app/main/dashboard/i18n/de';
import { locale as portuguese } from 'app/main/dashboard/i18n/pt';
import { User } from 'app/models/auth.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Student } from 'app/main/apps/student/student.model';
import { StudentService } from 'app/main/apps/student/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-school-dashboard',
  templateUrl: './school-dashboard.component.html',
  styleUrls: ['./school-dashboard.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class SchoolDashboardComponent implements OnInit {

  students: Student[];
  studentsCount : number = 0;

  public contentHeader: object;
  // Decorator

  // Public
  public data: any;
  public currentUser: User;
  public isAdmin: boolean;
  public isClient: boolean;
  public isMenuToggled = false;

  /**
   * Constructor
   * @param {AuthenticationService} _authenticationService
   * @param {DashboardService} _dashboardService
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreTranslationService} _coreTranslationService
   */
  constructor(
    protected studentService: StudentService,
    private _authenticationService: AuthenticationService,
    private _dashboardService: DashboardService,
    private _coreConfigService: CoreConfigService,
    private _coreTranslationService: CoreTranslationService
  ) {
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.isAdmin = this._authenticationService.isAdmin;
    this.isClient = this._authenticationService.isClient;

    this._coreTranslationService.translate(english, french, german, portuguese);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    Swal.showLoading();

    this.contentHeader = {
      headerTitle: 'Dashboard',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          // {
          //   name: 'Dashboard',
          //   isLink: true,
          //   link: '/contracts'
          // },
          {
            name: `School Dashboard`,
            isLink: false
          }
        ]
      }
    };

    this.studentService.getAll().subscribe(
      ({ data }) => {
        this.students = data;
        this.studentsCount = this.students.length;
      },
      err => {
        console.log(err);
      }
    );

    // get the currentUser details from localStorage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Get the dashboard service data
    this._dashboardService.onApiDataChanged.subscribe(response => {
      this.data = response;
    });
    Swal.close();
  }

  /**
   * After View Init
   */
  ngAfterViewInit() {
    // Subscribe to core config changes
    this._coreConfigService.getConfig().subscribe(config => {
      // If Menu Collapsed Changes
      if (
        (config.layout.menu.collapsed === true || config.layout.menu.collapsed === false) &&
        localStorage.getItem('currentUser')
      ) {
        setTimeout(() => {
          if (this.currentUser.role == 'Admin') {
          }
        }, 500);
      }
    });
  }
}
