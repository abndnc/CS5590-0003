package com.example.mobile_icp1;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    EditText inputUserName, inputPassword;
    String storedUserName, storedPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        inputUserName = findViewById(R.id.editTextUserName);
        inputPassword = findViewById(R.id.editTextPassword);

        storedUserName = "";
        storedPassword = "";

    }

    public void checkLogin(View v) {
        Boolean validUserName = false;
        Boolean validPassword = false;
        storedUserName = inputUserName.getText().toString();
        storedPassword = inputPassword.getText().toString();

        v.clearFocus();
        InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(v.getWindowToken(), 0);

        if (!storedUserName.isEmpty() && !storedPassword.isEmpty()) {
            if (storedUserName.equals("abndnc")) {
                validUserName = true;
                if (storedPassword.equals("123456")) {
                    validPassword = true;
                }
            }
        }

        if (validUserName && validPassword) {
            Toast.makeText(getApplicationContext(), "Welcome Anh Nguyen!" , Toast.LENGTH_SHORT).show();
            redirectToHomePage();
        } else {
            Toast.makeText(getApplicationContext(), "Invalid Login!" , Toast.LENGTH_LONG).show();
            if (!validUserName) {
                inputUserName.setError("Invalid Username");
                inputUserName.requestFocus();
            } else {
                inputPassword.setError("Invalid Password");
                inputPassword.setText("");
            }
        }
    }

    public void redirectToHomePage() {
        Intent redirect = new Intent(MainActivity.this, HomeActivity.class);
        startActivity(redirect);
    }
}
