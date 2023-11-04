import { CheckCircle } from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  Container,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material"
import {
  addDays,
  differenceInHours,
  differenceInMinutes,
  isWeekend,
  lightFormat,
  setHours,
} from "date-fns"
import { ChangeEvent, FC, useContext, useState } from "react"
import { AppBar } from "../../components"
import { UserContext } from "../../context/UserContext"
import { providerData } from "../../data/provider"
import { IClient, IProvider, IReservation, ISchedule } from "../../types"
import { getNameOfDay } from "../../utils/getNameOfDay"
import { getTimeSlots } from "../../utils/getTimeSlots"

const ClientHomePage: FC = () => {
  const context = useContext(UserContext) as IClient & {
    setUser: (payload: Partial<IClient>) => void
  }
  const [showForm, setShowForm] = useState<boolean>(false)
  const [providers] = useState<Array<IProvider>>(providerData)
  const [provider, setProvider] = useState<string>()
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)
  const [timeSlot, setTimeSlot] = useState<string>("")

  // TODO: move this to a separate component
  // extract business logic to a separate function for easier testing
  const getProviderAvailability = () => {
    if (provider === "" || !selectedDay) {
      alert("Please select a provider and date")
      return
    }

    // find the provider that was selected by their id
    const selectedProvider = providers.find((p) => p.id === Number(provider))

    // if the provider is not found, show an error
    if (!selectedProvider) {
      alert("Invalid provider")
      return
    }

    const weekDay = getNameOfDay(selectedDay)

    // find the schedule for the selected provider on the selected day
    const dailySchedule = selectedProvider.schedule.find(
      (providerSchedule: ISchedule) => providerSchedule.day === weekDay,
    )

    // set the startTime and endTime to generate the time slots
    const startTime =
      selectedDay &&
      setHours(selectedDay, Number(dailySchedule!.start.split(":")[0]))

    const endTime =
      selectedDay &&
      setHours(selectedDay, Number(dailySchedule!.end.split(":")[0]))

    const timeSlots = getTimeSlots(startTime, endTime)

    return (
      <Box display="flex" flexDirection="column" alignItems="flex-start" mt={2}>
        <label htmlFor="time">Time</label>
        <Select
          id="time"
          name="time"
          native
          value={timeSlot}
          onChange={(event: SelectChangeEvent<string>) =>
            setTimeSlot(event.target.value)
          }
          fullWidth
        >
          <option disabled value="" key="placeholder" defaultValue="">
            Select a time
          </option>
          {timeSlots.map((time) => (
            <option key={time.toISOString()} value={time.toISOString()}>
              {time.toLocaleTimeString()}
            </option>
          ))}
        </Select>
      </Box>
    )
  }

  /**
   * Update the selectedDay state when the date changes
   * @param e the event object
   */
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const now = new Date()
    const selectedDate = addDays(new Date(e.target.value), 1)

    // this can probably be better but it works for now
    const diff = differenceInHours(selectedDate, now)
    if (diff < 24) {
      alert("Invalid date. You must select a date at least 24 hours in advance")
      return
    }

    // must be a weekday
    if (isWeekend(selectedDate)) {
      alert("Invalid day of week. You must select a weekday")
    } else {
      setSelectedDay(selectedDate)
    }
  }

  /**
   * Reset the form and hide it
   */
  const handleCancel = () => {
    setShowForm(false)
    setSelectedDay(null)
    setTimeSlot("")
  }

  /**
   * Save the new reservation to the user context -- this will be replaced with an API when it is ready
   */
  const handleSave = () => {
    if (!provider || !selectedDay || !timeSlot) {
      return
    }

    // create the new reservation object
    // TODO: validate this time slot is not already taken (could request only available time slots by provider when selected)
    const newReservation = {
      id: Math.floor(Math.random() * 1000),
      providerName:
        providers.find((p) => p.id === Number(provider))?.name ?? "", // this is a bit of a hack but it works for now...
      providerId: Number(provider),
      date: selectedDay.toISOString(),
      time: new Date(timeSlot).toLocaleTimeString(),
      isConfirmed: false,
      createdAt: new Date(),
    }

    // TODO: use mutation or endpoint to update the database

    context.setUser({ reservations: [...context.reservations, newReservation] })
    handleCancel() // reset the form
  }

  /**
   * iterate through the reservations and update the one that was confirmed
   * @param reservation the reservation to confirm
   */
  const handleConfirmReservation = (reservation: IReservation) => {
    const now = new Date()
    const updatedReservations = context.reservations.map(
      (currentReservation) => {
        // if the reservation is more than 30 minutes old, do not allow it to be confirmed
        // this isn't ideal but...time constraints
        if (
          currentReservation.id === reservation.id &&
          differenceInMinutes(now, new Date(currentReservation.date)) < 30
        ) {
          return {
            ...currentReservation,
            isConfirmed: true,
          }
        }
        return currentReservation
      },
    )

    context.setUser({ reservations: updatedReservations })
  }

  return (
    <>
      <AppBar />
      <Box
        display="flex"
        width="100%"
        height="100svh"
        alignItems="flex-start"
        mt={4}
      >
        <Container maxWidth="sm">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <h3>My Appointments</h3>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowForm(true)}
            >
              New Appointment
            </Button>
          </Box>
          {showForm && (
            <Box my={3}>
              <label htmlFor="provider">Provider</label>
              <Select
                native
                value={provider}
                labelId="provider-label"
                id="provider"
                placeholder="Select a provider"
                onChange={(event: SelectChangeEvent<string>) =>
                  setProvider(event.target.value)
                }
                fullWidth
              >
                <option aria-label="None" value="" />
                {providers.map((provider) => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </Select>

              {provider && (
                <Box mt={2}>
                  <label htmlFor="date">Date</label>
                  <TextField
                    id="date"
                    name="date"
                    type="date"
                    fullWidth
                    value={selectedDay?.toISOString().split("T")[0] ?? ""}
                    onChange={handleDateChange}
                  />
                </Box>
              )}

              {provider && selectedDay && getProviderAvailability()}
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                gap={2}
                mt={2}
              >
                <Button variant="text" color="inherit" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}
          {context.reservations.length > 0 ? (
            <>
              {context.reservations.map((reservation) => (
                <Card
                  key={reservation.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderLeft: `4px solid ${
                      reservation.isConfirmed ? "green" : "red"
                    }`,
                    px: 2,
                    mt: 2,
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    width="100%"
                  >
                    <div>
                      <h4
                        style={{
                          height: 20,
                        }}
                      >
                        {lightFormat(
                          addDays(new Date(reservation.date), 1),
                          "MM/dd/yyyy",
                        )}
                      </h4>
                      <p>{reservation.providerName}</p>
                    </div>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      justifyContent="flex-start"
                    >
                      <p>
                        {reservation.time} <small>(15 min)</small>
                      </p>

                      {!reservation.isConfirmed ? (
                        <Button
                          onClick={() => handleConfirmReservation(reservation)}
                        >
                          Confirm
                        </Button>
                      ) : (
                        <CheckCircle color="success" />
                      )}
                    </Box>
                  </Box>
                </Card>
              ))}
            </>
          ) : (
            <p>No upcoming appointments</p>
          )}
        </Container>
      </Box>
    </>
  )
}

export default ClientHomePage
