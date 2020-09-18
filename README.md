# Pseudo Clones (1-3 Day Builds Per Version)

### My clones for some of the biggest companies in the world, might update them in my free time and work towards completion

#### Hosted and facilatated by netlify, heroku, firebase, mongodb, aws and more...

#### Written in React (some w/Typescript - goal is to migrate all of them to typescript), Redux, Node, Express, HTML, SCSS/CSS, Java/Spring, Angular, Flutter, etc.

## Some live examples:

MERN & Firebase Amazon (auth, add/remove cart, payment processing, order history, INSANE template for any ecommerce builds): https://clone-f1c46.web.app/ -> use test@test.com, password = test123

- 2 other versions which have search filter, sorting and more but currently lack in styling so I haven't deployed them.  They also need too many details/servers to be up and fully functioning and I've deleted the accounts that have access to those.  Feel free to run them locally and fill in your own info for full functionality though.

MERN Whatsapp: (auth, realtime messaging in chat, sidebar w/multiple rooms available): https://whats-b6b35.web.app/

Firebase & React Facebook(w/google auth & posting ability): https://fb-clone-5930d.web.app/

Firebase & React Netflix (w/movie reel scroll and trailer playability): https://netflix-clone-5966a.web.app/

Firebase & React Twitter (w/tweeting ability): https://twitter-clone-647e1.web.app/ (mongo version can be run locally, just update mongodb details with your own)

React & Express Spotify (not mobile friendly yet, plays song trailers and provides real spotify playlists from their api): https://khiz-spotify.netlify.app

Firebase & React AirBnb (frontend only w/date and time picker that leads to listings): https://airbnb-clone-d6fe5.web.app/


HTML/CSS Google (search functionality, static): https://khiz-google.netlify.app

Messenger (v2 w/ unique styling, real-time chat in multiple rooms - budget version of whatsapp to be honest, was intended to be a fb messenger clone): Check if server is up @ https://khiz-chat-server.herokuapp.com, if it is then go to https://khiz-chat.netlify.app/ to test the app - no mobile b/c it seems to crash the backend server due to a conflict with heroku hosting. Contact me if there's an issue.

MERN TikTok (pause/play, snap functionality, IDENTICAL user experience): https://tiktok-clone-8ade4.web.app/ \* Tiktok has permission issues where it disallows its' videos from being shared on other sites after certain periods of time. As a result, the videos can appear blank and I didn't want to have to delete database docs and add new ones everyday. If you can't see the videos, make your own firebase or mongo db and connect that with new tiktok videos and it'll work. Or just contact me and I'll show you. I will work on getting around this issue in the future.

## Local examples and how to:

Youtube (search and play videos, great template for any video sharing frontend): I took this off live because the API requests costs too much. To run it do the following: clone repo, enter youtube v2 folder, get your own youtube data api key and place into app.js (info in readme.md of folder) then finally run following commands in order -> npm i, npm build, npm install -g serve, serve -s build

Netflix Mobile (only UI): have flutter and android sdk installed w/an emulator (best is pixel) then get your flutter packages and flutter run.

~~Reddit (login and CRUD): khiz-reddit.herokuapp.com~~ (needs some backend reconfig because account verification is currently a security risk live, but you can still run it locally).
