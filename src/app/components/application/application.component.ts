import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'application',
  templateUrl: './application.component.html'
})
export class ApplicationComponent implements OnInit, OnDestroy {


  constructor(private authService: AuthService) {
      console.log('ApplicationComponent');
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
      this.authService.signOut();
  }

}
