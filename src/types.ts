interface IRole {
    id: String;
    name: String;
}

export type Role = IRole | null;


interface ILogin {
    login: String;
    password: String;
}

interface IRegister {
    userName: String;
    password: String;
    email: String;
}

export type AuthType = ILogin | IRegister;