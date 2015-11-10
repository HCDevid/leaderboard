PlayersList = new Mongo.Collection('players');
  
if(Meteor.isClient){
  console.log("hello bros!");
}

if(Meteor.isServer){
  console.log("Server checking in after client call");
}