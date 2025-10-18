export interface User{
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    permissions: Dozvole[]
}

export interface Login{
    email:string,
    password:string
}
export enum Dozvole{
    Read="read",Create="create",Update="update",Delete="delete"
}