# Resource Wall Project

Resource Wall is a single-page app that allows users to save external resources in a central place that is publicly available to any user. Posts include a title, description, image and link. Users have the ability to like, comment, and rate other posts. The likes and comments are linked to the currently logged in user. Likes are responsive. There is also a search feature and filter buttons based on resource topics.

Created in collaboration with [Jason Mac](https://github.com/JasonSnow123) and [Katie Liu](https://github.com/thekatcodes).

## Final Product

### Desktop

- Users can save an external URL along with a title and description
- Users can search for already-saved resources created by any user
- Users can categorize any resource under a topic
- Users can comment on any resource
- Users can rate any resource
- Users can like any resource
- Users can copy the link of a resource to their clipboard with a button
- Users can view all their own and all liked resources on one page ("My resources")
- Users can register, log in, log out and update their profile

https://user-images.githubusercontent.com/83685887/219568976-08e4e217-2ef1-4aaa-9f30-0cb644f8d0e2.mov

### Tablet/Mobile

- Responsive design using Bootstrap and media query to switch from desktop to tablet/mobile format.

https://user-images.githubusercontent.com/83685887/219569051-492797f0-9c1d-410b-a007-7c5a9543d483.mov

## Future Improvements

- Include edge cases for the search function (display message if input is empty, display message if no resource matches the search input, inlcude input character limit)
- Implement feature so that users can reply to comments
- Implement a way to auto-update the topic filter buttons based on most popular tags

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Bcrypt
- Bootstrap
- Cookie-session
- Body-parser
- Express
- jQuery
- SCSS 
