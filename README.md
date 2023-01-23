# Youthfully test project

https://youth-test.vercel.app

This project helps users to filter and see images and details from Imgur.

## Development

### Pipeline

The main branch for the development is `dev` and `main` branch is directly connected with the hosting server.
CI/CD is supported by Vercel.com, we are using vercel for the hosting service.

### Development guideline

After clone the repository, following steps will allow you to set up the project on the local environment. 

```bash
$ # Install packages
$ yarn install
$
$ # Run project and check http://localhost:3000 from your browser
$ yarn start
$
$ # Build the project in production mode
$ yarn build
```

#### Workflows
* Push to the `dev` for the normal development
* Create PR and merge into `main` for the deployment

## Project details

### Instructions

The Imgur API is a RESTful API (https://api.imgur.com/) based on HTTP requests and XML or JSON(P) responses. If you're familiar with the APIs of Twitter, Amazon's S3, del.icio.us, or a host of other web services, you'll feel right at home.

### Requirements

* Show gallery images in a grid of thumbnails.
* Show image description in the thumbnail, top or bottom.
* Allow selecting the gallery section: hot, top, user.
* Allow including / excluding viralimages from the result set.
* Allow specifying window and sort parameters.
* When clicking an image in the gallery - show its details: big image, title, description, upvotes, downvotes and score.

### Major Dependencies

* [Create React App](https://create-react-app.dev/) - For initializing React app.
* [Tailwind CSS](https://tailwindcss.com/) - For general utility classes for styling the pages and all details.
* [Prettier](https://prettier.io/) - For styling the codebase under the best practice and common cookbooks. 
