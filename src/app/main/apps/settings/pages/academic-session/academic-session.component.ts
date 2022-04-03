import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'app/main/apps/general.service';
import { Status } from 'app/models/common.model';
import Swal from 'sweetalert2';
import { AcademicSessionData, AcademicSessionPostModel, NewSessionPostModel } from './academic-session.model';

@Component({
  selector: 'app-academic-session',
  templateUrl: './academic-session.component.html',
  styleUrls: ['./academic-session.component.scss']
})
export class AcademicSessionComponent implements OnInit {
  @ViewChild('form') form: NgForm;


  academicSessions: AcademicSessionData[] = [];
  apiModel: AcademicSessionPostModel;
  apiModelNewSession: NewSessionPostModel;

  // statuses : Status[] = [];

  statuses = [
    { value: true, label: "True" },
    { value: false, label: "False" },
  ]

  public contentHeader: object;
  displayForm = false;
  operation = 'Add';
  title = 'Academic Session';

  constructor(
    private generalService: GeneralService,
  ) {
    this.apiModelNewSession = new NewSessionPostModel();
    this.apiModel = new AcademicSessionPostModel();
    this.loadItem = this.loadItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  loadItem(id) {
    let room = this.academicSessions.find(
      element => element.id === id.row.data.id
    );
    // console.log("API Model", this.apiModel);
    // console.log("ClassRomm Model", room);
    // Object.assign(this.apiModel, academicSession);
    this.apiModel.AcademicSessionID = room.id;
    this.apiModel.name = room.attributes.name;
    this.apiModel.from = room.attributes.from;
    this.apiModel.to = room.attributes.to;
    this.apiModel.is_active = room.attributes.is_active;
    this.operation = 'Update';
    this.showForm();
  }

  updateList(id, updatedAcademicSession) {
    this.academicSessions = this.academicSessions.filter(e => e.id !== id);
    this.academicSessions.push(updatedAcademicSession);
    this.academicSessions.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  deleteItem(id) {
    Swal.fire({
      title: 'Delete',
      text: "Are you sure you want to delete this record?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then(result => {
      if (result.value) {
        this.generalService.deleteAcademicSession(id.row.data.id).subscribe(
          _ => {
            this.academicSessions = this.academicSessions.filter(
              e => e.id !== id.row.data.id
            );
            // this.alert.success('Record deleted');
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your record has been deleted.',
              customClass: {
                confirmButton: 'btn btn-success'
              }
            });
          },
          error => {
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  saveNewSession() {
    Swal.showLoading();
    let httpCall = this.generalService.createNewSession(this.apiModelNewSession);
    this.generalService.getAllAcademicSessions().subscribe(
      ({ data }) => {
        this.academicSessions = data;
      },
      err => {
        console.log(err);
      }
    );
    // httpCall.subscribe(
    //   success => {
    //     Swal.close();
    //     this.updateList(success.data.id, success.data);
    //     console.log("Success Response: ", success.data);
    //     // this.alert.success('Operation successful.');
    //     // this.toastr.success('Operation successful.');
    //     Swal.fire({
    //       icon: 'success',
    //       title: 'Success!',
    //       text: 'Operation successful',
    //       customClass: {
    //         confirmButton: 'btn btn-success'
    //       }
    //     });
    //     this.resetForm();
    //   },
    //   error => {
    //     Swal.close();
    //     console.log(error);
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error!!',
    //       text: error,
    //       customClass: {
    //         confirmButton: 'btn btn-danger'
    //       }
    //     });
    //   }
    // );
  }

  save() {
    Swal.showLoading();
    let httpCall =
      this.operation === 'Update'
        ? this.generalService.updateAcademicSession(this.apiModel)
        : this.generalService.addAcademicSession(this.apiModel);
    httpCall.subscribe(
      success => {
        Swal.close();
        this.updateList(success.data.id, success.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Operation successful',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
        this.resetForm();
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

  showForm() {
    this.displayForm = true;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  hideForm() {
    this.displayForm = false;
    this.form?.reset();
  }

  addItem() {
    this.resetForm();
    this.showForm();
  }

  processForm() {
    this.save();
  }

  processNewSession() {
    this.saveNewSession();
  }

  resetForm() {
    this.form?.reset();
    this.operation = "Add";
  }

  ngOnInit(): void {

    // content header
    this.contentHeader = {
      headerTitle: 'Academic Sessions',
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
            name: `Manage Academic Sessions`,
            // name: `Teachers ID: ${id}`,
            isLink: false
          }
        ]
      }
    };

    this.generalService.getAllAcademicSessions().subscribe(
      ({ data }) => {
        this.academicSessions = data;
      },
      err => {
        console.log(err);
      }
    );

  }

}
