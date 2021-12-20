import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { DataService } from 'app/main/forms/form-elements/select/data.service';

import Stepper from 'bs-stepper';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentAddComponent implements OnInit {
  // public
  public contentHeader: object;
  public StudentPhotoUpload;
  public FirstName;
  public Surname;
  public OtherName;
  public DateOfBirth;
  public MinMaxDPdata: NgbDateStruct;

  public ParentFirstName;
  public ParentSurname;
  public ParentOtherName;

  public twitterVar;
  public facebookVar;
  public googleVar;
  public linkedinVar;
  public landmarkVar;
  public Parentaddress;
  public avatarImage: string;

  today = new Date();
  day = this.today.getDay();
  month = this.today.getMonth();
  year = this.today.getFullYear();

  public selectGender = [{ name: 'Male' }, { name: 'Female' }];
  public selectGenderSelected;

  public selectParentGende = [{ name: 'Male' }, { name: 'Female' }];
  public selectParentGenderSelected;

  public selectStateOfOrigin = [{ name: 'Abia' }, { name: 'Adamawa' }, { name: 'Anambra' }, { name: 'Kaduna' }, { name: 'Kano' }, { name: 'Edo' }, { name: 'Benue' }];
  public selectStateOfOriginSelected;

  public selectLGA = [{ name: 'Abia' }, { name: 'Adamawa' }, { name: 'Anambra' }, { name: 'Kaduna' }, { name: 'Kano' }, { name: 'Edo' }, { name: 'Benue' }];
  public selectLGASelected;

  public selectClasss = [{ name: 'JSS-1A' }, { name: 'JSS-1B' }, { name: 'JSS-1C' }, { name: 'JSS-2A' }, { name: 'JSS-2B' }, { name: 'JSS-2C' }, { name: 'JSS-3A' }, { name: 'JSS-3B' }, { name: 'JSS-3C' }, { name: 'SS-1A' }, { name: 'SS-1B' }, { name: 'SS-1C' }, { name: 'SS-2A' }, { name: 'SS-2B' }, { name: 'SS-2C' }, { name: 'SS-3A' }, { name: 'SS-3B' }, { name: 'SS-3C' }];
  public selectClasssSelected;

  public selectHouse = [{ name: 'Red House' }, { name: 'Green House' }, { name: 'Blue House' }, { name: 'Purple House' }, { name: 'Yellow House' }, { name: 'Pink House' }];
  public selectHouseSelected;

  public selectArtElectiveSubjects = [{ name: 'Literature' }, { name: 'Subject 1' }, { name: 'Subject 2' }, { name: 'Subject 3' }, { name: 'Subject 4' }, { name: 'Subject 5' }];
  public selectArtElectiveSubjectsSelected;

  public selectScienceElectiveSubjects = [{ name: 'Cretive Craft Practice' }, { name: 'Auto Mechanic Work' }, { name: 'Dyeing & Bleaching' }, { name: 'Agricultural Science' }, { name: 'Economics' }, { name: 'Technical Drawing' }, { name: 'Geography' }, { name: 'Further Mathematics' }, { name: 'Physical Education' }, { name: 'Food & Nutrition' }];
  public selectScienceElectiveSubjectsSelected;

  public selectArtOrScience = [{ name: 'Art' }, { name: 'Science' }];
  public selectArtOrScienceSelected;

  public selectMultiLimitedSelected = [{ name: 'Karyn Wright' }];



  public selectParent = [
  { name: 'Umar Garba' },
  { name: 'Yusuf Shehu' },
  { name: 'Paul Sawaba' },
  { name: 'Peter Ocheni' },
  { name: 'Mike Sike' },
  { name: 'Yusuf Shehu' }
];

  // public selectMulti = [{ name: 'English' }, { name: 'French' }, { name: 'Spanish' }];
  public selectMultiSelected;

  public selectMulti: Observable<any[]>;

  // private
  private horizontalWizardStepper: Stepper;
  private verticalWizardStepper: Stepper;
  private modernWizardStepper: Stepper;
  private modernVerticalWizardStepper: Stepper;
  private bsStepper;

/**
 * Horizontal Wizard Stepper Next
 *
 * @param data
 * @param {NgbModal} modalService
 */

 multiLimitedClearModel() {
  this.selectMultiLimitedSelected = [];
}

horizontalWizardStepperNext(data) {
  if (data.form.valid === true) {
    this.horizontalWizardStepper.next();
  }
}
/**
 * Horizontal Wizard Stepper Previous
 */
horizontalWizardStepperPrevious() {
  this.horizontalWizardStepper.previous();
}

/**
 * Vertical Wizard Stepper Next
 */
verticalWizardNext() {
  this.verticalWizardStepper.next();
}
/**
 * Vertical Wizard Stepper Previous
 */
verticalWizardPrevious() {
  this.verticalWizardStepper.previous();
}
/**
 * Modern Horizontal Wizard Stepper Next
 */
modernHorizontalNext() {
  this.modernWizardStepper.next();
}
/**
 * Modern Horizontal Wizard Stepper Previous
 */
modernHorizontalPrevious() {
  this.modernWizardStepper.previous();
}
/**
 * Modern Vertical Wizard Stepper Next
 */
modernVerticalNext() {
  this.modernVerticalWizardStepper.next();
}
/**
 * Modern Vertical Wizard Stepper Previous
 */
modernVerticalPrevious() {
  this.modernVerticalWizardStepper.previous();
}

/**
 * On Submit
 */
onSubmit() {
  alert('Submitted!!');
  return false;
}

uploadImage(event: any) {
  if (event.target.files && event.target.files[0]) {
    let reader = new FileReader();

    reader.onload = (event: any) => {
      this.avatarImage = event.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}

// ng-select in model
modalSelectOpen(modalSelect) {
  this.modalService.open(modalSelect, {
    windowClass: 'modal'
  });
}

constructor(private dataService: DataService, private modalService: NgbModal) { }

// Lifecycle Hooks
// -----------------------------------------------------------------------------------------------------

/**
 * On Init
 */
ngOnInit() {
  this.selectMulti = this.dataService.getArtElectiveSubject()
  this.avatarImage = "assets/images/portrait/small/user-alt-512.png";
  this.horizontalWizardStepper = new Stepper(document.querySelector('#stepper1'), {});

  // this.verticalWizardStepper = new Stepper(document.querySelector('#stepper2'), {
  //   linear: false,
  //   animation: true
  // });

  // this.modernWizardStepper = new Stepper(document.querySelector('#stepper3'), {
  //   linear: false,
  //   animation: true
  // });

  // this.modernVerticalWizardStepper = new Stepper(document.querySelector('#stepper4'), {
  //   linear: false,
  //   animation: true
  // });

  this.bsStepper = document.querySelectorAll('.bs-stepper');

  // content header
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
          name: 'New Record',
          isLink: false
        }
      ]
    }
  };
}
}
