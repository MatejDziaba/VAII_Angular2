import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { User } from '../Intefaces/user';
import { USERS } from '../Intefaces/mock-user';
import axios from 'axios';

@Injectable({
    providedIn: 'root',
  })
  export class UserService 
  {
    private storageKey = 'users';
    usersUpdated = new EventEmitter<User[]>();

    user: User | undefined;

    storedUsers = localStorage.getItem(this.storageKey);
    users = this.storedUsers ? JSON.parse(this.storedUsers) : USERS;
    index = this.users.length + 1;

    userInformationHeader: string = "";
    userInformationResult: string = "";
    isUser: boolean = true;

    constructor(private http: HttpClient) {}

    // getUsers(): User[]
    // {
    //     this.storedUsers = localStorage.getItem(this.storageKey);
    //     this.users = this.storedUsers ? JSON.parse(this.storedUsers) : USERS;
    //     return this.users;
    // }

    getUsers(): Observable<User[]>
    {
        this.storedUsers = localStorage.getItem(this.storageKey);
        this.users = this.storedUsers ? JSON.parse(this.storedUsers) : USERS;
        return this.http.get<User[]>("http://localhost:3008/users");
    }

    ngOnDestroy() 
    {
        this.usersUpdated;
    }

    setUserInformationResult(info: string) 
    {
        this.userInformationResult = info;
    }

    setUserInformationHeader(info: string) 
    {
        this.userInformationHeader = info;
    }

    getUserInformationResult(): string
    {
        return this.userInformationResult;
    }

    getUserInformationHeader(): string 
    {
        return this.userInformationHeader;
    }

    existUser(): boolean 
    {
        return this.isUser;
    }

    // addUser(name: string, surname: string, email: string, 
    //         city: string, ulica: string, state: string, 
    //         psc: string, password: string, agreeMarketConditions: boolean) 
    // {
    //     this.storedUsers = localStorage.getItem(this.storageKey);
    //     this.users = this.storedUsers ? JSON.parse(this.storedUsers) : USERS;

    //     console.log(this.users.length);

    //     let usersCount = this.users.length;
    //     if (usersCount > 0) 
    //     {
    //         this.index = usersCount + 1;
    //     }

    //     let admin = false;
    //     if (surname == '111' && email == '111' && city == '111' && ulica == '111' && psc == '111') 
    //     {
    //         admin = true;
    //     }

    //     this.users.push({ id: this.index, name, surname, email, city, ulica, state, psc, password, agreeMarketConditions, admin, isActive: false });
    //     localStorage.setItem(this.storageKey, JSON.stringify(this.users));
    //     this.usersUpdated.emit(this.users);
    // }

    addUser(name: string, surname: string, email: string, 
        city: string, ulica: string, state: string, 
        psc: string, password: string, agreeMarketConditions: boolean) 
{
    console.log(this.users.length);
    let usersCount = this.users.length;
    if (usersCount > 0) 
    {
        this.index = usersCount + 1;
    }

    let admin = false;
    if (surname == '111' && email == '111' && city == '111' && ulica == '111' && psc == '111') 
    {
        admin = true;
    }

    axios.post<User>("http://localhost:3008/users/module-add", { name, surname, email, city, ulica, state, psc, password, agreeMarketConditions, admin, isActive: false })
      .then(response => {
        console.log(response.data); 
      })
      .catch(error => {
        if (error.response && error.response.status === 400) 
        {
            console.log('Dany uzivatel existuje!');
            this.setUserInformationHeader("Registracia bola neúspešná!");
            this.setUserInformationResult("Daný užívateľ existuje!");
            this.isUser = false;
        } else 
        {
          const errorMessage = 'Error: Nemôžte byť pridaný ako novy uživateľ.';
          const userAcknowledged = window.confirm(errorMessage);
          console.error(error); 
        }
    });

         localStorage.setItem(this.storageKey, JSON.stringify(this.users));
         this.usersUpdated.emit(this.users);
}

    uploadUser(id: number, name: string, surname: string, email: string, 
        city: string, ulica: string, state: string, 
        psc: string, password: string, agreeMarketConditions: boolean, admin: boolean) 
    {
        this.storedUsers = localStorage.getItem(this.storageKey);
        let users: User[] = this.storedUsers ? JSON.parse(this.storedUsers) : USERS;
        users.forEach((user, index) => {
            if (user.id === id) 
            {
                users[index] = { id, name, surname, email, city, ulica, state, psc, password, agreeMarketConditions, admin, isActive: false };
                localStorage.setItem(this.storageKey, JSON.stringify(users));
                this.usersUpdated.emit(users);
            }
        });
    }
    
    uploadUserState(id: number, name: string, surname: string, email: string, 
        city: string, ulica: string, state: string, 
        psc: string, password: string, agreeMarketConditions: boolean, admin: boolean, isActive: boolean) 
    {
        this.storedUsers = localStorage.getItem(this.storageKey);
        let users: User[] = this.storedUsers ? JSON.parse(this.storedUsers) : USERS;
        users.forEach((user, index) => {
            if (user.id === id) 
            {
                users[index] = { id, name, surname, email, city, ulica, state, psc, password, agreeMarketConditions, admin, isActive };
                localStorage.setItem(this.storageKey, JSON.stringify(users));
                this.usersUpdated.emit(users);
            }
        });
    }
    
    deleteUser(emailUser: string) 
    {
        this.storedUsers = localStorage.getItem(this.storageKey);

        if (this.storedUsers) 
        {
            let users: User[] = JSON.parse(this.storedUsers);
            const index = users.findIndex(user => user.email === emailUser);

            if (index !== -1) 
            {
                users.splice(index, 1);
                localStorage.setItem(this.storageKey, JSON.stringify(users));
                this.usersUpdated.emit(users);
            }
        }
    }

    deleteUser_id(id: number) 
    {
        this.storedUsers = localStorage.getItem(this.storageKey);

        if (this.storedUsers) 
        {
            let users: User[] = JSON.parse(this.storedUsers);
            const index = users.findIndex(user => user.id === id);

            if (index !== -1) 
            {
                users.splice(index, 1);
                localStorage.setItem(this.storageKey, JSON.stringify(users));
                this.usersUpdated.emit(users);
            }
        }
    }
  }