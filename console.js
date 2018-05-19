if (!console) { console = {}; }

console.__log_counter = 0;
console.__log_listeners = [];
console.__old_log = console.__old_log || console.log;
console.log = (...args) => {
   ++console.__log_counter;
   console.__old_log(...args);
   console.notify(args.join(' '));
}
console.logx = (...args) => {
   console.__old_log(...args);
}
console.logn = (...args) => {
   console.log(`[${++console.__log_counter}]: `, ...args);
}

console.addListener = (funct) => {
   console.__log_listeners.push(funct);
   return funct;
}
console.removeListener = (funct) => {
   var idx = console.__log_listeners.indexOf(funct);
   if (idx !== -1) {
      return console.__log_listeners.splice(console.__log_listeners.indexOf(funct), 1)[0];
   } else {
      return false;
   }
}
console.notify = (msg) => {
   console.__log_listeners.forEach(listener => {
      listener(msg);
   });
}

console.search = (node, search, name) => {
   if (!name) {
      name = "[Root Node]";
      console.search.stack = [name];
      console.search.vistedNodes = [];
   }
   if (node && typeof node === "object") {
      if (console.search.vistedNodes.includes(node)) {
         console.search.stack.pop();
      } else {
         console.search.vistedNodes.push(node);
         for (prop in node) {
            console.search.stack.push(prop);
            console.search(node[prop], search, prop);
         }
         console.search.stack.pop();
      }
   } else {
      if (node === search) {
         console.log(console.search.stack.join(".") + " : " + node);
      }
      console.search.stack.pop();
   }
}

console.cookies = (search) => {
  var cookies = document.cookie.split("; ");
  if (search) { 
    var found = [];
    cookies.forEach((cookie) => {
      if (cookie.includes(search)) {
        found.push(cookie);
      }
    });
    return found;
  }
  return cookies;
}
console.cookies.json = (search) => {
  var json = {};
  var cookies = document.cookie.split("; ");
  cookies.forEach((cookie) => {
    var key_val = cookie.split("=");
    if (!search || cookie.includes(search)) {
      json[key_val[0]] = key_val[1];
    }
  });
  return json;
}

console.load = (url) => {
  return new Promise(function(resolve) {
    var package = document.createElement('script');
    package.src = url;
    package.type = 'text/javascript';
    package.onload = (e) => {
      console.group(`LOADED PACKAGE FROM: ${url}`);
      console.log(e);
      console.groupEnd();
      resolve(e);
    };
    document.getElementsByTagName('head')[0].appendChild(package);
  });
};

console.extend = () => {
  return new Promise((resolve) => resolve());
}

console.css = `
   font-family: Arial;
`;
console.h1 = (...args) => {
   console.log(`%c${args.join(' ')}`, console.css + " font-size: 3em;");
}
console.h2 = (...args) => {
   console.log(`%c${args.join(' ')}`, console.css + " font-size: 2.5em;");
}
console.h3 = (...args) => {
   console.log(`%c${args.join(' ')}`, console.css + " font-size: 2.17em;");
}
console.h4 = (...args) => {
   console.log(`%c${args.join(' ')}`, console.css + " font-size: 2.12em;");
}
console.h5 = (...args) => {
   console.log(`%c${args.join(' ')}`, console.css + " font-size: 1.83em;");
}
console.h6 = (...args) => {
   console.log(`%c${args.join(' ')}`, console.css + " font-size: 1.75em;");
}
console.p = (...args) => {
   console.log(`%c${args.join(' ')}`, console.css);
}
