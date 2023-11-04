# Reservation Prototype

## Scenario

- two types of users: providers and clients
- providers have a schedule where they are available to see clients
- clients want to book time, in advance, on that schedule

## Requirements

### Providers

- have an Id
- have a schedule
  - On Friday the 13th of August, I want to work between 8 am and 3 pm

### Clients

- have an Id
- want to reserve a 15-minute slot from a provider schedule
  - reservations expire at 30 minutes if not confirmed
  - reservations must be at least 24 hours in advance
- want to be able to confirm a reservation

## Structure

```bash
src
├── dist # the bundled project ready for production
├── src
│   ├── assets # uses atomic design structure
│   ├── components # smaller components that are reused such as AppBar
│   ├── context # UserContext for shared state/data -- would prefer to use redux toolkit or apollo reactive vars
│   ├── data # data used to mock responses from API
│   │   └── client.ts # assumed simple data structure for a client
│   │   └── provider.ts # assumed simple data structure for provider
│   ├── layouts # shared layouts that can be used by sections that have several pages with the same layout
│   │── pages # full pages the user interacts with
│   │   └── clientHomePage # the page for the client to create and confirm appointments with providers
│   │   └── errorPage # simple error page if the error boundary is hit
│   │   └── loginPage # placeholder login page to switch between user types (client, provider)
│   │   └── providerHomePage # page for the provider to manage their availability
│   │── utils # pure functions -- usually those we would repeat
│   │── paths.ts # mapped to our routes, easier to maintain and ensures you use the right route
│   │── router.tsx # browser router
│   ├── types # shared types, enums, etc.
```

## Some decisions I made

- Using context - Context is good for shared vertical state to avoid prop drilling, which does the job here since there aren't a lot of pages and components. If given more time, I would have done some things differently, such as a default form for provider availability, allowing them to select the days they want to input availability for, and maybe using a modal for the client scheduling a new appointment. Context isn't my first choice, but I had done exactly something like this before for user state, so referencing that saved me time so I could focus on the requirements more.
- I used material-ui for easy access to prebuilt components and didn't worry about configuring the theme. This made development significantly faster for UI and could focus more on the function than the form.
- Styles - normally, I would go back through and extract inline styles and make a separate stylesheet or use something that would allow for the CSS to be static for better performance.
- I followed some standard practices I often use with React projects, such as where things live, naming conventions, routing, and using prettier.
- Assumed that providers only worked M-F and used some validation to now allow clients to select a weekend day. This could easily be removed and allow weekends to be included. Adding the existing schedule for a provider in the data made the development a bit faster, so I had more time to focus on the client requirements as there were more. Looking back, I wish I had included weekends, but hindsight is always 20/20.
- I used one shared login form and allowed the user type to be swapped. My thoughts are that a sign-up form would determine if the user is a client or provider and would store that as a field on the user table so routing could be handled on the frontend by the user type it receives with a success response. For the assessment, I assumed the users already had accounts and did not make the sign-up form.
- Logging in as a client will log in as the only client record I made. Logging in as a provider will log you in as Dr. Jim Halpert, the first provider record. I didn't require a specific email and password, as this was just a simple way to simulate swapping between user types and testing.
- Confirming a reservation is just a simple button click on the reservation card for the assessment. If the reservation isn't confirmed, the border left will be red, and the confirm button will render. If it is confirmed within 30 minutes, clicking the button will update the state to confirmed, the border left will be green, and the confirm button will be replaced with a checkmark icon. Ideally, sending an email/calendar invite or text message for them to confirm their reservation would probably work better and would follow a lot of standard scheduling conventions, but it would be a bigger team discussion.
- I used a simple error boundary from the React docs and a simple error page I have used in prototypes when there wasn't time to set up Rollbar or Sentry for more robust error logging and tools.
- Rather than jumping straight into coding, I took time in the beginning to sketch out what I wanted to build based on the requirements. It said to limit development time to 2 hours, so I made sure I planned to be the most productive I could be in those 2 hours.
  - I picked some base components from MUI that I knew how to use, rather than some of the new ones I hadn't, although they may have provided a better experience.
  - I used an example `AppBar` so I could include it without impacting time constraints
  - I drew out the pages and layout so I didn't need to think about placement and had a good idea of how to style everything.
  - I initially was going to use dayjs for a date library, but I've used date-fns a lot, knew my way around the API well, and had a lot of references from another app idea I had worked on two years ago
  - I found some reference projects I had done to pull from rather than reinventing some things and wasting time
  - put together a base structure to where I wanted things to live. Since it was small, I didn't overthink it so it could easily evolve over time.
- I also made sure the project would build, so if you run `yarn build` and then `yarn preview`, it will execute the `dist`
