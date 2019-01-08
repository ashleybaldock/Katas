npm install

npm run test

Implementation in encodeCycles.js

Tests in encodeCycles.test.js (written using Jest)

Test file has some comments on things I was unsure about, and the main code is commented for anything interesting :)


##

Instructions
In the current implementation of the JSON object, it is not possible to encode cyclic data structures. Here is an example:

```
> const myArray = [1, 'a'] undefined
> myArray[2] = myArray
[ 1, 'a', [Circular] ]
> JSON.stringify(myArray)
TypeError: Converting circular structure to JSON
```

We would like you to extend the JSON object with a new function that will allow us to encode cyclic data structures.

The new function is described below, together with an example.

```
JSON.encodeCycles(arg)
```

This function should accept as input any JavaScript data structure and return a copy of that object. In the case that any cyclic structures exist within the input, they should be replaced with an object of the form:

```
{"$ref": PATH}
```

Where PATH is a JSONPath string that locates the first occurrance. Here is an example:
 
```
> const myArray = [1, 'a']
> myArray[2] = myArray
[ 1, 'a', [Circular] ]
> JSON.encodeCycles(myArray) [ 1, 'a', { '$ref': '$' } ]
```
