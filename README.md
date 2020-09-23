<h1 align="center">Pseudo Clones
  <br>
  <h4 align="center">My clones for some of the biggest companies in the world, might update them in my free time and work towards completion!</h4>
</h1>
<h4 align="center">1-3 Day Builds Per Version</h4>
<p align="center"><a align="center" target="_blank" href="https://vcloudinfo.us12.list-manage.com/subscribe?u=45cab4343ffdbeb9667c28a26&id=e01847e94f"><img src="https://feeds.feedburner.com/RecentCommitsToBearStoneHA.1.gif" alt="Recent Commits to Bear Stone Smart Home" style="border:0"></a></p>
<div align="center">
  <h4>
    <a href="https://travis-ci.org/khiz-k/pseudo-clones"><img src="https://travis-ci.org/CCOSTAN/Home-AssistantConfig.svg?branch=master"/></a>
    <a href="https://github.com/khiz-k/pseudo-clones/stargazers"><img src="https://img.shields.io/github/stars/CCOSTAN/Home-AssistantConfig.svg?style=plasticr"/></a>
    <a href="https://github.com/khiz-k/pseudo-clones/commits/master"><img src="https://img.shields.io/github/last-commit/CCOSTAN/Home-AssistantConfig.svg?style=plasticr"/></a>
        <a href="https://github.com/khiz-k/pseudo-clones/commits/master"><img src="https://img.shields.io/github/commit-activity/y/CCOSTAN/Home-AssistantConfig.svg?style=plasticr"/></a>

  </h4>
</div>
<p><font size="3">


#### Hosted and facilatated by netlify, heroku, firebase, mongodb, aws and more...

#### Written in React (some w/Typescript - goal is to migrate all of them to typescript), Redux, Node, Express, HTML, SCSS/CSS, Java/Spring, Angular, Flutter, etc.

## Some live examples:

Firebase Amazon (auth, add/remove cart, payment processing, order history, awesome template for any ecommerce builds): https://clone-f1c46.web.app/ -> use test@test.com, password = test123

AWS Amazon (bookstore variation with full CRUD operations, trying aws amplify): http://bookstore-20200921170525-hostingbucket-prod.s3-website-us-east-1.amazonaws.com/

MERN Amazon (testing search filter, rating, sorting): http://khiz-amazon.herokuapp.com/ I plan to merge this one with the firebase one to make the ultimate build

MERN Whatsapp (auth, realtime messaging in chat, sidebar w/multiple rooms available): https://whats-b6b35.web.app/

MERN/Firebase Instagram (email and google auth/login, posting w/image, sidebar with "current" popular trends/placeholder for ads, commenting ability, identical UI): https://instagram-clone-8ac3d.web.app/

Firebase & React Facebook(w/google auth & posting ability): https://fb-clone-5930d.web.app/

Firebase & React Netflix (w/movie reel scroll and trailer playability): https://netflix-clone-5966a.web.app/

Firebase & React Twitter (w/tweeting ability): https://twitter-clone-647e1.web.app/ (mongo version can be run locally, just update mongodb details with your own)

React & Express Spotify (not mobile friendly yet, plays song trailers and provides real spotify playlists from their api): https://khiz-spotify.netlify.app

Firebase & React AirBnb (frontend only w/date and time picker that leads to listings): https://airbnb-clone-d6fe5.web.app/

HTML/CSS Google (search functionality, static): https://khiz-google.netlify.app

Messenger (v2 w/ unique styling, real-time chat in multiple rooms - budget version of whatsapp to be honest, was intended to be a fb messenger clone): Check if server is up @ https://khiz-chat-server.herokuapp.com, if it is then go to https://khiz-chat.netlify.app/ to test the app - no mobile b/c it seems to crash the backend server due to a conflict with heroku hosting. Contact me if there's an issue.

MERN TikTok (pause/play, snap functionality, IDENTICAL user experience): https://tiktok-clone-8ade4.web.app/ \* Tiktok has permission issues where it disallows its' videos from being shared on other sites after certain periods of time. As a result, the videos can appear blank and I didn't want to have to delete database docs and add new ones everyday. If you can't see the videos, make your own firebase or mongo db and connect that with new tiktok videos and it'll work. Or just contact me and I'll show you. I will work on getting around this issue in the future.

## Local examples and how to:

Youtube (search and play videos, great template for any video sharing frontend): I took this off live because the API requests costs too much. To run it do the following: clone repo, enter youtube v2 folder, get your own youtube data api key and place into app.js, then finally run following commands in order -> npm i, npm build, npm install -g serve, serve -s build

Netflix Mobile (only UI): have flutter and android sdk installed w/an emulator (best is pixel) then get your flutter packages and flutter run.

~~Reddit (login and CRUD): khiz-reddit.herokuapp.com~~ (needs some backend reconfig because account verification is currently a security risk live, but you can still run it locally).
