import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit, OnDestroy {

    private subscriber: any;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.subscriber = this.route.params.subscribe(params => {
            console.log(params['key']);
        });
    }




    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

}
