# LeetConnect

`npm install` at the root of the project then
`npm start`
`localhost` will be running

also to run server
- clone the server repo `git clone https://github.com/bishal0922/Leetconnect-backend`
- and run `npm install` and `npm start` to run the server which will be running on `localhost:3001`

Todo:

- [ ] mvp

  - [ ] user auth
  - [ ] user profile
  - [ ] following friends
  - [ ] post feed
  - [ ] post comments
  - [ ] post likes

- additional features possibly, leaderboards (based on rankings)

day 1:

- setup project (monorepo with client/ and sever/)
- implement firebase admin and client
- implement user auth (sign in + sign out)
- redirect to profile page after sign in success
  - within the proifile page, implement a way to connect users with their leetcode profile
  - currently thinking about having user paste in a unique code to their bio on leetcode, and then we can scrape the bio to get the code and then link the user to their leetcode profile
  - so when link-leetcode-account button is pressed, user is prompted to enter "token" into leetcode bio (prompt window)
  - when verify button is clicked then the backend scrapes the bio and checks if the token is there
- connect mongodb
  - create model for "User", updated with leetcode profile,
  - (all done)

day2:

- provide snackbar for succesful leetcode integration (future todo)
- host express server on railway (done)
- host react app on netlify (done)

- improve the profile page,
- add a feed page,
  - user is able to post feed
  -


