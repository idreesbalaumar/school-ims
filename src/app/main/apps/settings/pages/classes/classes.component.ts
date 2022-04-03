import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'app/main/apps/general.service';
import { TeacherData } from 'app/main/apps/teacher/teacher.model';
import Swal from 'sweetalert2';
import { ClassData, ClassRoomData, ClassRoomPostModel } from './class-room.model';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  @ViewChild('form') form: NgForm;


  classRooms: ClassRoomData[] = [];
  apiModel: ClassRoomPostModel;

  formMasters: TeacherData[] = [];
  formMaster: any;
  formMaster_id: number;

  classes: ClassData[] = [];
  classs: any;
  classs_id: number;

  public contentHeader: object;
  displayForm = false;
  operation = 'Add';
  title = 'Class Room';

  constructor(
    private generalService: GeneralService,
  ) {
    this.apiModel = new ClassRoomPostModel();
    this.loadItem = this.loadItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  loadItem(id) {
    let room = this.classRooms.find(
      element => element.id === id.row.data.id
    );
    // Object.assign(this.apiModel, classRoom);
    this.apiModel.ClassRoomID = room.id;
    this.apiModel.name = room.attributes.name;
    this.apiModel.class.id = room.attributes.class.data.id;
    this.apiModel.form_master.id = room.attributes.form_master.data.id;
    this.operation = 'Update';
    this.showForm();
  }

  updateList(id, updatedClassRoom) {
    this.classRooms = this.classRooms.filter(e => e.id !== id);
    this.classRooms.push(updatedClassRoom);
    this.classRooms.sort(function (a, b) {
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
        this.generalService.deleteClassRoom(id.row.data.id).subscribe(
          _ => {
            this.classRooms = this.classRooms.filter(
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
        ? this.generalService.updateClassRoom(this.apiModel)
        : this.generalService.addClassRoom(this.apiModel);
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

  resetForm() {
    this.form?.reset();
    this.operation = "Add";
  }

  ngOnInit(): void {

    // content header
    this.contentHeader = {
      headerTitle: 'Class Rooms',
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
            name: `Manage Class Rooms`,
            // name: `Teachers ID: ${id}`,
            isLink: false
          }
        ]
      }
    };

    this.generalService.getAllClassRooms().subscribe(
      ({ data }) => {
        this.classRooms = data;
      },
      err => {
        console.log(err);
      }
    );

    this.generalService.getAllClass().subscribe(
      ({ data }) => {
        this.classes = data;
      },
      err => {
        console.log(err);
      }
    );

    this.generalService.getAllTeachers().subscribe(
      ({ data }) => {
        this.formMasters = data;
      },
      err => {
        console.log(err);
      }
    );

  }

}