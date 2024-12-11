import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})

export class NavComponent implements OnInit {

  constructor(
    public accountService: AccountService,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.accountService.logout();
  }
}

