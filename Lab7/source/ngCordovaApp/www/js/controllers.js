angular.module('app.controllers', [])

.controller('searchAppCtrl', function($scope,LoginService, $ionicPopup, $state,$q,$cordovaOauth,$cordovaSplashscreen) {
    $scope.data = {};
    $scope.IsLogedIn= false;
    $scope.Submitted= false;
    $scope.IsFormValid=false;
    $scope.Message='';
    $scope.data={
        userName:'',
        pwd:''
    };
    
     $scope.$watch('form.$valid',function(newVal){
        $scope.IsFormValid=newVal;
    });    
 
    $scope.login = function() {
        
        $scope.Submitted=true;
        $scope.IsFormValid=true;
        if($scope.IsFormValid){
            
            LoginService.isDuplicate($scope.data)
                .then(function (response) {
                    if (response.success) {
                         $cordovaSplashscreen.show();
                         $cordovaSplashscreen.hide();
                       $state.go('home');
                    }
                    else{
                        $scope.Message="Invalid Credentials";
                    }
                });
        }
    };
    
    
      $scope.facebookLogin = function() {
          console.log("Inside facebook login");
        $cordovaOauth.facebook("1112137608839690", ["email"]).then(function(result) {
             
            $state.go('home');
        }, function(error) {
            // error
            console.log(" error in facebook login"+error);
        });
    };
      
    
      $scope.goToRegisterPage = function() {  
        console.log("Inside register");            
        $state.go('register');           
       
    };
})

   

.controller('registerCtrl', function($scope, $state,$filter,$q,LoginService) {
   
     $scope.registerData={
        un:'',
        pwd:''
    };
    
    $scope.cancel=function(){
        $state.go('login');   
    }
    
     $scope.register = function() {  
        console.log("Inside register"+ $scope.registerData.un+" "+$scope.registerData.pwd);
        $scope.RegSubmitted=true;
        $scope.IsRegLogedIn=true;
        LoginService.CreateUser($scope.registerData)
            .then(function (response) {
                if (response.success) {                   
                    $scope.status="Thank you "+$scope.registerData.name+" for Signing up with us";
                }
                else{                   
                    $scope.status="Username "+$scope.registerData.un+" already exists.Please try again";
                }
            });
      }
})



.controller('homeCtrl', function($scope, $state, $cordovaGeolocation,$ionicLoading,HomeService,Eventful,$document,$cordovaDatePicker,$cordovaDialogs) {  

var map=null;
    
$scope.initialise = function() {
    
console.log("In Google.maps.event.addDomListener");
var myLatlng = new google.maps.LatLng(39.0345, -94.6647);
var mapOptions = {
center: myLatlng,
zoom: 16,
//mapTypeId: 'satellite'    
mapTypeId: google.maps.MapTypeId.ROADMAP
};
    
    var lat  = 39.0345;
      var long =  -94.6647;
    
 var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: map,
            title: "My Location"
        });    
    
    
map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    console.log(mapOptions);
    
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
  
    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
       map.setCenter(new google.maps.LatLng(lat, long));
        var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(lat, long),
            map: map,
            title: "My Location"
        });
    }, function(err) {
      // error
    });

    
   
    navigator.geolocation.getCurrentPosition(function(pos) {
        console.log("position: "+pos);
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map,
            title: "My Location"
        });
    });
console.log("initializing");
    $scope.map = map;
};
    
google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());

$scope.showCalender=function(){
    
    console.log("alert-date");
     var options = {
    date: new Date(),
    mode: 'date', // or 'time'
    minDate: new Date() - 10000,
    allowOldDates: true,
    allowFutureDates: false,
    doneButtonLabel: 'DONE',
    doneButtonColor: '#F2F3F4',
    cancelButtonLabel: 'CANCEL',
    cancelButtonColor: '#000000'
  };

  //   $cordovaDialogs.confirm('Are you sure you want to search?', 'Proceed', ['Cancel','Search']);
   /*$cordovaDatePicker.show(options).then(function(date){
        alert(date);
    });*/

  
};    

 $scope.search = function() {   
     
    Eventful.findEvents($scope.data.location).then(function(response) {
        
      self.events = response;
      console.log(self.events);
      self.events.forEach(function(single_event) {        
        addMarker(single_event);         
      })
      $scope.map = map;
    });     
     
 }
 
  addMarker = function(event) {
      map=$scope.map;
      var concert_center = new google.maps.LatLng(event.latitude, event.longitude);
      console.log(event.latitude + "   "+event.longitude);
      var marker = new google.maps.Marker({
      position: concert_center,
      title:"My location!",
      visible: true,      
    }
                                         );
    marker.setMap(map);  
    var infoWindowContent = "<h5>"+event.title+"</h5>"+"<br>"+"<h6>"+event.venue_address+"</h6>"+"<h8> description:"+event.description+"</h8>";          
    addInfoWindow(marker, infoWindowContent, event); 
      
      
  }
  
  
  function addInfoWindow(marker, message, event) {
      
      var infoWindow = new google.maps.InfoWindow({
          content: message
      });
 
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open(map, marker);
      });
 
  }
    
})
