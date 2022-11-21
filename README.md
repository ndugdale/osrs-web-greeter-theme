<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<div align="center">

<h3 align="center">Osrs Login Theme</h3>

  <p align="center">
    A login theme for Web Greeter and Nody Greeter LightDM greeters.
    <br />
    <br />
    <a href="https://github.com/ndugdale/osrs-web-greeter-theme">View Demo</a>
    ·
    <a href="https://github.com/ndugdale/osrs-web-greeter-theme/issues">Report Bug</a>
    ·
    <a href="https://github.com/ndugdale/osrs-web-greeter-theme/issues">Request Feature</a>
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
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
# About The Project

![Product Name Screen Shot][product-screenshot]

This project is a login screen inspired by the popular MMORPG, [**Old School Runescape**](https://oldschool.runescape.com/). This login screen is written for use with the [**LightDM**](https://github.com/canonical/lightdm) login manager using either [**Web Greeter**](https://github.com/JezerM/web-greeter) or [**Nody Greeter**](https://github.com/JezerM/nody-greeter). This project is in no way supported by or affiliated with Old School Runescape or Jagex, and exists solely for the purpose of education and parody.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With
[![React][React.js]][React-url]
[![MUI][MUI.js]][MUI-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
# Getting Started

To get a local copy up and running follow these simple example steps.

## Prerequisites
### [**LightDM**](https://github.com/canonical/lightdm)

Install using your package manager of choice. For example on Debian-based distros like Ubuntu, use:
```sh
sudo apt update
sudo apt install lightdm
```

And on Arch-based distros, use:
```sh
sudo pacman -S lightdm
```

Then, enable `lightdm` as your default login manager. First disable any current login manager service (e.g. gdm, sddm), and then enable the LightDM service.
```sh
sudo systemctl disable <current-login-manager>
sudo systemctl enable lightdm
```

### [**Web Greeter**](https://github.com/JezerM/web-greeter) or [**Nody Greeter**](https://github.com/JezerM/nody-greeter)

Install `web-greeter` or `nody-greeter` by JezerM. Currently, `web-greeter` is the easiest to install. Once installed, the greeter must be configured. Both greeters are configured in the same manner.

Enable the greeter by editing `/etc/lightdm/lightdm.conf` and setting the `greeter-session` property to either `web-greeter` or `nody-greeter` depending on which greeter you installed.
```
[Seat:*]
...
greeter-session=<greeter-name>
...
```

Restart `lightdm` to enact all changes.
```sh
sudo systemctl restart lightdm.service
```

### [**Node.js** and **npm**](https://nodejs.org/en/download/package-manager/)

Install `node.js` and the `npm` package manager using your package manager or other method of choice [(see options)](https://nodejs.org/en/download/package-manager/).

## Installation

Clone the repository and install npm dependencies. The command `npm run build` will build the react project and relocate the built files to the themes folder at `/usr/share/web-greeter/themes/`.
```sh
git clone https://github.com/ndugdale/osrs-web-greeter-theme.git
cd osrs-web-greeter-theme
npm install
sudo npm run build
```

To select the osrs login theme as a default theme for `web-greeter` or `nody-greeter`, set the `greeter.theme` property in `/etc/lightdm/web-greeter.yml` to `osrs`.
```sh
greeter:
  ...
  theme: osrs
  ...
```

<p align="right">(<a href="#readme-top">back to top</a>)</p> 


<!-- USAGE EXAMPLES -->
## Usage

The osrs login theme comes with support for:
* Remembering usernames
* Hiding usernames
* Desktop session select
* Music toggle
* Switching between Old School Runescape login screen backgrounds



<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- UNINSTALLATION -->
## Uninstallation

To change to a different login theme, simply change the `greeter.theme` property in `/etc/lightdm/web-greeter.yml`. The names of other installed themes are given by folder names in the theme folder `/usr/share/web-greeter/themes/` (`dracula` and `gruvbox` themes are shipped with the greeters by default).

To remove the `osrs` theme entirely:
* Remove the folder `osrs` in `/usr/share/web-greeter/themes/`
* Remove the cloned repository

<!-- CONTRIBUTING -->
# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". **Don't forget to give the project a star! Thanks again!**

1. Fork the Project
2. Create your Feature Branch 
    ```
    git checkout -b feature/<feature-name>
    ```
3. Commit your Changes
    ```
    git commit -am 'feat: add <feature-description>'
    ```
4. Push to the Branch
    ```
    git push origin feature/<feature-name>
    ```
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
# License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
# Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/ndugdale/osrs-web-greeter-theme](https://github.com/ndugdale/osrs-web-greeter-theme)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
# Acknowledgments
This project was only possible due to the works of others:
* Thank you JezerM for championing support for web technologies in login screen UIs with [Web-Greeter](https://github.com/JezerM/web-greeter) and [Nody-Greeter](https://github.com/JezerM/nody-greeter)
* [React Final Form](https://github.com/final-form/react-final-form)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ndugdale/osrs-web-greeter-theme.svg?style=for-the-badge
[contributors-url]: https://github.com/ndugdale/osrs-web-greeter-theme/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ndugdale/osrs-web-greeter-theme.svg?style=for-the-badge
[forks-url]: https://github.com/ndugdale/osrs-web-greeter-theme/network/members
[stars-shield]: https://img.shields.io/github/stars/ndugdale/osrs-web-greeter-theme.svg?style=for-the-badge
[stars-url]: https://github.com/ndugdale/osrs-web-greeter-theme/stargazers
[issues-shield]: https://img.shields.io/github/issues/ndugdale/osrs-web-greeter-theme.svg?style=for-the-badge
[issues-url]: https://github.com/ndugdale/osrs-web-greeter-theme/issues
[license-shield]: https://img.shields.io/github/license/ndugdale/osrs-web-greeter-theme.svg?style=for-the-badge
[license-url]: https://github.com/ndugdale/osrs-web-greeter-theme/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: /docs/images/login-main.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[MUI.js]: https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://mui.com/
