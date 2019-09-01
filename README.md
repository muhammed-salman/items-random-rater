# A simple Items Random Rater App

## Live Demo

https://items-random-rater.herokuapp.com/

## Instruction for running app on localhost

1. Open your terminal and clone the app using command `git clone https://github.com/muhammed-salman/items-random-rater.git`
2. Type `cd items-random-rater` to get inside the directory.
3. Now type `npm install`
4. After the installation of required node_modules type `npm run start`
5. Now the application can be accessed on `localhost:3050`

## Following scripts are available in the project

### usage: `npm run <script_name>`

1. `start`: To run project on localhost:3050
2. `test`: To test the App using mocha
3. `test:watch`: To continously run the test while modifying files.
4. `clean`: To remove the production build code
5. `build`: To create a production build for deployment
6. `serve`: To run webpack development server
7. `deploy`: To deploy the App to github pages** [Please change the repo url using `git remote` command before deployment (you can't push to my repo ;) )]

## Deploy using heroku cli (with git) [ Run it inside the git local repo ]
1. Login to heroku: `heroku login -i`
2. Create heroku app: `heroku create $YOUR_APP_NAME`
3. Check that the heroku remote has been added: `git remote -v`
4. Deploy your app by pushing master branch to heroku remote: `git push heroku master`


** Currently there are issues in deploying this app on github. You can easily deploy it using heroku. 

**Readme will be updated as necessary**