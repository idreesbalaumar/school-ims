import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneralService } from 'app/main/apps/general.service';
import { Teacher, TeacherData } from 'app/main/apps/teacher/teacher.model';
import Swal from 'sweetalert2';
import { HouseData, HousePostModel } from './house.model';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit {
  @ViewChild('form') form: NgForm;


  houses: HouseData[] = [];
  apiModel: HousePostModel;
  house: any;
  house_id: number;

  houseMasters: TeacherData[] = [];
  houseMaster: any;
  houseMaster_id: number;

  public contentHeader: object;
  displayForm = false;
  operation = 'Add';
  title = 'House';

  constructor(
    private generalService: GeneralService,
  ) {
    this.apiModel = new HousePostModel();
    this.loadItem = this.loadItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  loadItem(id) {
    let houses = this.houses.find(
      item => item.id === id.row.data.id
    );
    Object.assign(this.apiModel, houses);
    this.apiModel.HouseID = houses.id;
    this.apiModel.name = houses.attributes.name;
    this.apiModel.house_master.id = houses.attributes.house_master.data.id;
    this.apiModel.color = houses.attributes.color;
    this.operation = 'Update';
    this.showForm();
  }

  updateList(id, updatedHouse) {
    this.houses = this.houses.filter(e => e.id !== id);
    this.houses.push(updatedHouse);
    this.houses.sort(function (a, b) {
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
        this.generalService.deleteHouse(id.row.data.id).subscribe(
          _ => {
            this.houses = this.houses.filter(
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
        ? this.generalService.updateHouse(this.apiModel)
        : this.generalService.addHouse(this.apiModel);
    httpCall.subscribe(
      success => {
        Swal.close();
        this.updateList(success.data.id, success.data);
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
      headerTitle: 'Houses',
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
            name: `Manage Houses`,
            // name: `Teachers ID: ${id}`,
            isLink: false
          }
        ]
      }
    };

    this.generalService.getAllHouses().subscribe(
      ({ data }) => {
        this.houses = data;
      },
      err => {
        console.log(err);
      }
    );

    this.generalService.getAllTeachers().subscribe(
      ({ data }) => {
        this.houseMasters = data;
        console.log("House Masters!");
        console.log(this.houseMasters);
      },
      err => {
        console.log(err);
      }
    );

  }

}