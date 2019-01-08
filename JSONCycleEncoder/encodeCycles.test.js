require('./encodeCycles');

// For production code I would definitely clean up this tests file a bit,
// e.g. try and remove duplication in the test setups and split it into test suites

// JSON spec permits root element to be string/number/boolean/null type
test('returns root string', () => {
  let obj = 'string';
  let expected = 'string';
  expect(JSON.encodeCycles(obj)).toEqual(expected);
});

test('returns root number', () => {
  let obj = 12;
  let expected = 12;
  expect(JSON.encodeCycles(obj)).toEqual(expected);
});
test('returns root boolean', () => {
  let obj = true;
  let expected = true;
  expect(JSON.encodeCycles(obj)).toEqual(expected);
});
test('returns root null', () => {
  let obj = null;
  let expected = null;
  expect(JSON.encodeCycles(obj)).toEqual(expected);
});

test('returns copy of empty object', () => {
  let obj = {};
  let expected = {};
  expect(JSON.encodeCycles(obj)).toEqual(expected);
  expect(JSON.encodeCycles(obj)).not.toBe(obj);
});

test('returns copy of object with properties', () => {
  let obj = {
    a: 'string',
    b: 12
  };
  let expected = {
    a: 'string',
    b: 12
  };
  expect(JSON.encodeCycles(obj)).toEqual(expected);
  // Several tests ensure object is a copy
  expect(JSON.encodeCycles(obj)).not.toBe(obj);
});

test('returns copy of empty array', () => {
  let array = [];
  let expected = [];
  expect(JSON.encodeCycles(array)).toEqual(expected);
  expect(JSON.encodeCycles(array)).not.toBe(array);
});

test('returns copy of array with members', () => {
  let array = ['string', 12];
  let expected = ['string', 12];
  expect(JSON.encodeCycles(array)).toEqual(expected);
  expect(JSON.encodeCycles(array)).not.toBe(array);
});

test('returns array with properties and self reference replaced', () => {
  let array = ['string', 12];
  array[2] = array;
  let expected = [
    'string',
    12,
    { $ref: '$' }
  ];
  expect(JSON.encodeCycles(array)).toEqual(expected);
  expect(JSON.encodeCycles(array)).not.toBe(array);
});

test('returns object with properties and self reference replaced', () => {
  let obj = {
    b: 'string',
    c: 12
  };
  obj.a = obj;
  let expected = {
    a: { $ref: '$' },
    b: 'string',
    c: 12
  };
  expect(JSON.encodeCycles(obj)).toEqual(expected);
  expect(JSON.encodeCycles(obj)).not.toBe(obj);
});

test('nested object copied', () => {
  let rootObj = {
    nestedObj: {
      d: 'nested',
      e: 13
    },
    b: 'string',
    c: 12,
  };
  let expected = {
    nestedObj: {
      d: 'nested',
      e: 13,
    },
    b: 'string',
    c: 12
  };
  expect(JSON.encodeCycles(rootObj)).toEqual(expected);
  expect(JSON.encodeCycles(rootObj).nestedObj).toEqual(expected.nestedObj);
  expect(JSON.encodeCycles(rootObj).nestedObj).not.toBe(rootObj.nestedObj);
});

test('nested object with root reference', () => {
  let rootObj = {
    nestedObj: {
      d: 'nested',
      e: 13
    },
    b: 'string',
    c: 12,
  };
  rootObj.nestedObj.f = rootObj;
  let expected = {
    nestedObj: {
      d: 'nested',
      e: 13,
      f: { $ref: '$' }
    },
    b: 'string',
    c: 12
  };
  expect(JSON.encodeCycles(rootObj)).toEqual(expected);
});

test('nested array copied', () => {
  let rootArray = ['string', 12];
  rootArray[2] = ['nestedArray', 13];
  let expected = [
    'string',
    12,
    [
      'nestedArray',
      13
    ]
  ];
  expect(JSON.encodeCycles(rootArray)).toEqual(expected);
  expect(JSON.encodeCycles(rootArray)[2]).toEqual(expected[2]);
  expect(JSON.encodeCycles(rootArray)[2]).not.toBe(rootArray[2]);
});

test('nested array with root reference', () => {
  let rootArray = ['string', 12];
  rootArray[2] = ['nestedArray', 13, rootArray];
  let expected = [
    'string',
    12,
    [
      'nestedArray',
      13,
      { $ref: '$' }
    ]
  ];
  expect(JSON.encodeCycles(rootArray)).toEqual(expected);
});

test('nested array in object with root reference', () => {
  let rootObj = {
    nestedArray: [
      'nestedArray',
      13
    ],
    b: 'string',
    c: 12,
  };
  rootObj.nestedArray[2] = rootObj;
  let expected = {
    nestedArray: [
      'nestedArray',
      13,
      { $ref: '$' }
    ],
    b: 'string',
    c: 12
  };
  expect(JSON.encodeCycles(rootObj)).toEqual(expected);
});

