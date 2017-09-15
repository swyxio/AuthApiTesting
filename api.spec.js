const { expect } = require("chai");
const request = require("supertest");
const { User, user } = require("./db.models.user");
const app = require("./index");

// modified from https://medium.com/@juha.a.hytonen/testing-authenticated-requests-with-supertest-325ccf47c2bb
// authenticatedRequest function. this did not work for me
// function createAuthenticatedRequest(cb) {
//   agent.post("/api/login").send(user).end(function(error, response) {
//     if (error) {
//       throw error;
//     }
//     cb(agent);
//   });
// }
function promisedAuthRequest() {
  var authenticatedagent2b = request.agent(app);
  return new Promise((resolve, reject) => {
    authenticatedagent2b
      .post("/api/login")
      .send(user)
      .end(function(error, response) {
        if (error) reject(error);
        resolve(authenticatedagent2b);
      });
  });
}

// https://medium.com/@juha.a.hytonen/testing-authenticated-requests-with-supertest-325ccf47c2bb
// Auxiliary function - passes cookie to callback, you should use it to set cookie on your request inside the callback
// however there is a subtle bug here - promises and callbacks do not mix. this leads to the test always passing without authenticating
// function createLoginCookie(cb) {
//   request(app).post("/api/login").send(user).end(function(error, response) {
//     if (error) {
//       throw error;
//     }
//     var loginCookie = response.headers["set-cookie"];
//     cb(loginCookie);
//   });
// }

function promisedCookie() {
  return new Promise((resolve, reject) => {
    request(app).post("/api/login").send(user).end(function(error, response) {
      if (error) reject(error);
      var loginCookie = response.headers["set-cookie"];
      resolve(loginCookie);
    });
  });
}

describe("routes", () => {
  it("hits a public route successfully", () => {
    return request(app).get("/api/public").expect(200).then(res => {
      expect(res.body.answer).to.be.null;
    });
  });

  it("hits a private route with superagent authentication", () => {
    return promisedAuthRequest().then(authenticatedagent => {
      return authenticatedagent.get("/api/answer/1").expect(200).then(res => {
        expect(res.body.answer).to.equal(42);
      });
    });
  });

  xit("hits a private route with supertest authentication and cookie", () => {
    return promisedCookie().then(cookie => {
      console.log("cookie is called", cookie);
      const req = request(app)
        .get("/api/answer/1") // change to 2 and this fails
        .set("cookie", cookie)
        .expect(200)
        .then(res => {
          expect(res.body.answer).to.equal(42);
        });
      return req;
    });
  });
});
