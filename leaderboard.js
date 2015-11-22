PlayersList = new Mongo.Collection('players');
  
if(Meteor.isClient){

  Template.leaderboard.helpers({
    'player' : function() {
      return PlayersList.find( {} , {sort: {score: -1, name: 1} })
    },
    'playerCount' : function() {
      return PlayersList.find().count()
    },
    'selectedClass' : function() {
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer')
      if(playerId == selectedPlayer){
        return 'selected'
      }
    },
    'other' : function() {
      return "other template helper check"
    }
  })

  Template.leaderboard.events({
    'click .player' : function() {
      var playerId = this._id
      Session.set('selectedPlayer', playerId);
    },
    'click .increment' : function() {
      var selectedPlayer = Session.get('selectedPlayer')
      PlayersList.update(selectedPlayer, {$inc : {score : 5} })
    },
    'click .decrement' : function() {
      var selectedPlayer = Session.get('selectedPlayer')
      PlayersList.update(selectedPlayer, {$inc : {score : -5} })
    }
  })

}

if(Meteor.isServer){
  console.log("Server checking in after client call");
}