/**
 * Created by Puchu on 10/26/2016.
 */

angular.module('app',[])
    .controller('homeController', function ($scope,$http) {

        $scope.getEvents = function (){

            document.getElementById('results').style.visibility="visible";
            document.getElementById('weather-canvas').style.visibility="visible";
            document.getElementById('weatherheader').style.visibility="visible";

            var place = document.getElementById('place').value;
            $scope.place=place;
            var resp=$http.get("http://127.0.0.1:8081/getEventsWithWeather/"+place);
            resp.success(function(data,status, headers,config){
                console.log("success",data);

                $scope.title0 = data.eventsList[0].title;
                $scope.title1 = data.eventsList[1].title;
                $scope.title2 = data.eventsList[2].title;
                $scope.title3 = data.eventsList[3].title;
                $scope.title4 = data.eventsList[4].title;
                $scope.title5 = data.eventsList[5].title;

                $scope.name0 = data.eventsList[0].venue_name;
                $scope.name1 = data.eventsList[1].venue_name;
                $scope.name2 = data.eventsList[2].venue_name;
                $scope.name3 = data.eventsList[3].venue_name;
                $scope.name4 = data.eventsList[4].venue_name;
                $scope.name5 = data.eventsList[5].venue_name;


                $scope.starttime0 = data.eventsList[0].start_time;
                $scope.starttime1 = data.eventsList[1].start_time;
                $scope.starttime2 = data.eventsList[2].start_time;
                $scope.starttime3 = data.eventsList[3].start_time;
                $scope.starttime4 = data.eventsList[4].start_time;
                $scope.starttime5 = data.eventsList[5].start_time;

                $scope.address0 = data.eventsList[0].address;
                $scope.address1 = data.eventsList[1].address;
                $scope.address2 = data.eventsList[2].address;
                $scope.address3 = data.eventsList[3].address;
                $scope.address4 = data.eventsList[4].address;
                $scope.address5 = data.eventsList[5].address;


                $scope.weather = data.eventsList[5].weather;
                $scope.Temperature=data.eventsList[5].Temperature;
                $scope.Humidity=data.eventsList[5].Humidity;
                $scope.icon=data.eventsList[5].weather_icon;



            });
            resp.error(function(data,status,headers, config){
                window.alert("response not received 1, Something went wrong");
            });
        }


    });