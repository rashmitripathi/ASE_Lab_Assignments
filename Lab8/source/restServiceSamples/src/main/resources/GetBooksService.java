import java.util.LinkedHashMap;
import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.ClientResponse;

@Path("/bookservice")
public class GetBooksService {
	
	
	  @Path("{topic}")
	  @GET
	  @Produces("application/json")
	  public Response getBooksDetails(@PathParam("topic") String topic) throws JSONException  
	  {
          
		   String bookURL =   "https://www.googleapis.com/books/v1/volumes?q="+topic;
		   Client client = Client.create();
		   WebResource web = client.resource(bookURL);
		   ClientResponse response = web.accept("application/json").get(ClientResponse.class);
		   String output = response.getEntity(String.class);  
        
        
        JSONObject response1 = new JSONObject(output.toString());
        JSONArray array = response1.getJSONArray("items");
        JSONArray jsonArray = new JSONArray();		
		
        
        for (int i = 0; i < array.length(); i++) {

        	Map<String, String> obj = new LinkedHashMap<String, String>();
            JSONObject item = array.getJSONObject(i);

            JSONObject volumeInfo = item.getJSONObject("volumeInfo");
            String title = volumeInfo.getString("title");
            obj.put("Title", title);

            JSONArray authors = volumeInfo.getJSONArray("authors");
            String author = authors.getString(0);
            obj.put("Author", author);

            JSONObject imageLinks = volumeInfo.getJSONObject("imageLinks");
            String imageLink = imageLinks.getString("smallThumbnail");
            obj.put("Image", imageLink);

           String rating="n/a";

            if( volumeInfo.has("averageRating")){
                rating = Double.toString(volumeInfo.getDouble("averageRating"));
            }
            obj.put("Rating", rating);
           
            String amount="n/a";
            JSONObject priceInfo = item.getJSONObject("saleInfo");
            if(priceInfo.has("retailPrice")) {
                JSONObject retailPrice = priceInfo.getJSONObject("retailPrice");
                if (retailPrice.has("amount")) {
                    amount = Double.toString(retailPrice.getDouble("amount"));
                }
            }
            
            obj.put("Amount", amount);
            
            JSONObject jsonObject = new JSONObject(obj);
			jsonArray.put(jsonObject);
        }
            
           JSONObject json2 = new JSONObject();
           json2.put("BookData", jsonArray);
		   String result = " " + json2;
		  
		   return Response.status(200).entity(result).build();
		  }
}




