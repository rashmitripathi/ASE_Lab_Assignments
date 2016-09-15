/**
 * Created by Puchu on 9/14/2016.
 */

function Login()
{
    FB.login(function(response) {
        if (response.authResponse)
        {
            successfulLogin();
        } else
        {
            console.log('User cancelled login or did not fully authorize.');
        }
    },{scope: 'email,user_photos,user_videos'});

}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '672313739587991',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use graph api version 2.5
    });

    FB.Event.subscribe('auth.authResponseChange', function(response)
    {
        if (response.status === 'connected')
        {
           successfulLogin();
            //SUCCESS
        }
        else if (response.status === 'not_authorized')
        {
            window.location.replace("home.html");
            document.getElementById("status").innerHTML +=  "<br>Failed to Connect";
            //FAILED
        } else
        {
            window.location.replace("home.html");
            document.getElementById("status").innerHTML +=  "<br>Logged Out";
            //UNKNOWN ERROR
        }
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.
function successfulLogin() {
    console.log('Welcome!  Fetching your information.... ');
    //top.location.href="home.html";
    window.location.replace("home.html");
    document.getElementById("message").innerHTML +=  "<br>Connected to Facebook";
    //SUCCESS
    FB.api('/me', function(response) {
        var str="<b>Name</b> : "+response.name+"<br>";
        document.getElementById("status").innerHTML=str;

    });
}
