export interface User {
  id: number;
  role: UserRole;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email: string;
  phone: string;
  emergency_contact_id: number;
  gender: UserGender;
  alumni: boolean;
  bio: string;
  archived: boolean;
  password?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  WORK_STUDY = 'work_study',
  STUDENT = 'student',
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female',
  NOT_SPECIFIED = 'not_specified',
}
