((JSON) => {
  JSON.encodeCycles = (root) => {

    function isReallyObject (thing) {
      return typeof thing === 'object'
        && thing !== null
        && !(thing instanceof Boolean)
        && !(thing instanceof Number)
        && !(thing instanceof String);
    }

    function extendJSONPath (base, selector) {
      return `${base}[${selector}]`;
    }

    // This is O(n) for lookup which isn't ideal, probably could be better done using a map of some kind
    // But you can't use objects directly as keys in JS
    // On the plus side, real-world lookup time will favour objects seen earlier in the hierarchy
    let seenObjects = [];

    // If object is a reference to one we have already seen return replacement reference
    function haveSeen (input) {
      let seen = seenObjects.find((element) => {
        return element.obj === input;
      });
      let path = seen ? seen.path : '';
      return { seen: seen !== undefined, path: path };
    }

    function addToSeen (input, path) {
      // This doesn't check that the input isn't already in seenObjects
      // But we are doing that check at the start of recurse() anyway
      seenObjects.push({ obj: input, path: path });
    }

    function recurse (input, currentPath) {
      let seen = haveSeen(input);
      if (seen.seen) {
        return { $ref: seen.path };
      } else {
        addToSeen(input, currentPath);
      }

      if (Array.isArray(input)) {
        let array = input;
        let out = [];
        array.forEach((element, index) => {
          out[index] = recurse(element, extendJSONPath(currentPath, index));
        });
        return out;
      }

      if (isReallyObject(input)) {
        let object = input;
        let out = {};

        Object.keys(object).forEach((name) => {
          out[name] = recurse(object[name], extendJSONPath(currentPath, name));
        });
        return out;
      }

      return input;
    }

    return recurse(root, '$');
  };
})(JSON);
