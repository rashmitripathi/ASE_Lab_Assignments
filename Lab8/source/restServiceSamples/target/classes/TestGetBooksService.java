import javax.ws.rs.core.Response;
import org.junit.Test;

public class TestGetBooksService
{
	
  GetBooksService ws=new GetBooksService();
	
	@Test
	public void test()throws Exception
	{
		
		//success Case
		Response response=ws.getBooksDetails("android");				
		int status = response.getStatus();		
		
		if (status != 200) {
			System.out.println("REst API failed for first case, check input");
		}
		else
		{
			System.out.println("REST APISuccessfully Executed for first case");
		}
		
		/*//failure case
		
		Response response1=ws.getBooksDetails("12345");			
		int status1 = response1.getStatus();
		
		
		if (status1 != 200) {
			System.out.println("REst API failed for second case. Test case success");
		}
		else
		{
			System.out.println("REst API success for second case");
		}
		*/
	}

}
