const router = require("express").Router();
const { user } = require("./db.models.user");

// authentication endpoint
router.post("/login", (req, res, next) => {
  req.login(user, err => (err ? next(err) : res.json(user)));
});

// an unshielded public route just to make sure mocha/chai/supertest work
router.get("/public", (req, res) => {
  res.json({ answer: null });
});

// route middleware to make sure a user is logged in
function isSelf(req, res, next) {
  console.log("********", req.params);
  console.log("********", req.user);
  return req.params.id == req.user.id ? next() : res.err("unauthorised");
}

// the route to test
router.get("/answer/:id", isSelf, (req, res) => {
  res.json({ answer: 42 });
});

module.exports = router;
