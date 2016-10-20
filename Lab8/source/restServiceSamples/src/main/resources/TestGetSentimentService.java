

import static org.junit.Assert.*;

import org.junit.Test;

public class TestGetSentimentService {

	GetSentimentService gs=new GetSentimentService();
	
	@Test
	public void test()throws Exception
	{
		String jsondata=gs.getReviewDetails("Android").toString();
		if(jsondata!=null)
		{
			System.out.println(" Review Test Passed");
		}
		
	}
	
	
}
