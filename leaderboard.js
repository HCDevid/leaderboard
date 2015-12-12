PlayersList = new Mongo.Collection('players');
  
if(Meteor.isClient){

  Template.leaderboard.helpers({
    'player' : function() {
      return PlayersList.find( {} , {sort: {score: -1, name: 1} })
    },
    'playerCount' : function() {
      return PlayersList.find().count()
    },
    'showSelectedPlayer' : function() {
      var selectedPlayer = Session.get('selectedPlayer')
      return PlayersList.findOne(selectedPlayer)
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
    },
    'click .remove' : function() {
      var selectedPlayer = Session.get('selectedPlayer')
      var removeCheck = window.confirm("Are you sure you want to remove this player?")
      if (removeCheck == true) {
        PlayersList.remove(selectedPlayer)
      } else {
        return
      }
    }
  })

  Template.addPlayerForm.events({
    'submit form' : function(ev) {
      ev.preventDefault()
      var playerNameVar = ev.target.playerName.value
      var playerScoreVar = ev.target.score.value
      console.log(playerNameVar)
      console.log(playerScoreVar)
      PlayersList.insert({
        name: playerNameVar,
        score: playerScoreVar
      })
      ev.target.playerName.value = ''
      ev.target.score.value = 0
    }
  })

}

if(Meteor.isServer){
  console.log("Server checking in after client call");
}