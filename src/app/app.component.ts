import { Component, OnInit } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToastyService, ToastyConfig]
})
export class AppComponent implements OnInit {

    constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig){
        this.toastyConfig.theme = 'material';
    };

    ngOnInit(): void {
        console.log('throw toast');
        this.addToast();
    }

    addToast() {
        // Just add default Toast with title only
        this.toastyService.default('Hi there');

        let toastOptions: ToastOptions = {
            title: "My title",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default',
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };

        this.toastyService.success(toastOptions);
    }
}
