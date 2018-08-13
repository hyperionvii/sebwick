var map, heatmap, infoWindow, pos, marker, latitude, longitude, point, date, time, user;

        
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 15
    });

      heatmap = new google.maps.visualization.HeatmapLayer({
      data: getPoints(),
      map: map
    });

    infoWindow = new google.maps.InfoWindow;

  // Geolocates the user, if they allow them to!

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        // Allows the marker to be movable and sets the marker to be displayed at the user's position.   
        marker = new google.maps.Marker({
          position: pos,
          map: map,
          draggable:true,
          title:"Drag me!"
        })

        // Visually displays the marker at the user's location.
        infoWindow.set(marker);
        infoWindow.open(map);
        map.setCenter(pos);
        
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });

    } else {
      // Calls the function that handles a user that doesn't use geolocation.  We will need to modify this to display a way for them to input location information.
      handleLocationError(false, infoWindow, map.getCenter());
    }

    // nullUserRedirect()


    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAQ-azVhuthS50Jqfr8oWXMJHFtOI3f74o",
    authDomain: "trashie-4266e.firebaseapp.com",
    databaseURL: "https://trashie-4266e.firebaseio.com",
    projectId: "trashie-4266e",
    storageBucket: "trashie-4266e.appspot.com",
    messagingSenderId: "184251165998"
  };
  firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    //updates table with user specific info

    database.ref().on("child_added", function(childSnapshot) {
      tableData.push(new google.maps.LatLng(childSnapshot.val().lat, childSnapshot.val().lng))
      user = firebase.auth().currentUser.email
      if(user === childSnapshot.val().user) {
        updateTable(childSnapshot.val());
      }
    });



    //clicking on save updates the lat and long on html and table.
    $(document).on("click", '#save', function(event) {

      latitude = marker.getPosition().lat();
      longitude = marker.getPosition().lng();
      date = moment().format("MM/DD/YY");
      time = moment().format("hh:mm:ss");
      user = firebase.auth().currentUser.email;

      document.getElementById("latitude").value = latitude;
      document.getElementById("longitude").value = longitude;

      // updateTable();


      tableData.push(new google.maps.LatLng(latitude, longitude));


      event.preventDefault();

      // Creates local "temporary" object for holding User's data
      database.ref().push({
          date: date,
          time: time,
          lat: latitude,
          lng: longitude,
          user: user
      });
      

      // Logs everything to console
      console.log(date);
      console.log(time);
      console.log(latitude);
      console.log(longitude);

      // Alert
      alert("Trash location successfully added!");
    })
  }



  // Geolocation not accepted by user - function.
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }



  // Update table with date, time, location information.
  function updateTable(data) {
    $("#trashTable").append("<tr><td id='date'>" + data.date + "</td><td id='time'>" + data.time + "</td><td id='point'>" +
    data.lat + "</td><td id='point'>" +
    data.lng + "</td><td id='user'>" + user + "</td></td>");
  }


  //GeoLocation not accepted my user - function. 
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
    streetAdd();
  }



  function streetAdd(){
    $('#map').after('<p id="instruct">Log Trash Site:</p>');
    $('#instruct').after('<form id="addEnter" class="form-inline"></form>');
    $('#addEnter').append('<div id="form-group1" class="form-group"></div>');
    $('#form-group1').append('<label for="street">Address</label>');
    $('#form-group1').append('<input type="text" class="form-control" id="address" placeholder="123 Street, City, State Zip">');
    $('#form-group1').append('<button type="submit" class="submitAddress btn btn-default">Enter</button>')
  }



  $(document).on('click', '.submitAddress', function(e){
    e.preventDefault();
    var address = $('#address').val();
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': address}, function (result) {
      latitude = result[0].geometry.location.lat();
      longitude = result[0].geometry.location.lng();
      $('#latitude').val(latitude);
      $('#longitude').val(longitude);
      console.log(latitude);
      console.log(longitude);
      document.getElementById("longitude").value = longitude;

      date = moment().format("MM/DD/YY");
      time = moment().format("hh:mm:ss");
      user = firebase.auth().currentUser.email;

      // updateTable();

      var newLocationData = {
          date: date,
          time: time,
          lat: latitude,
          lng: longitude,
          user: user
      };

      database = firebase.database();

      database.ref().push(newLocationData);

      alert("Trash location successfully added!");
    });
  });



  function toggleHeatmap() {
    heatmap.setMap(heatmap.getMap() ? null : map);
  }

  function changeGradient() {
    var gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ]
    heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
  }

  function changeRadius() {
    heatmap.set('radius', heatmap.get('radius') ? null : 20);
  }

  function changeOpacity() {
    heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
  }

  var tableData = [];
  // Heatmap data: 500 Points
  function getPoints() {
    return tableData;
  };


  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    redirect()
  });

  function redirect() {
    document.location.href ="../../login.html";
  }

  // function nullUserRedirect() {
  //   user = firebase.auth().currentUser.email
  //   if (user === 'null') {
  //     alert("User is not loged in!")
  //   }
  // }

