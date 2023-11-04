import { Box, Button, Card, Container, TextField } from "@mui/material"
import { ChangeEvent, FC, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { clientData } from "../../data/client"
import { providerData } from "../../data/provider"
import { paths } from "../../paths"

enum UserType {
  client = "Client",
  provider = "Provider",
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginPage: FC = () => {
  const userContext = useContext(UserContext)
  // eventually can remove this once auth is configured and backend can tell client the type of user
  const [userType, setUserType] = useState<UserType>(UserType.client)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  // TODO: remove this once auth is configured and backend can tell the type of user
  const handleSwapUserType = () => {
    setUserType(
      userType === UserType.client ? UserType.provider : UserType.client,
    )
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value })
  }

  /**
   *  Handles frontend form validation then calls the API to login
   * @returns null if the email or password fails validation
   */
  const handleLogin = () => {
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email address.")
      return
    }
    if (formData.password.length < 8) {
      alert("Invalid password. Password must be 8 characters or more")
      return
    }

    // TODO: implement login logic with API once endpoint is ready
    try {
      // we will hit the login API endpoint or itegrate with auth provider such as Auth0, AWS Cognito, etc.

      // for now just assume success response and send the user to the appropriate page
      if (userType === UserType.client) {
        userContext.setUser(clientData) // assume logging in as Michael Scott
        navigate(paths.home.route)
      } else {
        userContext.setUser(providerData[0]) // assume logging in as Dr Jim Halpert
        navigate(paths.providerHome.route)
      }
    } catch (error) {
      // TODO: log error to Rollbar
      console.error(error)
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      height="100svh"
      alignItems="center"
    >
      <Container maxWidth="sm">
        <Card
          elevation={3}
          sx={{
            alignItems: "center",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            padding: 5,
          }}
        >
          <h1>{userType} Login</h1>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { mt: 2, width: "100%" },
            }}
          >
            <TextField
              id="email"
              label="Email"
              required
              placeholder="jane@example.com"
              onChange={handleChange}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              required
              placeholder="Password"
              onChange={handleChange}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <Button variant="text" color="primary">
                Forgot Password?
              </Button>
            </Box>

            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
          <Box mb={3}></Box>
          <Box>
            <Button variant="text" color="primary" onClick={handleSwapUserType}>
              {userType === UserType.client
                ? UserType.provider
                : UserType.client}{" "}
              Login
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  )
}

export default LoginPage
