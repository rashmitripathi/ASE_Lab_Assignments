package tutorial.maps.google.googlemapsapplication;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.v4.app.ActivityCompat;

import com.google.android.gms.maps.model.LatLng;

import java.util.List;

/**
 * Created by Puchu on 10/4/2016.
 */

public class MyLocationUtil {

    public Geocoder geocoder;

    public StringBuilder userAddress = new StringBuilder();
    LatLng userCurrentLocationCoordinates=null;
    double latitute = 0, longitude = 0;

    MyLocationUtil(Activity activity)
    {
        {
            geocoder = new Geocoder(activity);
            LocationManager userCurrentLocation = (LocationManager) activity.getSystemService(Context.LOCATION_SERVICE);
            LocationListener userCurrentLocationListener = new MyLocationListener();


            if (ActivityCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_FINE_LOCATION)
                    != PackageManager.PERMISSION_GRANTED && ActivityCompat
                    .checkSelfPermission(activity, Manifest.permission.ACCESS_COARSE_LOCATION)
                    != PackageManager.PERMISSION_GRANTED) {
                //show message or ask permissions from the user.
                return;
            }
            //Getting the current location of the user.
            userCurrentLocation.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0, userCurrentLocationListener);
            latitute = userCurrentLocation.getLastKnownLocation(LocationManager.GPS_PROVIDER).getLatitude();
            longitude = userCurrentLocation.getLastKnownLocation(LocationManager.GPS_PROVIDER).getLongitude();
            userCurrentLocationCoordinates = new LatLng(latitute,longitude);
            //Getting the address of the user based on latitude and longitude.
            try {
                List<Address> addresses = geocoder.getFromLocation(latitute, longitude, 1);
                Address address = addresses.get(0);
                userAddress =  new StringBuilder();
                for (int i = 0; i < address.getMaxAddressLineIndex(); i++) {
                    userAddress.append(address.getAddressLine(i)).append("\t");
                }
                userAddress.append(address.getCountryName()).append("\t");

            }
            catch(Exception ex)
            {
                ex.printStackTrace();
            }

        }
    }
}
