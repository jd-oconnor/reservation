/**
 * A function that returns the name of the day from a given date
 * @param date the date to get the day of the week from
 * @returns a string representing the day of the week
 */
export const getNameOfDay = (date: Date) => {
  return date.toLocaleDateString("en-US", { weekday: "long" })
}
