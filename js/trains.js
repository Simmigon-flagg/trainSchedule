// Initialize Firebase
var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#firstTime-input").val().trim(), "DD/MM/YY").format("X");
  var freq = $("#freq-input").val().trim();

  var trains = {
    train: trainName,
    destination: destination,
    firstTime: firstTrain,
    freq: freq
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
  var firstTrain = childSnapshot.val().firstTime;
  var freq = childSnapshot.val().freq;
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % freq;

    // Minute Until Train
    var tMinutesTillTrain = freq - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    next_train =  moment(nextTrain).format("hh:mm a");

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    freq + "</td><td>" + next_train  + "</td><td>" + tMinutesTillTrain  + "</td><td>");
});
