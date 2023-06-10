// eslint-disable-next-line no-unused-vars
import NextAuth from "next-auth";
// eslint-disable-next-line no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface User {
    name: string;
    sub?: number;
    msg?: string;
    token: string;
    privilege: string;
    id: string;
    accessToken?: string;
    expires: string;
    companies: {
      id: number;
      name: string | null;
      cnpj: string | null;
      cpf: string | null;
      active: boolean | null;
    }[];
    // iat: number
    // exp: number
    // jti: string
  }
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */

  // eslint-disable-next-line no-unused-vars
  interface JWT {
    name: string;
    privilege: string;
    accessToken: string;
    id: string;
    companies: {
      id: number;
      name: string | null;
      cnpj: string | null;
      cpf: string | null;
      active: boolean | null;
    }[];
  }
}
