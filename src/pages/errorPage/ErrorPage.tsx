import { Box, Button, Container, Typography } from "@mui/material"
import { FC } from "react"

const ErrorPage: FC = () => {
  const handleGoHome = () => {
    window.location.href = "/"
  }

  return (
    <Container maxWidth="sm">
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        height="100svh"
        justifyContent="center"
      >
        <Typography variant="h1">Oops!</Typography>
        <Typography variant="body1">Let's try that again</Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go Home
        </Button>
      </Box>
    </Container>
  )
}

export default ErrorPage
