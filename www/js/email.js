
var EmailComposer = function(){};
/*
cordova.addConstructor(function() {
	    cordova.addPlugin("emailcomposer", new EmailComposer());
	});
*/

EmailComposer.prototype.send = function (message){
	console.log("Calling the send message");
	cordova.exec(function(){ }, 
	    function(){ alert('feedback was not sent')}, 
	    'EmailComposer', 
	    'sendEmail', 
	    [message]);
	}

function sendFeedback(body){
	
	window.EmailComposer.prototype.send(body);
	$("#feedbackStatusId").show('slow',function(){});
	$("#feedbackStatusId").hide(1500,function(){});
}

