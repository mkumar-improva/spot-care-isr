export type Validator = {
    email:string;
    password:string;
    phone:string;
    firstName?: string;
    lastName?: string;
    confirmPassword?: string;
    fullName?: string;
    message?: string;
    username?: string;
    name?: string;
    siteKey?: string;
    description?: string;
}

export type ValidationRule = {
  validate: (value: string) => boolean;
  message: string;
}