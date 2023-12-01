export interface Data {
  name: string;
  age: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  image: string;
  acceptTerms: boolean | undefined;
}

export interface DataControlled {
  name: string;
  age: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  image: File[];
  acceptTerms: boolean;
}
