import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'app/main/apps/general.service';
import { AlertService } from 'app/services/alert.service';
// import { DummyData } from 'app/services/dummy-data.service';
import Swal from 'sweetalert2';
import { Subject, SubjectData, SubjectPostModel } from './subject.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubjectComponent implements OnInit {
  @ViewChild('form') form: NgForm;


  subjects: SubjectData[] = [];
  apiModel: SubjectPostModel;
  // apiPostModel: SubjectPostModel;
  subject: any;
  subject_id: number;

  public contentHeader: object;
  displayForm = false;
  operation = 'Add';
  title = 'Subject';
  DummyData: any;
  dataRecord: any;

  constructor(
    private alert: AlertService,
    private generalService: GeneralService,
  ) {
    this.apiModel = new SubjectPostModel();
    this.loadItem = this.loadItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  loadItem(id) {
    let subjects = this.subjects.find(
      item => item.id === id.row.data.id
    );
    Object.assign(this.apiModel, subjects);
    this.apiModel.SubjectID = subjects.id;
    this.apiModel.name = subjects.attributes.name;
    this.operation = 'Update';
    this.showForm();
  }

  updateList(id, updatedSubject) {
    this.subjects = this.subjects.filter(e => e.id !== id);
    this.subjects.push(updatedSubject);
    this.subjects.sort(function (a, b) {
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
        this.generalService.deleteSubject(id.row.data.id).subscribe(
          _ => {
            this.subjects = this.subjects.filter(
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

  save() {
    Swal.showLoading();
    let httpCall =
      this.operation === 'Update'
        ? this.generalService.updateSubject(this.apiModel)
        : this.generalService.addSubject(this.apiModel);
    httpCall.subscribe(
      success => {
        Swal.close();
        this.updateList(this.apiModel.SubjectID, success.data);
        // this.alert.success('Operation successful.');
        // this.toastr.success('Operation successful.');
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

  resetForm() {
    this.form?.reset();
    this.operation = "Add";
  }

  ngOnInit(): void {

    // content header
    this.contentHeader = {
      headerTitle: 'Subjects',
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
            name: `Manage Subjects`,
            // name: `Teachers ID: ${id}`,
            isLink: false
          }
        ]
      }
    };

    this.generalService.getAllSubjects().subscribe(
      ({ data }) => {
        this.subjects = data;
      },
      err => {
        console.log(err);
      }
    );

    this.DummyData.getSubjects().subscribe(
      res => {
        this.dataRecord = res.data;
      },
      err => {
        console.log(err);
      }
    );

  }

}
