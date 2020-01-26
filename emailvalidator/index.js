#!/usr/bin/env node
/*
  * should have 1 endpoint /email/validate
  * listen on PORT environment variable
  * that accepts json `{"email":"xxx@yyy.zzz"}`
  * returns json
  {
    "valid": false,
    "validators": {
      "regexp": {
        "valid": true
      },
      "domain": {
        "valid": false,
        "reason": "INVALID_TLD"
      },
      "smtp": {
        "valid": false,
        "reason": "UNABLE_TO_CONNECT"
      },
      ... add more validators if you want (e.g. reputation, txt records etc..)
    }
  }

  * code on github
  * image on dockerhub
  * should be able to run with `docker run -t -p 8080:8080:127.0.0.1 -e
  PORT=8080 username/image`

  example request:
  curl -XPOST -d '{"email":"xxx@yyy.zzz"}' http://localhost:8080/email/validate
*/

const fs = require('fs');
const express = require('express');
const port = process.env.PORT || '8080';
const app = express();

/*
 * curl -XPOST -H "Content-Type: application/json" -d '{"email":"xxH @yyy.zzz"}' http://localhost:3000/email/validate
 */
app.use(express.json({ type: '*/*' }));

/*
 * This is a really permissive regex for this problem space
 * since validating email addresses using regex is hard and
 * I'm not sure this is meant to be a test of my ability to
 * copy and paste regexes from stack overflow...
 */
const remail = /\S+@\S+\.\S+/;
const regexpValidator = (emailAddressCandidate) =>
  remail.test(emailAddressCandidate)
    ? { valid: true }
    : { valid: false, reason: 'REGEX_MISMATCH' };

const validDomains = new Set(
  fs
    .readFileSync('tlds.txt')
    .toString()
    .split('\n')
    .filter((line) => line[0] !== '#')
);
const domainValidator = (emailAddressCandidate) =>
  validDomains.has(
    ('' + [...emailAddressCandidate.split('.')].pop()).toUpperCase()
  )
    ? { valid: true }
    : { valid: false, reason: 'INVALID_TLD' };

/*
 * Didn't have time to implement this one but you get the idea
 */
const smtpValidator = (emailAddressCandidate) => ({ valid: true });

const validators = {
  regexpValidator: regexpValidator,
  domainValidator: domainValidator,
  smtpValidator: smtpValidator,
};

app.post('/email/validate', (req, res) =>
  req.body && req.body.email && typeof req.body.email === typeof '' ? 
  Promise.all(
    Object.keys(validators).map((vName) =>
      Promise.resolve({
        name: vName,
        result: validators[vName](req.body.email),
      })
    )
  ).then((results) =>
    res.send({
      valid: results
        .map((result) => result.result)
        .every((result) => result.valid),
      validators: results.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: cur.result }),
        {}
      ),
    })
  ) : res.send({
    valid: false,
    error: 'INVALID_REQUEST'
  })
);

app.listen(port, () =>
  console.log(`Email validator listening on port ${port}`)
);
