import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {

  constructor(
    public accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['/home']);
  }
}
