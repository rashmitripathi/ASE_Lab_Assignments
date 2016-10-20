import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
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

@Path("/reviewservice")
public class GetSentimentService {
	
	
	  @Path("{data}")
	  @GET
	  @Produces("application/json")
	  public Response getReviewDetails(@PathParam("data") String data) throws JSONException  
	  {
		  data=data.replace(" ", "%20");
		 
		  //176a4b5ac100cfd63258185b6535e28dc9385fde
		  //
		   String url="http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?apikey=11853d48ab52a658cb5b2a6157021c6dfa9c3876&outputMode=json&text=" 
		   + data;
		   Client client = Client.create();
		   WebResource web = client.resource(url);
		   ClientResponse response = web.accept("application/json").get(ClientResponse.class);
		   String output = response.getEntity(String.class);  
        
        
        JSONObject response1 = new JSONObject(output.toString());
        JSONObject docSentiment;
        
        String score="N/A";
        String type="N/A";
        if(response1.has("docSentiment")){
        
        	docSentiment=response1.getJSONObject("docSentiment");
        
        if(docSentiment.has("score"))
        {
        	 score = docSentiment.getString("score");
        }
        
        if(docSentiment.has("type"))
        {
        	 type = docSentiment.getString("type");
        }
       
        }
		
        Map<String, String> obj = new LinkedHashMap<String, String>();
        obj.put("Score", score);
        obj.put("Type", type);
          
        JSONObject jsonObject = new JSONObject(obj);
		
       
        JSONObject json2 = new JSONObject();
        json2.put("ReviewData", jsonObject);
		String result = " " + json2;
		  
		return Response.status(200).entity(result).build();
		  }
}




