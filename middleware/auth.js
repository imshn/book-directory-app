const checkLoggedIn = (req, res, next) => {
  if (!req.session.user)
    return res.status(401).send("You must be logged in to view this page.");
  return next();
};

const checkUserType = (req, res, next) => {
  if (req.session.user.type === "reader")
    return res
      .status(403)
      .send("You must be the author to make any changes to this book.");
  return next();
};

module.exports = { checkLoggedIn, checkUserType };
