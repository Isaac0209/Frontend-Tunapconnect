import { createContext, ReactNode, useEffect, useState } from "react";
import { signIn as signInRequest, useSession } from "next-auth/react";

import Router from "next/router";

type SignInData = {
  username: string;
  password: string;
};

type User = {
  id: string | undefined;
  name: string | undefined;
  privilege: string | undefined;
};

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void> | Promise<string>;
  user: User | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const { status, data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  async function signIn(data: SignInData) {
    const resp = await signInRequest("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });
    console.log(resp);
    localStorage.setItem(
      process.env.NEXT_PUBLIC_APP_SESSION_STORAGE_NAME as string,
      JSON.stringify("resp")
    );

    console.log(resp);
    if (resp?.ok && resp?.status === 200) {
      setUser({
        id: session?.user.id,
        name: session?.user.name,
        privilege: session?.user.privilege,
      });
      Router.push("/company");
    }

    if (!resp?.ok && resp?.status === 401) {
      return "Usuário ou senha incorreto!";
    }
    return "Falha ao realizar o login!";
  }

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/");
  }, [status]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
