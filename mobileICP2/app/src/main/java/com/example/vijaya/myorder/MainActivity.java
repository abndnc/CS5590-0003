package com.example.vijaya.myorder;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private static final String MAIN_ACTIVITY_TAG = "MainActivity";
    final int PIZZA_PRICE = 5;
    final int CHEESE_PRIZE = 1;
    final int MUSHROOM_PRIZE = 2;
    final int TOPPING3_PRIZE = 1; /*not a pizza expert, sorry */
    final int TOPPING4_PRIZE = 1;
    int quantity = 3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    /**
     * This method is called when the order button is clicked.
     */

    public void submitOrder(View view) {

        // get user input
        EditText userInputNameView = (EditText) findViewById(R.id.user_input);
        String userInputName = userInputNameView.getText().toString();

        // check if cheese is selected
        CheckBox cheese = (CheckBox) findViewById(R.id.cheese_checked);
        boolean hasCheese = cheese.isChecked();

        // check if mushroom is selected
        CheckBox mushroom = (CheckBox) findViewById(R.id.mushroom_checked);
        boolean hasMushroom = mushroom.isChecked();

        // check if topping3 is selected
        CheckBox topping3 = (CheckBox) findViewById(R.id.topping3_checked);
        boolean hasTopping3 = topping3.isChecked();

        // check if topping4 is selected
        CheckBox topping4 = (CheckBox) findViewById(R.id.topping4_checked);
        boolean hasTopping4 = topping4.isChecked();

        // calculate and store the total price
        float totalPrice = calculatePrice(hasCheese, hasMushroom, hasTopping3, hasTopping4);

        // create and store the order summary
        String orderSummaryMessage = createOrderSummary(userInputName, hasCheese, hasMushroom, hasTopping3, hasTopping4, totalPrice);

        // Write the relevant code for making the buttons work(i.e implement the implicit and explicit intents
        Intent SendMail = new Intent(Intent.ACTION_SEND);
        SendMail.setType("plain/text");
        SendMail.putExtra(Intent.EXTRA_SUBJECT, userInputName + "'s Order Receipt");
        SendMail.putExtra(Intent.EXTRA_TEXT, orderSummaryMessage);
        // Hint to accomplish the task
        if (SendMail.resolveActivity(getPackageManager()) !=null){
            startActivity(SendMail);
        }
    }


    private String boolToString(boolean bool) {
        return bool ? (getString(R.string.yes)) : (getString(R.string.no));
    }

    private String createOrderSummary(String userInputName, boolean hasCheese, boolean hasMushroom, boolean hasTopping3, boolean hasTopping4, float price) {
        String orderSummaryMessage = getString(R.string.order_summary_name, userInputName) + "\n" +
                getString(R.string.order_summary_cheese, boolToString(hasCheese)) + "\n" +
                getString(R.string.order_summary_mushroom, boolToString(hasMushroom)) + "\n" +
                getString(R.string.order_summary_topping3, boolToString(hasTopping3)) + "\n" +
                getString(R.string.order_summary_topping4, boolToString(hasTopping4)) + "\n" +
                getString(R.string.order_summary_quantity, quantity) + "\n" +
                getString(R.string.order_summary_total_price, price) + "\n" +
                getString(R.string.thank_you);
        return orderSummaryMessage;
    }

    /**
     * Method to calculate the total price
     *
     * @return total Price
     */
    private float calculatePrice(boolean hasCheese, boolean hasMushroom, boolean hasTopping3, boolean hasTopping4) {
        int basePrice = PIZZA_PRICE;
        if (hasCheese) {
            basePrice += CHEESE_PRIZE;
        }
        if (hasMushroom) {
            basePrice += MUSHROOM_PRIZE;
        }
        if (hasTopping3) {
            basePrice += TOPPING3_PRIZE;
        }
        if (hasTopping4) {
            basePrice += TOPPING4_PRIZE;
        }
        return quantity * basePrice;
    }

    /**
     * This method displays the given quantity value on the screen.
     */
    private void display(int number) {
        TextView quantityTextView = (TextView) findViewById(R.id.quantity_text_view);
        quantityTextView.setText("" + number);
    }

    /**
     * This method increments the quantity of coffee cups by one
     *
     * @param view on passes the view that we are working with to the method
     */

    public void increment(View view) {
        if (quantity < 100) {
            quantity = quantity + 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select less than one hundred cups of coffee");
            Context context = getApplicationContext();
            String lowerLimitToast = getString(R.string.too_many_pizza);
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, lowerLimitToast, duration);
            toast.show();
            return;
        }
    }

    /**
     * This method decrements the quantity of coffee cups by one
     *
     * @param view passes on the view that we are working with to the method
     */
    public void decrement(View view) {
        if (quantity > 1) {
            quantity = quantity - 1;
            display(quantity);
        } else {
            Log.i("MainActivity", "Please select atleast one cup of coffee");
            Context context = getApplicationContext();
            String upperLimitToast = getString(R.string.too_few_pizza);
            int duration = Toast.LENGTH_SHORT;
            Toast toast = Toast.makeText(context, upperLimitToast, duration);
            toast.show();
            return;
        }
    }
    public void gotoSummary (View view) {
        // get user input
        EditText userInputNameView = (EditText) findViewById(R.id.user_input);
        String userInputName = userInputNameView.getText().toString();

        // check if cheese is selected
        CheckBox cheese = (CheckBox) findViewById(R.id.cheese_checked);
        boolean hasCheese = cheese.isChecked();

        // check if mushroom is selected
        CheckBox mushroom = (CheckBox) findViewById(R.id.mushroom_checked);
        boolean hasMushroom = mushroom.isChecked();

        // check if topping3 is selected
        CheckBox topping3 = (CheckBox) findViewById(R.id.topping3_checked);
        boolean hasTopping3 = topping3.isChecked();

        // check if topping4 is selected
        CheckBox topping4 = (CheckBox) findViewById(R.id.topping4_checked);
        boolean hasTopping4 = topping4.isChecked();

        // calculate and store the total price
        float totalPrice = calculatePrice(hasCheese, hasMushroom, hasTopping3, hasTopping4);

        // create and store the order summary
        String orderSummaryMessage = createOrderSummary(userInputName, hasCheese, hasMushroom, hasTopping3, hasTopping4, totalPrice);

        // make the button work
        Intent summaryAct = new Intent(MainActivity.this, SummaryActivity.class);
        summaryAct.putExtra("summary", orderSummaryMessage);
        startActivity(summaryAct);
    }
}