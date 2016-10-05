package com.rashmi.lab4.searchapp;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.PersistableBundle;


import android.preference.PreferenceActivity;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Adapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import cz.msebera.android.httpclient.*;

import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Puchu on 9/19/2016.
 */
public class SearchActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.searchbook_layout);

        //outputTextView = (TextView) findViewById(R.id.txt_Result);


        Button getBookListButton = (Button) findViewById(R.id.getBookList);
        getBookListButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                searchBooksUsingGoogleAPI();
            }
        });


        Button logOutButton = (Button) findViewById(R.id.logOut);
        logOutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                logout(view);
            }
        });

    }

    public void searchBooksUsingGoogleAPI()
    {

        EditText text=(EditText )findViewById(R.id.searchBookText);
        int i=0;
        String newText=text.getText().toString();
        Log.d("text",String.valueOf(newText));

        if(newText.length()>0)
        {
            newText = newText.replace(" ", "+");
            String url = "https://www.googleapis.com/books/v1/volumes?q=";
            url = url + newText;

            AsyncHttpClient client = new AsyncHttpClient();
            client.get(url, new AsyncHttpResponseHandler() {


                @Override
                public void onSuccess(int statusCode, cz.msebera.android.httpclient.Header[] headers, byte[] responseBody) {

                    List<Book> bookList = new ArrayList<Book>();

                    String json = new String(responseBody);

                    try {
                        JSONObject object = new JSONObject(json);
                        JSONArray array = object.getJSONArray("items");

                        for (int i = 0; i < array.length(); i++) {

                            Book book = new Book();
                            JSONObject item = array.getJSONObject(i);

                            JSONObject volumeInfo = item.getJSONObject("volumeInfo");
                            String title = volumeInfo.getString("title");
                            book.setTitle(title);

                            JSONArray authors = volumeInfo.getJSONArray("authors");
                            String author = authors.getString(0);
                            book.setAuthor(author);

                            JSONObject imageLinks = volumeInfo.getJSONObject("imageLinks");
                            String imageLink = imageLinks.getString("smallThumbnail");
                            book.setImage_url(imageLink);

                            String rating="n/a";

                            if( volumeInfo.has("averageRating")){
                                rating = volumeInfo.getString("averageRating");
                            }

                            book.setRating(rating);


                            String amount="n/a";
                            JSONObject priceInfo = item.getJSONObject("saleInfo");
                            if(priceInfo.has("retailPrice")) {
                                JSONObject retailPrice = priceInfo.getJSONObject("retailPrice");
                                if (retailPrice.has("amount")) {
                                    amount = retailPrice.getString("amount");
                                }
                            }
                            book.setAmount(amount);
                            bookList.add(book);
                        }
                    } catch (JSONException e) {
                        Log.d("exception1111",e.getMessage());
                        e.printStackTrace();
                    }

                    //ListView list=(ListView)findViewById(R.id.bookList);
                    //LibraryAdapter adapter=new LibraryAdapter(getApplicationContext(),bookList);
                    //list.setAdapter(adapter);
                  // LibraryAdapter.showBooksList(getApplicationContext(), bookList);

                    updateUI(bookList);

                }

                @Override
                public void onFailure(int statusCode, cz.msebera.android.httpclient.Header[] headers, byte[] responseBody, Throwable error) {

                }

            });
        }
    }


    public void updateUI(List<Book> bookList)
    {
        TableLayout tl = (TableLayout) findViewById(R.id.bookTable);
        int i=0;

        for(Book book:bookList)
        {
            TableRow row= new TableRow(this);
            TableRow row1= new TableRow(this);
            TableRow row2= new TableRow(this);
            TableRow row3= new TableRow(this);

            tableRowSettings(row);


            ImageView bookImage = new ImageView(this);

            LinearLayout cell1=createCell(book.getTitle(),0);
            LinearLayout cell2=createCell(book.getAuthor()+"      "+book.getRating()+"*     "+book.getAmount(),1);
            LinearLayout cell3=createCell(book.getRating(),0);
            LinearLayout cell4=createCell(book.getAmount(),0);


            row.addView(cell1);
            row1.addView(cell2);
            row1.addView(cell3);
            row1.addView(cell4);

            Log.d("add",book.getTitle());

            tl.addView(row,i);
            tl.addView(row1,i+1);


            i=i+2;
        }
    }


    public void tableRowSettings(TableRow row)
    {
        row.setBackgroundColor(Color.BLACK);
        row.setPadding(0, 0, 0, 2); //Border between rows
    }

    public LinearLayout createCell(String text,int i)
    {

        TextView tv = new TextView(this);
        tv.setPadding(0, 0, 1, 3);

        if(i==1)
        {
            tv.setText("   "+text+"  ");
        }else
        {
            tv.setText(text+"  ");
        }



        LinearLayout cell = new LinearLayout(this);
        cell.setBackgroundColor(Color.WHITE);
        cell.addView(tv);
        return cell;


    }


    public void logout(View v) {
        Intent redirect = new Intent(SearchActivity.this, LoginActivity.class);
        startActivity(redirect);
    }
}

