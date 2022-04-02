
### Installation

```sh
$ npm install andruav_local_website -g
```
### Running the Server

```sh
$ andruavlocalweb
```
then open browser at  https://127.0.0.1:8181/andruavweb.html
> IT IS VERY IMPORTANT TO USE THE EXACT URL mentioned here.
> You only can change PORT NUMBER by running the app with PORT argument.

```sh
$ andruavlocalweb -p 8181
```

you can use App such as PM2 to make the server auto-start


```sh
sudo npm install pm2 -g
sudo pm2 startup
sudo pm2 start andruavserver
sudo pm2 list
```

### Advanced Configuration
Andruav Local Web assumes that you are running it from the same machine that runs Andruav Local Server https://www.npmjs.com/package/andruav_local_server. But if you want to deply it on Internet Server or access it from remote computer then you need to make different settings.

1- Open file /usr/local/lib/node_modules/andruav_local_website/js/js_andruavAuth.js and change 
```js
window._localserverIP 	= "127.0.0.1"; 
```
to include the real IP address.
```js
window._localserverIP 	= "www.yourdomain.com"; 
```
2- Copy folder /usr/local/lib/node_modules/andruav_local_website/ to under apache directory and access it from web.
You can also change localweb.js or just use http-server after install it using 
```sh
sudo npm install http-server -g
```
