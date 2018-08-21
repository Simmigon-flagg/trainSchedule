// Initialize Firebase
var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTime = $("#firstTime-input").val().trim();
  var freqs = $("#freq-input").val().trim();

  var trains = {
    train: trainName,
    destination: destination,
    first: firstTime,
    freq: freqs
  };

  database.ref().push(trains);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTime-input").val("");
  $("#freq-input").val("");
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var first_Time = childSnapshot.val().first;
  var trainfreq = childSnapshot.val().freq;

    var firstTimeConverted = moment(first_Time, "HH:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % trainfreq;

    // Minute Until Train
    var tMinutesTillTrain = trainfreq - tRemainder;
  
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm a");
  // console.log(next_train);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    trainfreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain  + "</td><td>");
});
