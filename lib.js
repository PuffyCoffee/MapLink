(function(global) {

	var isShiftKeyPressed = false;
	var path_flag = [true, true]; //path slot 0 and 1 writable.
	var path = [{}, {}];

	window.onkeydown = function(event) {
		if (event.shiftKey) {
			console.log("clicked shift");
			isShiftKeyPressed = true;
		}
	};
	window.onkeyup = function(event) {
		console.log("released shift key");
		isShiftKeyPressed = false;
		//reset flag
		path_flag = [true, true];
		path = [{}, {}];
	};

	var LineCreator = function() {
		//private variable
		var private_createdDate = "5/29/2013";
		
		//private method
		
		//public field
		this.version = "1.0";
		this.mapType = "google";

		//API

		this.getVersion = function() {
			return this.version;
		};
		this.setMapType = function(mapType) {
			this.mapType = mapType;
		};
		this.googleMap = function() {
			this.mapType = "google";
			return this;
		};
		this.nokiaMap = function() {
			this.mapType = "nokia";
			return this;
		};
		this.getMapType = function() {
			return this.mapType;
		};

		//for testing purpose
		this.getPathFlag = function() {
			return path_flag;
		};

		this.getPath = function() {
			return path;
		};

		this.setPathFlag = function(marker) {
			for (var i = 0; i < 2; i += 1) {
				if (path_flag[i]) {
					path_flag[i] = false;
					return "flag set";
				} 
			}
		};

		this.savePosition = function(lat, lng) {
			if (path_flag[0]) { //slot 1 is writable
				path[0] = {
					lat: lat,
					lng: lng
				};	
				return "position 1 saved.";			
			} else if (path_flag[1]) { //slot 2 is writable
				path[1] = {
					lat: lat,
					lng: lng
				};
				return "position 2 saved.";
			}
		};
		this.stopAnimation = function(marker) {
			marker.setAnimation(null);
		};
		this.link = function(marker) {
			if (isShiftKeyPressed) {
				if (this.mapType == "google") {
					var myTrip = [
						new google.maps.LatLng(path[0].lat, path[0].lng), 
						new google.maps.LatLng(path[1].lat, path[1].lng)
					];
					var line = new google.maps.Polyline({
						path: myTrip,
					  	strokeColor: "#0000FF",  //Change strokeColor here
					  	strokeOpacity: 0.9,
					  	strokeWeight: 3          //Change strokeWeight here
					});
					marker.setAnimation(google.maps.Animation.DROP);
					return line; //line.setMap(map)
				} else if (this.mapType == "nokia") {
					// console.log("coord1: ", new nokia.maps.geo.Coordinate(path[0].lat, path[0].lng));
					// console.log("coord2: ", new nokia.maps.geo.Coordinate(path[1].lat, path[1].lng));

					if (typeof path[1].lat !== "undefined" && typeof path[1].lat !== "undefined") {
						var line = new nokia.maps.map.Polyline([
							new nokia.maps.geo.Coordinate(path[0].lat, path[0].lng),
							new nokia.maps.geo.Coordinate(path[1].lat, path[1].lng)
						], {
							pen: new nokia.maps.util.Pen({
								lineWidth: 3,
								strokeColor: "#4185F3"
							})
						});
						return line; //map.objects.add(line);
					}
				} else { //Support other map in the future

				}
			} else {
				//if shift key not pressed, clean up all path data
				isShiftKeyPressed = false;
				//reset flag
				path_flag = [true, true];
				path = [{}, {}];
			}
		};
	};
	global.LineCreator = LineCreator;
} (window));













