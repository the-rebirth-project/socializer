# Socializer

This app was built with [React](https://reactjs.org) as the frontend and [Firebase](https://firebase.google.com) for authentication, file storage (storing profile pictures) and for storing data with Cloud Firestore.

## Features

Basic functionality like you would expect from most social media apps is included. You can follow other users to be subscribed to any future posts they create, you can seed posts (equivalent to liking them), you can comment on posts and you can reply to comments. The comment reply feature is structured to only be two levels deep. The first level is the parent comment and the second level contains the replies. It's pretty much similar to how YouTube structures it.

*You currently cannot delete any posts, comments or replies that you've made.* I should've probably included this functionality as it isn't hard to implement but I've moved onto other projects for now. I was a bit burnt out by the time I had all of the critical features implemented. I might potentially revisit this someday.

You can however both modify and delete your account. Modification includes stuff like resetting your password and editing profile details. Deletion means your entire account is deleted (and thus undiscoverable). Your posts, comments and replies that you've made will then be marked as "\[deleted\]".

### Authentication

Authentication is entirely handled by Firebase. The strategy used is Email + Password. Additionally, users have to verify their email after registration in order to log in. This is — again — managed by Firebase.

### Notifications

There's currently support for in-app notifications but not for push notifications in the PWA.

## React Context vs Redux

I decided to opt for purely the context hooks for managing state. It actually works quite nicely and scales appropriately. I do miss the dev tooling that Redux provides though. Overall, I think the context hooks are more than enough for most projects.

## Styled Components

I'm a huge fan of styled components. I think it works really well with the component architecture that most web apps are built on these days. You're still writing css in the end but with the flexibility of a programming language. Just like with react components, you can pass down props to styled components for constructing different variants out of one component. You don't have to fiddle with a bunch of different classes and such. Most of the shared components in this project are exported as a pure styled component since they don't contain any logic and are presentational.

## Tests

I haven't written any tests for the project. The main reason being I didn't really know how to when I wrote this initially. I've seen the benefits of writing tests and will most probably write them for my future projects. For now, writing tests for this codebase would be a somewhat big undertaking for me as there are many components to test for.

*This project is intended as a portfolio piece and has been made open source for educational purposes.*
