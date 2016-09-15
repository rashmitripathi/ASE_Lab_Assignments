/**
 * Created by Puchu on 9/14/2016.
 */
/*Yahoo Search URL
* When you click the submit button, the query in the input box is passed to this
* function. It creates a URL including the query, output and callback(what will
* run once the response is recieved).
*/
function searchYahoo(query){
    alert("yahoo");
    var url="http://api.search.yahoo.com/NewsSearchService/V1/newsSearch?";
    url+= "appid=adactio";
    url+= "&query=" +escape(query);
    url+= "&output=json";
    url+= "&callback=parseResponse";
    getScript(url);
}
/*Generate Script Tag
 * The URL that was created above is passed to this function. It creates a script
 * tag that is then inserted into the page. This allows you to pull data from external
 * domains.
 */
function getScript(url){
    var scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", url);
    document.getElementsByTagName("head")[0].appendChild(scriptTag);
}
/*The callback function
 * A query has been sent to the server, the file has been generated with the results
 * is inserted into the header of the page. This callback function is run and extracts
 * the info you want and inserts it into the document using the DOM. Note the data
 * variable which contains the information to be formatted.
 */
function parseResponse(data) {

    var results = document.getElementById("results");

    while(results.hasChildNodes()){
        results.removeChild(results.lastChild);
    }
    for(i=0;i<data.ResultSet.Result.length;i++){
        var yhTitle = data.ResultSet.Result[i].Title;
        var yhSummary = data.ResultSet.Result[i].Summary;

        //create the header
        var theHeader = document.createElement("h2");
        var theHeaderText = document.createTextNode(yhTitle);
        theHeader.appendChild(theHeaderText);
        results.appendChild(theHeader);

        //create the summary
        var theSummary = document.createElement("p");
        var theSummaryText = document.createTextNode(yhSummary);
        theSummary.appendChild(theSummaryText);
        results.appendChild(theSummary);
    }
}