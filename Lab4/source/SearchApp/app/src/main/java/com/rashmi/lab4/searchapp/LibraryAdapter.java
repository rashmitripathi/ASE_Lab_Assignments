package com.rashmi.lab4.searchapp;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

import java.util.List;

import com.rashmi.lab4.searchapp.lazylist.ImageLoader;

public class LibraryAdapter extends BaseAdapter {

    Context context;
    List<Book> booksList;

    public LibraryAdapter(Context context, List<Book> booksList) {
        this.context = context;
        this.booksList = booksList;
    }

    @Override
    public int getCount() {
        return booksList.size();
    }

    @Override
    public Object getItem(int position) {
        return booksList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        View view = parent.inflate(context, R.layout.searchbook_layout, null);


        Book book = (Book) getItem(position);

       /* TextView tvTitle = (TextView) view.findViewById(R.id.tvTitle);
        tvTitle.setText(book.getTitle());

        TextView tvAuthor = (TextView) view.findViewById(R.id.tvAuthor);
        tvAuthor.setText(book.getAuthor());

        ImageView ivCover = (ImageView) view.findViewById(R.id.ivCover);
        ImageLoader imageLoader=new ImageLoader(context);
        imageLoader.DisplayImage(book.getImage_url(), ivCover);

        TextView rating = (TextView) view.findViewById(R.id.tvAuthor);
        tvAuthor.setText(book.getAuthor());*/

        return view;
    }
}