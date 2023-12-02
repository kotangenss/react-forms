export interface Data {
  name: string;
  age: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  image: string | null;
  acceptTerms: boolean | undefined;
}

export interface FormError {
  name: string;
  age: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  image: string;
  acceptTerms: string;
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
