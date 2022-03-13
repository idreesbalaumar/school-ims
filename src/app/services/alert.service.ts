import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }
  private SUCCESS = 'Success';
    private ERROR = 'Error';
    private INFO = 'Information';
    private WARNING = 'Warning';
    info(message: string) {
      this.toastr.info(message);
  }

  success(message: string) {
      this.toastr.success(message);
  }

  error(message: string) {
      this.toastr.error(message);
  }

  warning(message: string) {
      this.toastr.warning(message);
  }

  notify(title: string, message: string) {
    this.toastr.info(message, title, {
      positionClass: 'toast-bottom-right',
    });
  }

  showLoading() {
      Swal.showLoading();
  }

  hideLoading() {
      Swal.close();
  }

  /* confirm(message:string, callback: () => any)
{
  alertify.confirm('Confirm Request', message, function(){ alertify.success('Ok');}
              , function(){ alertify.error('Cancel');});
}

alert(message:string)
{
  alertify.alert('Payarya Alert', message);

}

success(message:string)
{
  alertify.success(message);
}

error(message:string)
{
  alertify.error(message);
}

warning(message:string)
{
  alertify.warning(message);
}

message(message:string)
{
  alertify.message(message);
}

notify(message:string)
{
  alertify.notify(message, 'success', 5, function(){  console.log('dismissed'); });
}

prompt(message:string)
{
  alertify.prompt( 'Prompt Title', 'Prompt Message', 'Prompt Value'
             , function(evt, value) { alertify.success('You entered: ' + value);}
             , function() { alertify.error('Cancel');});
} */
}
