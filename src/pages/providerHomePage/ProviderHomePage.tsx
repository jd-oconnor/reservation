import { Box, Container, TextField } from "@mui/material"
import { ChangeEvent, FC, Fragment, useContext } from "react"
import { AppBar } from "../../components"
import { UserContext } from "../../context/UserContext"
import { IProvider, ISchedule } from "../../types"

// TODO: create default form data for every day of the week

const ProviderHomePage: FC = () => {
  const context = useContext(UserContext) as IProvider & {
    setUser: (payload: Partial<IProvider>) => void
  }
  // TODO: add some sort of user feedback whenever their schedule has been saved

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: "start" | "end",
    index: number,
  ) => {
    // save on change
    const newSchedule = [...context.schedule]
    newSchedule[index][key] = event.target.value
    context.setUser({ schedule: newSchedule })
  }

  return (
    <>
      <AppBar />
      <Box display="flex" width="100%" height="100svh" alignItems="flex-start">
        <Container maxWidth="sm">
          <h1>Provider Scheule</h1>
          {context.schedule.map((weekday: ISchedule, index: number) => (
            <Fragment key={weekday.day}>
              <h5>{weekday.day}</h5>
              <TextField
                name="start"
                label="Start"
                value={weekday.start}
                type="time"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChange(event, "start", index)
                }
                sx={{ mr: 1, mb: 1 }}
              />
              <TextField
                name="end"
                label="End"
                value={weekday.end}
                type="time"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChange(event, "end", index)
                }
              />
            </Fragment>
          ))}
        </Container>
      </Box>
    </>
  )
}

export default ProviderHomePage
