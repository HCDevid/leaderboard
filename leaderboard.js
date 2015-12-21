PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){

  Meteor.subscribe('thePlayers')

  Template.leaderboard.helpers({
    'player' : function() {
      var currentUserId = Meteor.userId()
      return PlayersList.find( {}, {sort: {score: -1, name: 1} })
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
      Meteor.call('modifyPlayerScore', selectedPlayer, 5)
    },
    'click .decrement' : function() {
      var selectedPlayer = Session.get('selectedPlayer')
      Meteor.call('modifyPlayerScore', selectedPlayer, -5)
    },
    'click .remove' : function() {
      var selectedPlayer = Session.get('selectedPlayer')
      var removeCheck = window.confirm("Are you sure you want to remove this player?")
      if (removeCheck == true) {
        Meteor.call('removePlayerData', selectedPlayer)
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
      var currentUserId = Meteor.userId()
      Meteor.call('insertPlayerData', playerNameVar, playerScoreVar, currentUserId)
      ev.target.playerName.value = ''
      ev.target.score.value = 0
    }
  })

}

if(Meteor.isServer){

  Meteor.publish('thePlayers', function() {
    var currentUserId = this.userId
    return PlayersList.find({createdBy: currentUserId})
  })


  Meteor.methods({

    'insertPlayerData' : function(playerNameVar, playerScoreVar, currentUserId) {
      console.log(playerNameVar)
      console.log(playerScoreVar)
      console.log(currentUserId)
      PlayersList.insert({
        name: playerNameVar,
        score: Number(playerScoreVar),
        createdBy: currentUserId
      })
    },

    'removePlayerData' : function(selectedPlayer) {
      var currentUserId = Meteor.userId()
      PlayersList.remove({_id: selectedPlayer, createdBy: currentUserId})
    },

    'modifyPlayerScore' : function(selectedPlayer, scoreValue) {
      console.log(selectedPlayer)
      console.log(scoreValue)
      var currentUserId = Meteor.userId()
      PlayersList.update({_id: selectedPlayer, createdBy: currentUserId}, {$inc: {score: scoreValue} })
    }

  })

}
