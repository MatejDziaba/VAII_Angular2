import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { User } from '../../../Intefaces/user';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css'
})
export class UserTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'nieco'];
  dataSource: MatTableDataSource<User> | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private userService: UserService) {
  }

  redirectToAnotherPage() {
    this.router.navigate(['/']);
  }

  ngAfterViewInit() {
    const subscription = this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        users.forEach((user: User) => {
          console.log('signUpUser: ', user.name);
        });
        this.dataSource = new MatTableDataSource<any>(users);
        console.log(this.dataSource);
      },
      error: (error: any) => {
        console.error('Chyba pri získavaní používateľov:', error);
      },
      complete: () => {
        if (this.dataSource) 
        {
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;  // Set up paginator here
          console.log( this.paginator);
          console.log( this.sort);
        } else 
        {
          console.log( "Nie je dataSorce");
        }
      }
    });
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) 
    {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

}
