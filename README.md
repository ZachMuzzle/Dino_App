<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- 
* Below uncomment or comment lines needed or not needed
 -->
[![Contributors][contributors-shield]][contributors-url]
<!-- [![Forks][forks-shield]][forks-url] -->
<!-- [![Stargazers][stars-shield]][stars-url] -->
<!-- [![Issues][issues-shield]][issues-url] -->
<!-- [![MIT License][license-shield]][license-url] -->
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://www.thedinoappgenerator.com/">
    <img src="images/dinoHomePage.png" alt="Logo" width="1024">
  </a>

<h3 align="center">Dinosaur Generator App</h3>

  <p align="center">
    A CRUD side project that works with APIs, AWS, Databases, Firebase, and more
    <br />
    <a href="https://github.com/ZachMuzzle/Dino_App"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ZachMuzzle/Dino_App">View Demo</a>
    ·
    <a href="https://github.com/ZachMuzzle/Dino_App/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/ZachMuzzle/Dino_App/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Dino App][product-screenshot]](https://www.thedinoappgenerator.com)

<p align="left"> I’ve been working on a CRUD web application as part of a learning project to familiarize myself with industry standards and tools. The core features include secure account creation and login functionality. I’ve integrated Firebase for robust security and thorough testing. On the backend, I’m using AWS EC2 to host the server, while an AWS-managed database handles data storage for production, ensuring reliability and scalability. <p>
<p align="left"> Building this application and working with these industry-standard tools has given me a deeper understanding of full-stack development. It also equips me to efficiently reuse the tools and code I’ve developed for future projects, streamlining my workflow and enhancing project scalability.</p>
<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

<!-- * [![Next][Next.js]][Next-url] -->
<!-- * [![React][React.js]][React-url] -->
<!-- * [![Vue][Vue.js]][Vue-url] -->
<!-- * [![Angular][Angular.io]][Angular-url] -->
<!-- * [![Svelte][Svelte.dev]][Svelte-url] -->
<!-- * [![Laravel][Laravel.com]][Laravel-url] -->
<!-- * [![Bootstrap][Bootstrap.com]][Bootstrap-url] -->
<!-- * [![JQuery][JQuery.com]][JQuery-url] -->
[![Javascript][Javascript.com]][Javascript-url]
[![NodeJS][NodeJS.com]][NodeJS-url]
[![Express][Express.com]][Express-url]
[![AWS EC2][AWSEC2.com]][AWSEC2-url]
[![AWS RDS][AWSRDS.com]][AWSRDS-url]
[![Firebase][Firebase.com]][Firebase-url]
[![Docker][Docker.com]][Docker-url]





<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This section will cover how you can get this running locally on your own computer

1. Have `npm` installed: run `npm install -g npm` use `npm -v` to check which version you are on
2. In [package.json](package.json) under `scripts` we add `dev: nodemon index.js`. This is for running the server automatically after each change.
3. Install express: run `npm install express`
4. Install nodemon: `npm install nodemon --save-dev`
5. Next you want to make sure you have Node up-to-date, check using `node --version`.
6. You can download `nvm` as an easy way to switch between different nodes. [nvm github](https://github.com/nvm-sh/nvm)
7. You can also just download to the latest version if you don't want to use nvm:  
   1. `sudo npm cache clean -f`
   2. `sudo npm install -g n`
   3. `sudo n stable`
8. Everything should be up-to-date now. Go ahead in directory of `index.js` and run `npm run dev`. You should see something like this: ![output](images/dino-app-localhost.jpg)
9. You will need to create an `.env` file and have one line of text with `API_KEY=` followed by the api-key
10. [Using Rapid API](https://rapidapi.com/arsen1c/api/duckduckgo-image-search/playground/apiendpoint_4cb82317-b29e-44d9-abd7-8f6d4cc8c3fb/)
    1.  Pick image search
    2.  In the **required parameters** under q String; type the word **dinosaur**
11. Now use the **X-RapidAPI-Key** and place that in your `.env` file.
12. Now you should be able to run `npm run dev` again and now when the button is clicked images will be displayed.

### Prerequisites

Make sure npm is installed
* npm
  ```sh
  npm install npm@latest -g
  ```

### Other Items to Install
1. There a few other packages that will need to be installed. However, I didn't keep great documention on how they were installed. Please look at the [package.json](package.json) file to see all dependencies that are needed to get this project running locally.

### Using Docker
1. This project has been updated to be able to run in the dev and prod env by creating a docker image and running the container. Below will walk you through on how you can setup the codebase to run on your machine.
      1. The `Dockerfile` and `docker-compose.yml` are setup to be used in the dev env
      2. Below in the CLI you will have to build the docker image. Normally we would do the building and then then running manually, but with the help of the `docker-compose.yml` file it allows this project to be built and run automatically. You can choose either to run on the CLI or run in the background
``` docker 
# Build docker image and run container
docker-compose up --build
# Build and run in the background
docker-compose up --build -d
# Update and run docker container in background
docker-compose up -d
```

2. If you have any trouble with docker not allowing you to access use the command below
``` docker
# Give docker access
sudo chmod 666 /var/run/docker.sock
```

3. Here are also a few commands that help with restarting docker and killing containers or delete images/containers

```docker
# Kill images/container (Use if nothing is working)
sudo systemctl restart docker.socket docker.service
# Kill specific docker container
sudo docker stop <container-id>
# Delete all unused images and containers
docker system prune
# Removes all images without at least one container associated to them.
docker image prune -a
# Force remove docker images
docker rmi -f $(docker images -q)
# Removes all systems and volumnes
docker system prune --all --volumes
```
<!-- ### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ``` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_ -->

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- ROADMAP -->
<!-- ## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ### Top contributors:

<a href="https://github.com/github_username/repo_name/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=github_username/repo_name" alt="contrib.rocks image" />
</a> -->



<!-- LICENSE -->
<!-- ## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTACT -->
## Contact

Zachary Muzzleman - zmuzzlem@gmail.com

Project Link: [https://github.com/zachmuzzle/Dino_App](https://github.com/zachmuzzle/Dino_App)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/zachmuzzle/ZachMuzzle.svg?style=for-the-badge
[contributors-url]: https://github.com/ZachMuzzle
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
<!-- [forks-url]: https://github.com/github_username/repo_name/network/members -->
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/zachary-muzzleman/
[product-screenshot]: /images/dinoHomePage.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[Javascript.com]: https://img.shields.io/badge/javascript-000000?style=for-the-badge&logo=javascript&logoColor=yellow
[Javascript-url]: https://www.javascript.com/
[NodeJS.com]: https://img.shields.io/badge/nodejs-000000?style=for-the-badge&logo=Node.js&logoColor=green
[NodeJS-url]: https://nodejs.org/en
[Express.com]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white
[Express-url]: https://expressjs.com/
[AWSEC2.com]: https://img.shields.io/badge/amazonec2-000000?style=for-the-badge&logo=amazonec2&logoColor=white
[AWSEC2-url]: https://aws.amazon.com/ec2/
[AWSRDS.com]: https://img.shields.io/badge/amazonrds-000000?style=for-the-badge&logo=amazonrds&logoColor=white
[AWSRDS-url]: https://aws.amazon.com/rds/
[Firebase.com]: https://img.shields.io/badge/firebase-000000?style=for-the-badge&logo=firebase&logoColor=red
[Firebase-url]: https://firebase.google.com/
[Docker.com]: https://img.shields.io/badge/docker-000000?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
