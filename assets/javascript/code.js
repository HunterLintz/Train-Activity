		// Your web app's Firebase configuration
		var firebaseConfig = {
			apiKey: "AIzaSyDUSiXE7cfQHQdI9ZvM4hcQ3l7dGIW-D2Y",
			authDomain: "test-project-fd97d.firebaseapp.com",
			databaseURL: "https://test-project-fd97d.firebaseio.com",
			projectId: "test-project-fd97d",
			storageBucket: "test-project-fd97d.appspot.com",
			messagingSenderId: "871731808302",
			appId: "1:871731808302:web:abdb00f3b7c72cb9e777bf",
			measurementId: "G-QSP75S7CYG"
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
		var db = firebase.database();
		//Function to add a Train
		$("#add-train-btn").on("click", function(event){
			event.preventDefault();
			var destination = $("#destination-input").val().trim();
			var firstTT = $("#train-time-input").val().trim();
			var frequency = $("#freq-input").val().trim();
			var newTrain = {
				dest:destination,
				fTT:firstTT,
				freq:frequency
			};
			db.ref().push(newTrain);
			alert("Train Added Successfully!");
			$("#destination-input").val("");
			$("#train-time-input").val("");
			$("#freq-input").val("");
		});
		//Function that converts times and gets data from database
		db.ref().on("child_added", function(childSnapshot){
			var destination = childSnapshot.val().dest;
			var firstTT = childSnapshot.val().fTT;
			var frequency = childSnapshot.val().freq;
			var firstTimeConverted = moment(firstTT, "HH:mm").subtract(1, "years");
			var currentTime = moment();
			var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
			var tRemain = diffTime % frequency;
			var tMinutesTillTrain = frequency - tRemain;
			var nextTrain = moment().add(tMinutesTillTrain, "minutes");
			var nextTrainPretty = (moment(nextTrain).format("hh:mm"));
			//Creates new row with data
			var newRow = $("<tr>").append(
				$("<td>").text(destination),
				$("<td>").text(frequency),
				$("<td>").text(nextTrainPretty),
				$("<td>").text(tMinutesTillTrain)
			);
			//Appends new row to table
			$("#train-table > tbody").append(newRow);

		});