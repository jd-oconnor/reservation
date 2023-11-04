import { addMinutes } from "date-fns"

/**
 * A function that generates the time slots between a start and end time
 * @param startTime the Date object representing the start time
 * @param endTime the Date object representing the end time
 * @returns an array of Date objects representing the time slots between the start and end times
 */
export const getTimeSlots = (startTime: Date, endTime: Date) => {
  const timeSlots = []
  let currentTime = startTime

  while (currentTime < endTime) {
    timeSlots.push(currentTime)
    currentTime = addMinutes(currentTime, 15)
  }

  return timeSlots
}
