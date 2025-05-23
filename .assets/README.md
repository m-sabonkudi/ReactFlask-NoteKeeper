# Blog-React is my first project with the React framework!


Home page:
![Home page](.images/home.png)


Creating a new blog post:
![New blog post](.images/create.png)

View a blog post:
![View blog post](.images/one.png)
___
## How to clone and run on your PC
### Cloning

To clone, run `git clone https://github.com/m-sabonkudi/Blog-ReactFlask.git`

___
### Running on PC

First, go into the project directory `cd Blog-ReactFlask`

___
#### Set up Flask
Create a new virtual environment: `cd flask` -> `python -m venv venv` (windows) or `python3 -m venv venv` (mac)

You should now have a folder named venv in your flask directory containing the virtual environment.

Activate the just-created virtual environment: `venv\Scripts\activate` (windows) or `source venv/bin/activate` (mac)

Install required python libraries: `pip install -r requirements.txt` (windows) or `pip3 install -r requirements.txt` (mac)

___
#### Set up React
Install react dependencies: `cd react` -> `npm install`

___
#### Run Flask
`python main.py` (windows) or `python3 main.py` (mac)

___
#### Run React
`npm run dev`


Now you can go to this link in your browser: 🟢 [http://localhost:4001](http://localhost:4001)


___
### What actually enables the backend (flask) and frontend (react.js) to interact with each other?
If you at the last line in the `main.py` file, you'll see:
![main.py](.images/main.png)

This tells flask to host the app on port `4000`. Now that our flask app is running on port `4000`, we now need to configure our react app to fetch backend data from that port. To do that, you can see lines `5-16` in `vite.config.js`, like so:
![vite.config.js](.images/vite.png)

By default, (when using vite) react runs on port `5173`, the line `port : 4001,` asks react not to use the default port but should run on port `4001` instead.
We then configured the react app to send any requests beginning with `/api` to the port `http://localhost:4000`, which is where our flask app is running.

