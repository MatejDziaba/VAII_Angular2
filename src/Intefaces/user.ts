export interface User 
{
    id: number;
    name: string;
    surname: string;
    email: string;
    city: string;
    ulica: string;
    state: string;
    psc: string;
    password: string;
    agreeMarketConditions: boolean;
    admin: boolean;
}