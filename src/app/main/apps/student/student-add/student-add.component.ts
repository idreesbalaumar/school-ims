import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { DataService } from 'app/main/forms/form-elements/select/data.service';

import Stepper from 'bs-stepper';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';
import { GeneralService } from '../../general.service';
import { Class, ClassCategory, ClassRoom, Gender, House, LGA, Parent, State, Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudentAddComponent implements OnInit {

  operation = 'Add';

  students: Student[];
  apiModel: Student;
  genders: Gender[] = [];
  gender: any;
  gender_id: number;
  states: State[] = [];
  state: any;
  state_id: number;
  lgas: LGA[] = [];
  lga: any;
  lga_id: number;
  classcategorys: ClassCategory[] = [];
  classcategory: any;
  classcategory_id: number;
  classs: Class[] = [];
  class: any;
  class_id: number;
  classrooms: ClassRoom[] = [];
  classroom: any;
  classroom_id: number;
  houses: House[] = [];
  house: any;
  house_id: number;
  parents: Parent[] = [];
  parent: any;
  parent_id: number;
  // filteredLga: LGA[] = [];
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
  
  

  public selectArtOrScience = [{ name: 'Art' }, { name: 'Science' }];
  public selectArtOrScienceSelected;

  public selectMultiLimitedSelected = [{ name: 'Karyn Wright' }];


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
      // this.apiModel.attributes.gender = this.genders.find((gen) => gen.data.id == this.apiModel.attributes.gender.data.id);
      // this.apiModel.attributes.state = this.states.find((gen) => gen.data.id == this.apiModel.attributes.state.data.id);
      this.horizontalWizardStepper.next();
    }
  }
  horizontalWizardStepperSubmit(data) {
    if (data.form.valid === true) {
      // this.apiModel.attributes.gender = this.genders.find((gen) => gen.data.id == this.apiModel.attributes.gender.data.id);
      // this.apiModel.attributes.state = this.states.find((gen) => gen.data.id == this.apiModel.attributes.state.data.id);
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
      windowClass: 'modal',centered: true
    });
  }

  constructor(
    private generalService: GeneralService,
    private dataService: DataService,
    private modalService: NgbModal,
    private studentService: StudentService,
  ) { }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init
   */
  ngOnInit() {

    this.generalService.getAllGenders().subscribe(
      ({ data }) => {
        this.genders = data;
      },
      err => {
        console.log(err);
      }
    );

    this.generalService.getAllStates().subscribe(
      ({ data }) => {
        this.states = data;
      },
      err => {
        console.log(err);
      }
    );

    this.generalService.getAllLGA().subscribe(
      ({ data }) => {
        this.lgas = data;
      },
      err => {
        console.log(err);
      }
    );

    this.generalService.getAllClassCategories().subscribe(
      ({ data }) => {
        this.classcategorys = data;
      },
      err => {
        console.log(err);
      }
    );

    this.generalService.getAllClass().subscribe(
      ({ data }) => {
        this.classs = data;
      },
      err => {
        console.log(err);
      }
    );

    this.generalService.getAllClassRooms().subscribe(
      ({ data }) => {
        this.classrooms = data;
      },
      err => {
        console.log(err);
      }
    );

    this.generalService.getAllHouses().subscribe(
      ({ data }) => {
        this.houses = data;
      },
      err => {
        console.log(err);
      }
    );

    this.generalService.getAllParent().subscribe(
      ({ data }) => {
        this.parents = data;
      },
      err => {
        console.log(err);
      }
    );

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

  processForm() {
    this.save();
  }

  save() {
    Swal.showLoading();
    let httpCall =
      this.operation === 'Update'
        ? this.studentService.update(this.apiModel)
        : this.studentService.add(this.apiModel);
    httpCall.subscribe(
      success => {
        Swal.close();
        console.log("Success Response: ", success.data)
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Operation successful',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
        this.resetForm();
        this.horizontalWizardStepper.next();
      },
      error => {
        Swal.close();
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error!!',
          text: error,
          customClass: {
            confirmButton: 'btn btn-danger'
          }
        });
      }
    );
  }

  resetForm(): void {
    this.apiModel = new Student();
  }

  // loadLGA() {
  //   this.generalService.filteredLga = this.generalService.lga.filter(d => d.state?.id == this.students.);
  // }

}