test('nested object in array with root reference', () => {
  let rootArray = ['string', 12];
  rootArray[2] = {
    d: 'nestedObj',
    e: 13
  };
  rootArray[2].nestedObj = rootArray;
  let expected = [
    'string',
    12,
    {
      d: 'nestedObj',
      e: 13,
      nestedObj: { $ref: '$' }
    }
  ];
  expect(JSON.encodeCycles(rootArray)).toEqual(expected);
});

// Tests beyond this point implement JSONpath construction
test('nested object with self reference', () => {
  let rootObj = {
    nestedObj: {
    }
  };
  rootObj.nestedObj.rootRef = rootObj;
  rootObj.nestedObj.selfRef = rootObj.nestedObj;
  let expected = {
    nestedObj: {
      rootRef: { $ref: '$' },
      selfRef: { $ref: '$[nestedObj]' }
    }
  };
  expect(JSON.encodeCycles(rootObj)).toEqual(expected);
});

test('root object with two references to child', () => {
  let rootObj = {
    nestedObj: { },
  };
  rootObj.nestedObj.rootRef = rootObj;
  rootObj.nestedObj.selfRef = rootObj.nestedObj;
  rootObj.nestedObj2 = rootObj.nestedObj;
  let expected = {
    nestedObj: {
      rootRef: { $ref: '$' },
      selfRef: { $ref: '$[nestedObj]' }
    },
    nestedObj2: { $ref: '$[nestedObj]' }
  };
  expect(JSON.encodeCycles(rootObj)).toEqual(expected);
});

test('nested array with self references', () => {
  let rootArray = [
    []
  ];
  rootArray[0][0] = rootArray;
  rootArray[0][1] = rootArray[0];
  rootArray[1] = rootArray;
  let expected = [
    [
      { $ref: '$' },
      { $ref: '$[0]' }
    ],
    { $ref: '$' }
  ];
  expect(JSON.encodeCycles(rootArray)).toEqual(expected);
});

// Slightly undefined behaviour here - what if there are two references to the same object
// at the same level, which one is replaced with the $ref?
// Ordering of iteration of JS object keys is technically undefined
// For the output of encodeCycles to be fully deterministic we'd need to implement our own
// explicit ordering in the Object.keys().forEach loop
test('root object with two references to child (reversed)', () => {
  let rootObj = {
    nestedObj2: {}
  };
  rootObj.nestedObj2.rootRef = rootObj;
  rootObj.nestedObj2.selfRef = rootObj.nestedObj2;
  rootObj.nestedObj = rootObj.nestedObj2;
  let expected = {
    nestedObj2: {
      rootRef: { $ref: '$' },
      selfRef: { $ref: '$[nestedObj2]' }
    },
    nestedObj: { $ref: '$[nestedObj2]' }
  };
  expect(JSON.encodeCycles(rootObj)).toEqual(expected);
});

test('several layers deep', () => {
  let rootObj = {
    nested1: {
      nested2: {
        nested3: {
        }
      }
    }
  };
  rootObj.nested1.nested2.nested3.rootRef = rootObj;
  rootObj.nested3ref = rootObj.nested1.nested2.nested3;
  let expected = {
    nested1: {
      nested2: {
        nested3: {
          rootRef: { $ref: '$' }
        }
      }
    },
    nested3ref: { $ref: '$[nested1][nested2][nested3]' }
  };
  expect(JSON.encodeCycles(rootObj)).toEqual(expected);
});

test('mix of objects and arrays', () => {
  let rootObj = {
    nested1: {
      nested2: {
        array2: [
          'array2'
        ],
        nested3: {
          array3: [
            'array3'
          ]
        }
      }
    },
    array1: [
      'array1',
      {
        nested4: {
        }
      },
    ]
  };
  rootObj.nested1.nested2.nested3.rootRef = rootObj;
  rootObj.nested3ref = rootObj.nested1.nested2.nested3;
  rootObj.array1[2] = rootObj.nested1.nested2.array2;
  rootObj.nested1.arrayRef1 = rootObj.array1[1];
  let expected = {
    nested1: {
      nested2: {
        array2: [
          'array2'
        ],
        nested3: {
          rootRef: { $ref: '$' },
          array3: [
            'array3'
          ],
        }
      },
      // Another slightly ill-defined behaviour, the formatting of the output depends
      // entirely upon the order in which the tree structure is traversed
      // Although this doesn't matter a great deal
      arrayRef1: {
        nested4: {}
      }
    },
    array1: [
      'array1',
      { $ref: '$[nested1][arrayRef1]' },
      { $ref: '$[nested1][nested2][array2]' }
    ],
    nested3ref: { $ref: '$[nested1][nested2][nested3]' }
  };
  expect(JSON.encodeCycles(rootObj)).toEqual(expected);
});
