import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IResult } from '../../../shared/models/IResult';
import { IUser } from '../../../shared/models/IUser';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  isConfigOpen = false;
  userInfor: IUser | undefined;
  authService = inject(AuthService)
  toggleConfig() {
    this.isConfigOpen = !this.isConfigOpen;
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (response: IResult<IUser>) => {
        this.userInfor = response.value
      },
      error: (eror: any) => { }
    })
  }
}
