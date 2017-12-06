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

    let user = req.body;
    let userScore = user.scores;
    let totalDiff;

    // Loop through all friends in the friend db to compare with
    for (var i = 0; i < friends.length; i++) {
      let friendCompare = friends[i];
      totalDiff = 0;
      // Loop through the current user's score to find comparable friend matches based on score
      for (var j = 0; j < friendCompare.scores.length; j++) {
        let friendCompareScore = friendCompare.scores[j];
        let currentUserScore = userScore[j];
        totalDiff += Math.abs(parseInt(friendCompareScore) - parseInt(currentUserScore))
      }

      if (totalDiff <= newFriendMatch) {
        newFriendMatch.name = friendCompare.name;
        newFriendMatch.photo = friendCompare.photo;
        newFriendMatch.difference = totalDiff;
      }
    }
    // Push this user's responses to the friends array
    friends.push(user);
    // Return JSON w/ current user's match based on score
    res.json(newFriendMatch);
  });
};