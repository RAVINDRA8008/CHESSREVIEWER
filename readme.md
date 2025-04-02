# RAVINDRA's Game Report

Generate classifications for your Chess moves, for free.
<br><br>
Enter a game by its PGN or pick a game from your Chess.com / Lichess.org account and have it analysed so that you can see where your mistakes and brilliancies are.

**ANNOUNCEMENT**<br>
Freechess is currently closed to further contributions - we are working on rebuilding the website from the ground up :)

## Running locally
### Prerequisites
- Node.js 20.x runtime or later.
- TypeScript package installed globally.

### Starting application
- Download the source code using `git clone` or download as ZIP.
- Open the root directory of the project in a terminal.
- Run `npm i` to install all of the necessary dependencies.
- Create a file called `.env` in the root directory of the project.
- Choose a port for the webserver by adding `PORT=<some port>` to the file.
- If you want to use a CAPTCHA:
    - Add your client secret as `RECAPTCHA_SECRET=<secret>` to the .env file
    - Open `src/public/pages/report/index.html`, find `data-sitekey` and replace the value with your reCAPTCHA public site key
- Run `npm start` to compile TypeScript and start the webserver.

### NPM Scripts
- `npm start` - Compiles TypeScript and starts the webserver.
- `npm run build` - Compiles TypeScript.
- `npm run test` - Generates reports from some sample evaluations for classification testing at `src/test/reports`.

## Running in Docker
### Prerequisites
- Docker installed on the server

### Build a Docker image
- Download the source code using `git clone` or download as ZIP.
- Open the root directory of the project in a terminal.
- Create a file called `.env` in the root directory of the project.
- If you want to use a CAPTCHA:
    - Add your client secret as `RECAPTCHA_SECRET=<secret>` to the .env file
    - Open `src/public/pages/report/index.html`, find `data-sitekey` and replace the value with your reCAPTCHA public site key
- Run `sudo docker build . -t freechess` to build the image

### Start a Docker container with the freechess image
- Run `sudo docker run -d -P freechess`
- If you wish to choose the port instead of Docker choosing one for you, replace `-P` with `-p <port>:80`

# Deploying a Node.js Application on AWS EC2

This guide walks you through deploying a Node.js application on an **Amazon Linux 2023 EC2 instance**.

---

## 🚀 Prerequisites

- AWS account with an EC2 instance running **Amazon Linux 2023**
- SSH access to the EC2 instance
- GitHub repository of your Node.js project
- Security group allowing **port 22 (SSH) and 5000 (app)**

---

## 🔗 Step 1: Connect to Your EC2 Instance

Use SSH to access your EC2 instance:

```bash
ssh -i "C:\Users\ravin\Downloads\CHESS.pem" ec2-user@your-ec2-ip
```

---

## 🛠️ Step 2: Update the System & Install Dependencies

```bash
sudo yum update -y
sudo yum install -y git
```

---

## 🏗️ Step 3: Install Node.js

```bash
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

Verify the installation:

```bash
node -v
npm -v
```

---

## 📥 Step 4: Clone Your GitHub Repository

Replace `<your-repo>` with your actual repository URL:

```bash
git clone https://github.com/RAVINDRA8008/CHESSREVIEWER.git
cd CHESSREVIEWER
```

---

## 📦 Step 5: Install Project Dependencies

```bash
npm install
```

---

## 🔧 Step 6: Build the Project

```bash
npm run build
```

---

## 🚀 Step 7: Start the Application

```bash
npm start
```

Your application should now be running! 🎉

---

## 🎯 Step 8: Allow Traffic to Your EC2 Instance

1. Go to **AWS Console** → **EC2** → **Security Groups**
2. Edit the **Inbound Rules**
3. Allow **port 5000** for incoming traffic
4. Save the changes

Now, access your application using `http://your-ec2-ip:5000`.

---

## 📌 Step 9: Running the App in the Background

Use **PM2** to keep the app running:

```bash
npm install -g pm2
npm start &
```

Or start it with PM2:

```bash
npm install -g pm2
npm start
pm2 start dist/index.js --name "CHESSREVIEWER"
pm2 save

```

---

## 🎉 Success!

Your Node.js application is now running on an AWS EC2 instance. 🚀

---



Happy coding! ✨





