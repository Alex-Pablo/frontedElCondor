export interface IEnterprise{
    id: 1;
    name: string;
    phoneNumber: string;
    email: string;
    address: string;
    logo: string;
}

export interface ApiResponse<T> {
    error: string | null;
    isSuccess: boolean;
    value: T;
}