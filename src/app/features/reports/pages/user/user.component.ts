import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../core/services/reports.service';
import { IUserReportsDto } from '../../../../shared/models/IUserReports';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  constructor(private reportsService: ReportsService) { }
  reportUsers: IUserReportsDto[] | undefined;
  ngOnInit(): void {
    this.reportsService.getUserReports().subscribe((data) => {
      if (data.isSuccess) {
        this.reportUsers = data.value
        console.log(this.reportUsers);
      }
    })
  }
}
