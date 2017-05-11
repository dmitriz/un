# Runing Examples

## Enter the example directory

```sh
cd ${pathToExample}${example-name}
```

## Run in browser with no installations

```sh
$ yarn open
```
or
```sh
$ npm run open
```

## Auto-rebuild and reload on every file save

Our favorite prototyping tool is [`budo`](https://github.com/mattdesl/budo), 
do its ease of use and features including:

- works out of the box, no configuration needed
- no `.html` file is required, budo will create one automatically
- fast incremental building, suspending the response until the new source is ready
- watches HTML and CSS files for changes; CSS is injected without reloading the page
- can be used with any `browserify` options
- additional rich API://github.com/mattdesl/budo/blob/master/docs/command-line-usage.md


### Install Budo

```sh
$ yarn global add budo
```
or
```sh
$ npm install budo -g
```

### Run with budo

This will start budo server and open browser:

```sh
$ yarn
$ yarn start
```
or
```sh
$ npm install
$ npm start
```

Now change and save the source files 
and see instant updates in your browser.
