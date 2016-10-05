package tutorial.maps.google.googlemapsapplication;

import android.graphics.Bitmap;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

public class HomeActivity extends FragmentActivity implements OnMapReadyCallback
{
    private GoogleMap mMap;
    Bitmap userPhoto;
    String userAddress;
    LatLng userCurrentLatLng;
    double userLatitude;
    double userLongitude;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager().findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
        mMap=mapFragment.getMap();

        /*
           initializing all the variables
         */

        this.userLatitude=getIntent().getDoubleExtra("user_latitude",0);
        this.userLongitude=getIntent().getDoubleExtra("user_longitude",0);
        this.userAddress=getIntent().getStringExtra("user_address");

        Bundle extra = getIntent().getExtras();
        //marker = extra.getParcelable("profileBitmap");
        this.userPhoto=extra.getParcelable("user_photo");
        this.userCurrentLatLng=new LatLng(this.userLatitude,this.userLongitude);

    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        //Setting our image as the marker icon.
        mMap.addMarker(new MarkerOptions().position(this.userCurrentLatLng)
                .title("Your current Location is :").snippet(this.userAddress.toString())
                .icon(BitmapDescriptorFactory.fromBitmap(this.userPhoto)));

          //      .icon(BitmapDescriptorFactory.fromResource(R.drawable.email)));



        //Setting the zoom level of the map.
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(this.userCurrentLatLng,8));
    }
}
