import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

type Credendials = {
  email: string;
  password: string;
};

const useLogin = ({ email, password }: Credendials) => {
  const [error, setError] = useState<any>();
  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirectUrl: "/",
      });
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }, [email, password]);

  return [login, error];
};

export default useLogin;
