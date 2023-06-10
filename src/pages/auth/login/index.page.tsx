import * as React from "react";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

import tunapLogoImg from "@/assets/images/tunap-login.svg";
import { alpha, Paper, Stack } from "@mui/material";
import styled from "@emotion/styled";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

type SignInDataProps = {
  username: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data: SignInDataProps) {
    const errorMsg = await signIn(data);
    if (errorMsg) {
      setError("username", {
        type: "manual",
        message: errorMsg,
      });
      setError("password", {
        type: "manual",
        message: errorMsg,
      });
    }
    console.log(errorMsg);
  }
  const ButtonAdd = styled(Button)(({ theme }) => ({
    color: "white",
    background: "#1C4961",
    maxWidth: 150,
    borderRadius: 6,
    "&:hover": {
      background: alpha("#1C4961", 0.7),
    },
  }));

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundAttachment: "fixed",
        backgroundImage: 'url("/images/background-logo-login.svg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "930px 100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 4,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "440px",
          borderRadius: 4,
        }}
        component={Paper}
      >
        <Image
          priority
          src={tunapLogoImg}
          height={90}
          width={221}
          alt="Follow us on Twitter"
        />
        <Typography component="h1" variant="h6">
          Entrar
        </Typography>
        <Stack
          component="form"
          onSubmit={handleSubmit(handleSignIn)}
          noValidate
          sx={{
            mt: 1,
            alignItems: "center",
            justifyContent: "center",
            px: 5,
            maxWidth: "400px",
          }}
          gap={1}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail ou CPF:"
            placeholder="E-email ou CPF:"
            autoComplete="email"
            autoFocus
            size="small"
            {...register("username")}
          />

          {/* <Typography component="h1" variant="h6"></Typography> */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha:"
            placeholder="Senha:"
            size="small"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
          />
          {errors.username && (
            <Typography
              sx={{
                color: "red",
                fontSize: 12,
              }}
            >
              {errors.username.message}
            </Typography>
          )}
          <ButtonAdd
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 3 }}
          >
            entrar
          </ButtonAdd>
          {/* <Link href="#" variant="body2">
            {'Perdeu sua senha? Recupere sua senha'}
          </Link>
          <Link href="#" variant="body2">
            {'Termos de uso e a Política de privacidade'}
          </Link> */}
        </Stack>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { "next-auth.session-token": token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/company",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
