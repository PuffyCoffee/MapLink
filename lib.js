(function(global) {

	var isShiftKeyPressed = false;

	window.onkeydown = function(event) {
		if (event.shiftKey) {
			isShiftKeyPressed = true;
		}
	};
	window.onkeyup = function(event) {
		isShiftKeyPressed = false;
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
		this.link = function() {
			if (this.mapType == "google") {

			} else if (this.mapType == "nokia") {

			} else { //Support other map in the future

			}
		};

	};
	global.LineCreator = LineCreator;
} (window));













