import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'app/services/alert.service';
// import { DummyData } from 'app/services/dummy-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  // dataSource: DummyData[];
  // apiModel: DummyData;

  public contentHeader: object;
  @ViewChild('form') form: NgForm;
  displayForm = false;
  operation = 'Add';
  title = 'Subject';
  DummyData: any;
  dataRecord: any;

  constructor(
    private alert: AlertService,
  ) { 
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

  save() {
    Swal.showLoading();
    Swal.close();
  }

//   loadItem(id) {
//     let dataRecord = this.dataSource.find(
//         item => item.id === id.row.data.id
//     );
//     this.apiModel.id = dataRecord.id;
//     this.apiModel.name = dataRecord.name;
//     this.apiModel.subject_type = dataRecord.subject_type;
//     this.apiModel.is_compulsory = dataRecord.is_compulsory;
//     this.operation = 'Update';
//     this.showForm();
// }

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

  resetForm() {
    this.form?.reset();
    this.operation = "Add";
  }

  ngOnInit(): void {
    this.DummyData.getSubjects().subscribe(
      res => {
          this.dataRecord = res.data;
      },
      err => {
          console.log(err);
      }
  );
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
  }

}
