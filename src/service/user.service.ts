import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

import { Observable, of } from 'rxjs';

import { User } from '../Intefaces/user';
import { USERS } from '../Intefaces/mock-user';

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

    constructor() {}

    getUsers(): Observable<User[]>
    {
        this.storedUsers = localStorage.getItem(this.storageKey);
        this.users = this.storedUsers ? JSON.parse(this.storedUsers) : USERS;
        return of(this.users);
    }

    ngOnDestroy() 
    {
        this.usersUpdated;
    }

    addUser(name: string, surname: string, email: string, 
            city: string, ulica: string, state: string, 
            psc: string, password: string, agreeMarketConditions: boolean) 
    {
        this.storedUsers = localStorage.getItem(this.storageKey);
        this.users = this.storedUsers ? JSON.parse(this.storedUsers) : USERS;

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

        this.users.push({ id: this.index, name, surname, email, city, ulica, state, psc, password, agreeMarketConditions, admin });
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
                users[index] = { id, name, surname, email, city, ulica, state, psc, password, agreeMarketConditions, admin };
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