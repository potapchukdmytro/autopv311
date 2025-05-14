export interface Role {
    id: string;
    name: string;
}

export interface RoleState {
    isLoaded: boolean;
    roles: Role[];
}