//=============================================================================
//  Lunatic -- Functional Library
//=============================================================================
Lunatic.lambda = {
  /**
   * Returns a trimmed lowercase string.
   * @param {string} string 
   * @returns {string}
   */
  lowerCase(string) {
    return string.toLowerCase().trim();
  },
  /**
   * Returns a capitalized version of the string.
   * @param {string} string 
   * @returns {string}
   */
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  /**
   * Returns a version of the string with all words capitalized.
   * @param {string} string
   * @returns {string}
   */
  title(string) {
    return string.split(/\s/g).map(word => Str.capitalize(word)).join(" ");
  },
  /**
   * Returns a multiline string trimmed on each line.
   * @param {string} string 
   * @returns {string} 
   */
  trimLines(string) {
    return string.split(/\r\n|\n/)
      .map(x => x.trim()).join("\n");
  },
  /**
   * Splits a string into multiple
   * trimmed lines and returns an array.
   * @param {string} string 
   * @returns {string[]}
   */
  splitLines(string) {
    return string.split(/\r\n|\n/);
  },
  /**
   * Returns the word count of a string.
   * @param {string} string 
   * @returns {number}
   */
  wordCount(string) {
    return string.trim().split(/\s+/ig).length;
  },
  /**
   * Replaces double backslashes with escape codes
   * to recreate escape sequences.
   * @param {string} string 
   */
  x1breplace(string) {
    return string.replace(/\\\\/ig, "\x1b");
  },
  x1breplace2(string) {
    return string.replace(/\\/ig, "\x1b");
  },
  /**
   * Removes lines from the string.
   * @param {string} string 
   * @returns {string}
   */
  removeLines(string) {
    return string.replace(/\\n\\r|\n/ig, "");
  },
  /**
   * Returns the string spaced evenly. 
   * @param {string} string 
   * @returns {string}
   */
  monoSpace(string) {
    return string.replace(/\s{2,}/gi, " ");
  },
  leadingSpaces(string) {
    return string.search(/\S|$/);
  },
  spaceCount(string) {
    return string.split(" ").length - 1;
  },
  /**
   * Returns the first element of an array.
   * @template T 
   * @param {T[]} array 
   * @returns {*}
   */
  peekFront(array) {
    return array.slice(0)[0];
  },
  /**
   * Returns the last element of an array.
   * @template T 
   * @param {T[]} array 
   * @returns {*}
   */
  peekLast(array) {
    return array.slice(-1)[0];
  },
  /**
   * Creates a function that only be run once.
   * @param {Function} f
   * @returns {Function}
   */
  once(f) {
    let count = 0;
    return function () {
      if(count > 0)
        return null;
      else {
        count++;
        return f();
      }
    };
  },
  /**
   * Repeats the code a set number of times
   * similar to a for loop.
   * @param {number} iterations 
   * @param {Function} f 
   */
  times(iterations, f) {
    for(let i = 0; i < iterations; i++) {
      f();
    }
  },
  /**
   * Returns the number of times the element appears
   * in the specified array.
   * @template T 
   * @param {*} item 
   * @param {T[]} array 
   * @returns {number}
   */
  occurences(item, array) {
    return array.filter((element) => element === item).length;
  },
  /**
   * Creates a function with the specified array of arrays that
   * will return a value when given the key.
   * @param {any[][]} array 
   * @returns {Function}
   */
  keymap(array) {
    const keymap = new Map(array);
    return (key) => {
      return keymap.get(key);
    };
  },
  intersect(array1, array2) {
    return array1.filter(element => array2.includes(element));
  },
  /**
   * Clears an array of all values.
   * @param {any[]} array 
   */
  clear(array) {
    array.length = 0;
  },
  /**
   * Returns the index of an element of the same
   * class type. If none is found, returns -1.
   * @template T 
   * @param {*} type 
   * @param {T[]} array 
   * @returns {number}
   */
  indexOfType(type, array) {
    return array.findIndex((element) => {
      return element.constructor.name === type.constructor.name;
    });
  },
  /** Clones an object removing it's dependencies.
   * @returns {object}
   */
  clone: (obj) => JSON.parse(JSON.stringify(obj)),
  /** Freezes an object preventing it from being modified.
   * @returns {object}
  */
  freeze: (obj) => Object.freeze(obj),
  /** Freezes and clones an object.
   * @returns object
  */
  freezeClone: (obj) =>
    Functional.freeze(Functional.clone(obj)),
  /**
   * Flattens an array of arrays into a single array.
   * @template T 
   * @param {T[][]} array 
   * @returns {any[]}
   */
  flatten(array) {
    return array.reduce((initial, current) => {
      return initial.concat(current);
    }, []);
  },
  /**
   * Allows you to trace information through a function call.
   * @param {any} label 
   * @param {any} val 
   */
  trace(label, val) {
    console.log(`${label} - ${val}`);
  },
  curry(f, ...args) {
    return (...args2) => f.apply(null, args.concat(args2));
  },
  /**
   * Returns a function that is a combination of all the entered functions.
   * Processing is done left to right.
   * @param {any} fns 
   * @returns {Function}
   */
  pipe(...fns) {
    return (data) => fns
      .reduce((value, fn) => fn(value), data);
  },
  /**
   * Returns a function that is a combination of all entered functions.
   * Processing is done right to left.
   * @param {any} fns 
   */
  compose(...fns) {
    return (data) =>
      fns.reduceRight((value, fn) => fn(value), data);
  },
  /** Returns a function that can be executed later. */
  task: (f) => () => f,
  /** Creates a function prototype that extends 
   * the other function prototype.
   * @returns {Function}
   */
  make(Fn, prototype) {
    Fn.prototype = Object.create(prototype);
    Fn.prototype.constructor = Fn;
    return Fn;
  },
  /**
   * General purpose map; works on all iterable objects.
   * @template T 
   * @param {Function} f 
   * @param {T} object
   * @returns {T}
   */
  map(f, array) {
    const copy = Amaryllis.Functional.clone(array);
    const props = Amaryllis.Functional.values(array).map(f);
    let i = 0;
    for(let prop in copy) {
      copy[prop] = props[i];
      i++;
    }
    return copy;
  },
  mapCl(f, array) {
    const obj = {};
    const props = Amaryllis.Functional.values(array).map(f);
    const names = Object.keys(array);
    let i = 0;
    for(let prop in array) {
      obj[names[i]] = props[i];
      i++;
    }
    return obj;
  },
  values(objecty) {
    const arr = [];
    for(const prop in object) {
      arr.push(object[prop]);
    }
    return arr;
  },
  toJSON(object) {
    const arr = [];
    for(const prop in object) {
      arr.push(prop);
      arr.push(object[prop]);
    }
  },
  toJSONMap(object) {
    const values = object.values();
    const keys = object.keys();
    let condition = true;
    const arr = [];
    while(condition) {
      const val = keys.next();
      const val2 = values.next();
      arr.push([val.value, val2.value]);
      condition = !val.done;
    }
    return arr;
  },
  /**
   * General purpose filter; works on all iterable objects.
   * @template T 
   * @param {Function} f 
   * @param {T} object
   * @returns {T}
   */
  filter(f, array) {
    const copy = Amaryllis.Functional.clone(array);
    const obj = new copy.constructor();
    const props = Object.entries(array)
      .filter((element) => {
        return f(element[1]);
      }).forEach(element => {
        obj[element[0]] = element[1];
      });
    return obj;
  },
  filterCl(f, array) {
    if(!Amaryllis.Util.nullOrUndefined(array)) {
      const obj = {};
      const props = Object.entries(array)
        .filter((element) => {
          return f(element[1]);
        }).forEach(element => {
          obj[element[0]] = element[1];
        });
      return obj;
    } else {
      return null;
    }
  },
  /**
   * Returns an array of numbers of the given range.
   * @param {number} start 
   * @param {number} end 
   * @returns {array}
   */
  range(start, end) {
    const arr = [];
    const diff = end - start;
    arr.length = diff;
    return arr.fill(start).map((x, index) => x + index);
  },
  /**
   * Takes a set amount of elements from the start of an array.
   * @param {number} amount 
   * @param {any[]} list 
   * @returns {any[]}
   */
  take(amount, list) {
    return list.slice(0, amount);
  },
  /**
   * Takes a set amount of elements from the end of an array.
   * @param {number} amount 
   * @param {any[]} list 
   * @returns {any[]}
   */
  drop(amount, list) {
    return list.slice(amount * -1);
  },
  arrayEquals(arr1, arr2) {
    return arr1.length === arr2.length &&
      arr1.every((el, index) => el === arr2[index]);
  },
  /**
   * Negates a number
   * @param {number} number 
   * @returns {number}
   */
  negate(number) {
    return number * -1;
  },
  /**
   * Turns the string into a boolean.
   * @param {string} string 
   * @returns {boolean}
   */
  toBoolean(string) {
    if(/true/ig.test(string))
      return true;
    if(/false/ig.test(string))
      return false;
    return false;
  },
  /**
   * Takes the value of a key from an object.
   * @param {string} key 
   * @returns {Function}
   */
  pluck(key) {
    return (object) => object[key];
  },
  /**
   * Returns an element from an array by index;
   * if no index is provided return a random element.
   * @template T 
   * @param {T[]} list 
   * @param {number} [index] 
   * @returns {T}
   */
  pick(list, index = 0) {
    if(index === undefined) {
      return list[Amaryllis.Num.floorRand(list.length)];
    } else
      return list[index];
  },
  /**
   * Returns the element entered.
   * @template T 
   * @param {T} variable 
   * @returns {T}
   */
  identity(variable) {
    return variable;
  },
  /**
   * Returns true if the element given is empty.
   * @template T 
   * @param {T} variable 
   * @returns {boolean}
   */
  isEmpty(variable) {
    if(variable === null || variable === undefined)
      return false;
    if(variable['length'] !== undefined) {
      if(variable['length'] <= 0)
        return true;
      if(variable['length'] > 0)
        return false;
    }
    for(let prop in variable) {
      if(variable['hasOwnProperty'](prop))
        return false;
    }

    return JSON.stringify(variable) === JSON.stringify({});
  }
};