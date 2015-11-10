PlayersList = new Mongo.Collection('players');
  
if(Meteor.isClient){

  Template.leaderboard.helpers({
    'player' : function() {
      return PlayersList.find()
    },
    'playerCount' : function() {
      return PlayersList.find().count()
    },
    'other' : function() {
      return "other template helper check"
    }
  })
}

if(Meteor.isServer){
  console.log("Server checking in after client call");
}