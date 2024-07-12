import { useForm } from "react-hook-form";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "@/services/axios";
import { useRouter } from "next/router";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/login", data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        router.push("/submit-car");
      }
    } catch (err) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4">Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
