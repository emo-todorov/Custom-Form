import { Box } from "@mui/material";
import RegisterForm from "./components/RegisterForm/RegisterForm";

function App() {

  return (
    <Box sx={{ width: 400, margin: "auto", mt: 5 }}>
      <h1>Register</h1>
      <RegisterForm />
    </Box>
  )
}

export default App
