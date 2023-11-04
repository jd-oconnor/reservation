import { Avatar, AppBar as MuiAppBar } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { FC, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { paths } from "../../paths"

const AppBar: FC = () => {
  const context = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate(paths.login.route)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Avatar />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {context.name}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </MuiAppBar>
    </Box>
  )
}

export default AppBar
