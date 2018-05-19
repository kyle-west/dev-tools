# Peerfessional Dev-Tools Extension

This package is a suite of `Console` extensions used by developers here at Peerfessional. We have found these tools useful to our development practices, and decided to make this project open source for others to use.

## Installation

Include a script source to `console.js` in your head tag. Below is an example using the [RawGit CDN](https://rawgit.com/) to pull in the latest version on GitHub.

```html
<script src='https://cdn.rawgit.com/peerfessional/dev-tools/master/console.js'></script>
```

## Lazy Loading the Dev-Tools

As a general rule of practice, we reccomend lazy loading the console extensions. We have made it easy for you to do so. Simply include a source to `console.lazy.js` instead of `console.js`. This file is less than 240 Bytes, and allows for the extensions to be loaded on demand later.

```html
<script src='https://cdn.rawgit.com/peerfessional/dev-tools/master/console.lazy.js'></script>
```

Now you are just one call away from sourcing in all the Peerfessional dev-tools. 

```js
console.extend().then(() => {
  // you now have access to all the dev-tools extensions.
});
```

# What tools are avaliable? 

When loaded, the Peerfessional Dev-Tools add several additional methods to the native `console` object.


## `console.addListener()` Log listeners

Sometimes, especially with debugging and QA, we have found it useful to be able to attach a listener to the logs. Once a listener is attached, any time `console.log()` is used, the listeners will be notified and can react accordingly. If log output is desired to not notify listeners, then `console.logx()` simply outputs logs in the traditional sense. 

```js
console.log("Will notify log listeners");
console.logx("Does not notify log listeners");
```

When you attach a listening function, the `addListener` function returns that function, which can be used later to dispose of the listener with the `removeListener` function. 

```js
var listener = console.addListener((log) => {
  if (log.includes("DOES")) {
    console.logx("Found a match!"); 
  }
});

console.log("Log does NOT match");
console.log("Log DOES match"); // fires "Found a match!"

console.removeListener(listener); // dispose listener
```

## `console.load()` External script loading

Programically loading script files in the browser can sometimes be a pain. Here, it is as simple as knowing the URL. 

```js
console.load("http://example.cdn/path-to/script.js").then((details) => {
  // use whatever extra tools you needed
});
```

## `console.search()`: Object searching

Have you ever been in a situation where you knew a particular object held a property value somewhere in its structure, but you could not remember where? Thats why we created `console.search()`.

`console.search()` takes two arguments: an `Object` to search and a search `value`. It then preforms an inorder traversal of the object and prints out matches it finds.

```js
console.search(obj, value);
```

Example: Search an object for a name value.

```js
obj.data = { info: { name: "John Doe" }, name: "John Doe" };
obj.name = "John Doe";
console.search(obj, "John Doe");
    // --> [Root Node].name : John Doe
    // --> [Root Node].data.info.name : John Doe
    // --> [Root Node].data.name : John Doe
```

## `console.cookies()`: Cookie searching and formatting

Document cookies have now been made more accessible. `console.cookies()` takes an optional filter argument, and returns an array of matching cookies. If no argument is given, then it returns an array of all the document cookies.

```js
console.cookies(); // returns an array of all the document cookies
console.cookies("key or value to match"); // returns matching cookies
```

Further, we can get cookies back in JSON, like so:

```js
console.cookies.json(); // returns a JSON object of all the document cookies
console.cookies.json("key or value to match"); // returns matching cookies in a JSON object
```

## Log Styles

Sometimes it is nice to add a little style to your logs. Below are supported "tags" to display in the console. 

```js
console.h1("This should print a ", "<H1>", " tag size");
console.h2("This should print a ", "<H2>", " tag size");
console.h3("This should print a ", "<H3>", " tag size");
console.h4("This should print a ", "<H4>", " tag size");
console.h5("This should print a ", "<H5>", " tag size");
console.h6("This should print a ", "<H6>", " tag size");
console.p("This should print a ",  "<p>",  " tag size");
```

You can change styles yourself by modifying `console.css`.

```js
console.css = `
  color: blue;
  text-decoration: underline;
`;

console.h1("This should print big, blue, and underlined");
```