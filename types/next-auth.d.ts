import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User extends DefaultSession['user'] {
    firstName: string; 
    lastName: string;
    accessToken: string;
    phoneNumber: string;
    idCardNumber: string;
    id: string;
    role: 'USER' | 'ADMIN';
    referralCode: string;
    registrationNumber: string;
    createdAt: Date
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    firstName: string; 
    lastName: string;
    accessToken: string;
    phoneNumber: string;
    idCardNumber: string;
    id: string;
    role: 'USER' | 'ADMIN';
    referralCode: string;
    registrationNumber: string;
    createdAt: Date
  }
}