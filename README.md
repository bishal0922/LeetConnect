# LeetConnect

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
- connect mongodb
  - create model for "User"


`npm start` at the root of the project to start the server
`localhost:3001` server will be running on this port