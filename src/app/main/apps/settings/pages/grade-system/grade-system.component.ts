import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'app/main/apps/general.service';
import Swal from 'sweetalert2';
import { GradeData, GradePostModel } from './grade.model';

@Component({
  selector: 'app-grade-system',
  templateUrl: './grade-system.component.html',
  styleUrls: ['./grade-system.component.scss']
})
export class GradeSystemComponent implements OnInit {
  @ViewChild('form') form: NgForm;


  grades: GradeData[] = [];
  apiModel: GradePostModel;
  // apiPostModel: GradePostModel;
  grade: any;
  grade_id: number;

  public contentHeader: object;
  displayForm = false;
  operation = 'Add';
  title = 'Grade';

  constructor(
    private generalService: GeneralService,
  ) {
    this.apiModel = new GradePostModel();
    this.loadItem = this.loadItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  loadItem(id) {
    let grades = this.grades.find(
      item => item.id === id.row.data.id
    );
    Object.assign(this.apiModel, grades);
    this.apiModel.GradeID = grades.id;
    this.apiModel.name = grades.attributes.name;
    this.apiModel.upper = grades.attributes.upper;
    this.apiModel.lower = grades.attributes.lower;
    this.operation = 'Update';
    this.showForm();
  }

  updateList(id, updatedGrade) {
    this.grades = this.grades.filter(e => e.id !== id);
    this.grades.push(updatedGrade);
    this.grades.sort(function (a, b) {
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
        this.generalService.deleteGrade(id.row.data.id).subscribe(
          _ => {
            this.grades = this.grades.filter(
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
        ? this.generalService.updateGrade(this.apiModel)
        : this.generalService.addGrade(this.apiModel);
    httpCall.subscribe(
      success => {
        Swal.close();
        this.updateList(this.apiModel.GradeID, success.data);
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
      headerTitle: 'Grade System',
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
            name: `Manage Grades`,
            // name: `Teachers ID: ${id}`,
            isLink: false
          }
        ]
      }
    };

    this.generalService.getAllGrades().subscribe(
      ({ data }) => {
        this.grades = data;
      },
      err => {
        console.log(err);
      }
    );

  }

}
