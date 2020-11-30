# Clinikk Healthcare TV[backend ONLY!]

Clinikk TV is a video streaming service which helps users/subscribers get access to rich health related content. The media content available on the Clinikk TV can be video and/or audio.

## Tech Stack:

- [Node.js](https://nodejs.org/en/docs/guides/getting-started-guide/)
- [MongoDB](https://www.mongodb.com/what-is-mongodb)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://learning.postman.com/docs/getting-started/introduction/)

## Implementation

- Creating [User](https://github.com/vanyusuf1/clinikkHealthcareTV/blob/master/models/user.js) Schema
- Creating [Sign in/Login](https://github.com/vanyusuf1/clinikkHealthcareTV/blob/master/routes/auth.js) route
- Creating [Middleware](https://github.com/vanyusuf1/clinikkHealthcareTV/blob/master/middleware/requireLogin.js) for verifying the user login.
- Adding/uploading media(video,audio) to [Cloudinary](https://cloudinary.com/) from `client-side application`
- Creating [Content](https://github.com/vanyusuf1/clinikkHealthcareTV/blob/master/models/content.js) Schema for media content
- Displaying content(for single and multiple users)
- [Like/unlike](https://github.com/vanyusuf1/clinikkHealthcareTV/blob/master/routes/content.js) implementation in nodeJS
- [Comment](https://github.com/vanyusuf1/clinikkHealthcareTV/blob/master/routes/content.js) implementaion in nodeJS
- Creating [Delete](https://github.com/vanyusuf1/clinikkHealthcareTV/blob/master/routes/content.js) operation for deleting content

## Just for knowledge:

For handling file uploads there are several Node libraries available on `NPM`. Among them, the most popular choice these days are `Multer`, `Formidable`, and `Multiparty`.

### Disclaimer:

You can handle file uploads using [CLOUDINARY](https://cloudinary.com/) as it is also a media management service which improves user experience by automatically delivering images and videos, enhanced and optimized for every user.

**Note**: If you want to handle file uploads using `multer` and save media content like video in node server, you can [click here](https://github.com/vanyusuf1/clinikkHealthcareTV/blob/master/routes/video.js) for the implementation code.
