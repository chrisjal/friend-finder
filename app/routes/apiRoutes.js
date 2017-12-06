// Link routes to data sources
var friends = require("../data/friends");

module.exports = function(app) {
  // API GET Requests
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  // API POST Requests
  app.post("/api/friends", function(req, res) {
    const newFriendMatch = {
      name: "",
      photo: "",
      difference: 500
    };

    const user = req.body;
    const userScore = user.userScore;
    let totalDiff;

    // Loop through all friends in the friend db to compare with
    for (var i = 0; i < friends.length; i++) {
      const currentUser = friends[i];
      // Loop through the current user's score to find comparable friend matches based on score
      for (var j = 0; j < currentUser.length; j++) {
        totalDiff += Math.abs(parseInt(currentUser.scores[j]) - parseInt(userScore[j]))
      }

      if (totalDiff <= newFriendMatch) {
        newFriendMatch.name = currentUser.name;
        newFriendMatch.photo = currentUser.photo;
        newFriendMatch.difference = totalDiff;
      }
    }
    // Push this user's responses to the friends array
    friends.push(user);
    // Return JSON w/ current user's match based on score
    res.json(newFriendMatch);
  });
};