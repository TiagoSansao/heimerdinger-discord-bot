<header>
  <h1 align="center"> Heimerdinger Bot </h1>
  <p align="center"> 
    <strong> ENTERTAINMENT, USER & CHAMPION DATA, LOL INFO AND MUCH MORE! </strong> 
  </p>
  <p align="center"> 
    <a href="#about">About</a> •
    <a href="#features">Features</a> •
    <a href="#preview">Preview</a> •
    <a href="#instalacao">Getting started</a> •
    <a href="#tecnologias">Technologies</a> •
    <a href="#disclaimer">Important disclaimer</a> 
  </p>
  <hr/>
</header>
<main>

  <div id="about">
    <h3 align="center">💁 About</h3>
    <p><b>Heimerdinger Bot</b> is a <b>multilanguage</b> League of Legends Discord Bot made with <b> JavaScript + Node.JS + MongoDB</b>. Heimer is able to retrieve valuable information from <b>Riot Games' Official API</b> and display them for entertainment and informational purposes in different languages, he is also able to display <b>valuable dynamic information </b> from the game like runes and spells from a specific champion through <b>web-scraping</b> sites that are specialized in collecting, analyzing high-elo games' data in order to show the best decisions for each champion. You can get more info on <a href="https://heimerdingerbot.github.io/" target="_blank">our site</a>.</p>
  </div>

  <hr/>

  <div id="features">
    <h3 align="center">⭐ Features</h3>
    <ul>
      <li>Show specific data about summoners like: elos, level, maestry with champions...</li>
      <li>Simulate a real hextech chest opening using the officials prizes probabilities.</li>
      <li>Show specific data about champions, like: recommended runes, spells...</li>
      <li>Multilanguage, currently supports Portuguese and English.</li>
      <li>Customizable photo and description.</li>
      <li>Roulette a random champion to play.</li>
      <li>Display the free-week champions.</li>
    </ul>
  </div>

  <hr/>

  <div align="center" id="preview">
    <h3 align="center">👀 Preview</h3>
    <img width='390px' src="./git-assets/1.png" alt="GIF showing the app"> &nbsp;&nbsp;&nbsp;&nbsp;
    <img width='400px' src="./git-assets/2.png" alt="GIF showing the app"> 
  </div>

  <hr/>

  <div id="instalacao">
    <h3 align="center">💻 Getting started</h3>
    <p> :warning: It's necessary to have <a href="https://nodejs.org/en/" target="_blank">Node.JS</a> or <a href="https://classic.yarnpkg.com/en/" target="_blank">Yarn</a> installed to be able to proceed from here; </p>
<ul><li>Instructions</li></ul>

```markdown
# Clone the repository

$ git clone https://github.com/TiagoSansao/heimerdinger-discord-bot

# Go to the project directory

$ cd ./heimerdinger-discord-bot

# Install all dependencies

$ yarn install

# Start it

$ yarn start
```

  <p>:warning You have to create an file named ".env" in the root folder of the project, write it following this structure shown below, remember that you will have to create your own MongoDB database in order to put your connect credentials.</p>

```markdown
API_CHAMPIONS= {...} # The site champion data will be web-scraped
BOT_TOKEN = {...} # your own Bot Token
RIOT_API_KEY = {...} # your own Riot API Key
MONGOOSE_URI=mongodb+srv://{name}:{password}@cluster0.adurt.mongodb.net/heimerdinger-bot?retryWrites=true&w=majority
INVITE_LINK=https://rebrand.ly/heimerdinger-bot
BASE_URL=https://na1.api.riotgames.com
```

  </div>

  <hr/>

  <div id="tecnologias">
    <h3 align="center">🚀 Technologies</h3>
      <ul>
        <li><a href='https://nodejs.org/en/'>Node.js</a></li>
        <li><a href='https://discord.js.org/#/'>Discord.js</a></li>
        <li><a href='https://github.com/axios/axios'>Axios</a></li>
        <li><a href='https://www.npmjs.com/package/node-html-parser'>node-html-parser</a></li>
        <li><a href='https://www.npmjs.com/package/dotenv'>Dotenv</a></li>
        <li><a href='https://www.mongodb.com/'>MongoDB</a></li>
        <li><a href='https://mongoosejs.com/'>Mongoose</a></li>
      </ul>
  </div>

  <hr/>

  <div id="disclaimer">
    <h3 align="center">:warning: Important disclaimer</h3>
    <p>As it is written in the <a href="#about">about section</a>, some of Heimerdinger Bot's functions use <b>web-scraping</b>, I chose this method to get some data because it would be much expensive to create my own high-elo database and analyze millions of games to get accurate and reliable data to show to my users, and it happens that most of these type of sites don't allow their data to be reproduced. This app used to be hosted on Heroku, but I turned it off due to these restrictions.</p>
  </div>

  <hr />

  <p align="center"> 🔥 Developed by Tiago Schulz Sansão  👋  <a href="https://www.linkedin.com/in/tiago-schulz-sans%C3%A3o-9283351b7/">Check my LinkedIn</p>

</main>
