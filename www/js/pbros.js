var watchId=null;

$( '#mapLocPage' ).live( 'pageinit',function(event){
  initialize();
});

$(document).bind('mobileinit', function(){
    $.mobile.metaViewportContent = 'width=device-width, minimum-scale=1, maximum-scale=2';
    $.mobile.loader.prototype.options.text = "loading";
});

$('#feedbackButtonId').live('click',function(){
	var message = document.getElementById("feedbackTextArea").value;
	sendFeedback(message);
	document.getElementById("feedbackTextArea").value='';
});

function initialize() {
	console.log("In the initialize section ....");
	var geoLocationOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
	navigator.geolocation.getCurrentPosition(onGeoLocSuccess, onGeoLocError,geoLocationOptions);
}
	
function onGeoLocSuccess(position){
//Draw the map now
	nokia.Settings.set("appId", "ErHSJAYLUN4jj9b1mNAu"); 
	nokia.Settings.set("authenticationToken", "1yK4ZaKZa-tg9aFh6X_eEw");
	var infoBubbles = new nokia.maps.map.component.InfoBubbles(),marker;
	var mymap = new nokia.maps.map.Display(
   		document.getElementById("map_canvas_2"),
   		{
    		components: [ 
            // Behavior collection
            	infoBubbles,
            	new nokia.maps.map.component.Behavior(),
            	new nokia.maps.map.component.ZoomBar(),
            	new nokia.maps.map.component.Overview(),
            	new nokia.maps.map.component.TypeSelector(),
            	new nokia.maps.map.component.ScaleBar()
             ],	
        	'zoomLevel': 11,
        	'center': [position.coords.latitude , position.coords.longitude] 
    	}
    );
	mymap.set("baseMapType", nokia.maps.map.Display.NORMAL);
	//Add Marker
	mymap=addMarker(position,mymap);
	//Add route
	createRoute(mymap,position);
}

function createRoute(mymap,position){
		
	var waypoints = new nokia.maps.routing.WaypointParameterList();
	waypoints.addCoordinate(new nokia.maps.geo.Coordinate(35.088061,-80.877247));
	waypoints.addCoordinate(new nokia.maps.geo.Coordinate(position.coords.latitude , position.coords.longitude));

	var modes = [{    
   		type: "shortest",
    	transportModes: ["car"],
    	options: "avoidTollroad",
    	trafficMode: "default"
	}];
	var router = new nokia.maps.routing.Manager(); 
	var onRouteCalculated = function(observedRouter, key, value){
	var t = value;
    if (value == "finished") {
        	var routes = observedRouter.getRoutes();
 			var mapRoute = new nokia.maps.routing.component.RouteResultSet(routes[0]).container;
        	mymap.objects.add(mapRoute);
 			//Zoom to the bounding box of the route
        	mymap.zoomTo(mapRoute.getBoundingBox(), false, "default");
    	}else if(value == "failed") {
    		alert("The routing request failed.");
    	}
	};
	router.addObserver("state", onRouteCalculated);
	router.calculateRoute(waypoints, modes);
}

function addMarker(position,map){
	var myLoc = new nokia.maps.map.StandardMarker([position.coords.latitude , position.coords.longitude], 
													{text: "Me"});
		var pbLoc = new nokia.maps.map.StandardMarker([35.088061,-80.877247], 
													  {text: "PB"});
		map.objects.add(myLoc);
		map.objects.add(pbLoc);
		return map;
}

function onGeoLocError(){
	alert("The Phone signal is weak. Please turn on the GPS");
}


	//App ID - ErHSJAYLUN4jj9b1mNAu
	//App code - 1yK4ZaKZa-tg9aFh6X_eEw
