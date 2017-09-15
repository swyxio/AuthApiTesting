# Testing Passport.js Authentication gated API routes with Mocha/Chai/Supertest

I faced frustration in the lack of good advice on Stackoverflow and on the Passport.js or the Supertest documentation regarding testing.

In my searching, this medium post came closest: <https://medium.com/@juha.a.hytonen/testing-authenticated-requests-with-supertest-325ccf47c2bb>

However, these are all callback based which caused bugs. I eventually promisified these functions to fit them within the modern `mocha` testing framework.

These examples should be easy to copy and easy to use. Please send PR's if there are important edge cases you want to test.


## How To

```
git clone https://github.com/sw-yx/AuthApiTesting.git
cd AuthApiTesting
npm install
npm test
```

the important file is [api.spec.js](https://github.com/sw-yx/AuthApiTesting/blob/master/api.spec.js). go nuts!

Talk to me [@swyx on twitter](http://twitter.com/swyx)