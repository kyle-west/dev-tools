// Ensure that console is defined;
if (!console) { console = {}; }


// Stats and other metadata
console.__log_counter = 0;
console.__log_listeners = [];

// Logs items using a unique log id
console.logn = (...args) => {
   console.log(`[${++console.__log_counter}]: `, ...args);
}


/**
 * addListener
 * @param {function} funct - a listener function that takes a message argument
 * @returns {function} - the same function we passed in
 */
console.addListener = (funct) => {
   console.__log_listeners.push(funct);
   return funct;
}

/**
 * removeListener
 * @param {function} funct - a listener function that takes a message argument
 */
console.removeListener = (funct) => {
   var idx = console.__log_listeners.indexOf(funct);
   if (idx !== -1) {
      return console.__log_listeners.splice(console.__log_listeners.indexOf(funct), 1)[0];
   } else {
      return false;
   }
}


/**
 * Notify
 * @param {string} msg - the message to be passed to all the console listeners
 */
console.notify = (msg) => {
   console.__log_listeners.forEach(listener => {
      listener(msg);
   });
}



/**
 * Circular Inorder Search : Traverse a JavaScript Object tree to find the path for a particular value (check for cricular objects)
 * @param {object} node - this is the JS Obj that you wish to traverse
 * @param {value}  search - The value you wish to find in the node or its children
 * 
 * @example 2.0 
 *     window.data = { info: { name: "dave" }, name: "dave" };
 *     window.name = "dave";
 *     inorderSearchCirc(window, "dave") // vvv   returns   vvv
 *                                       // [Root Node].name : dave
 *                                       // [Root Node].data.info.name : dave
 *                                       // [Root Node].data.name : dave
 */
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







// CSS styled pseudo-html
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


/**
 * @override Console.log to record stats and notify listening parties
 */
console.__old_log = console.log;
console.log = (...args) => {
   ++console.__log_counter;
   console.__old_log(...args);
   console.notify(args.join(' '));
}
console.logNoNotify = (...args) => {
   console.__old_log(...args);
}