import { Injectable } from '@angular/core';
import { User } from '../Intefaces/user';

@Injectable({
    providedIn: 'root',
  })
  export class UserStateService 
  {
    actualUser: User | null = null;
    userActiveState: boolean = false;
    
    setActualUser(user: User) 
    {
        this.actualUser = user;
        this.userActiveState = !this.userActiveState;
        localStorage.setItem('actualUser', JSON.stringify(user));
    }

    getActualUser(): User | null 
    {
        const storedUser = localStorage.getItem('actualUser');
        if (storedUser) 
        {
            this.actualUser = JSON.parse(storedUser);
        }
        return this.actualUser;
    }

    removeActualUser() 
    {
        this.actualUser = null;
        this.userActiveState = !this.userActiveState;
        localStorage.removeItem('actualUser');
      }
        
  }