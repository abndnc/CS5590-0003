package com.vijaya.speechtotext;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.SharedPreferences;
import android.media.AudioManager;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.speech.tts.TextToSpeech;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    // Variables, shared preferences, and user's name
    private static final int REQ_CODE_SPEECH_INPUT = 100;
    private TextView mVoiceInputTv;
    private ImageButton mSpeakBtn;
    private TextToSpeech textToSpeech;
    private boolean ready = false;
    private SharedPreferences sharedPreference;
    private  SharedPreferences.Editor editor;
    private static final String PREFS = "prefs";
    private static final String NAME = "name";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // store local data and speech to editor level
        sharedPreference = getSharedPreferences(PREFS, 0);
        editor = sharedPreference.edit();
        mVoiceInputTv = (TextView) findViewById(R.id.voiceInput);
        mSpeakBtn = (ImageButton) findViewById(R.id.btnSpeak);
        mSpeakBtn.setOnClickListener(new View.OnClickListener() { // When user click on mic button

            @Override
            public void onClick(View v) {
                startVoiceInput();
            }
        });


        //text to speech function
        textToSpeech = new TextToSpeech(this, new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int i) {
                if(i == TextToSpeech.SUCCESS){
                    int result = textToSpeech.setLanguage(Locale.US);
                    ready = true;
                    if(result == TextToSpeech.LANG_MISSING_DATA || result == TextToSpeech.LANG_NOT_SUPPORTED){
                        Log.e("TTS", "Error: Not a supported language");
                    }
                    speak("Hello");
                }
                else{
                    ready=false;
                    Log.e("TTs", "Initialization has failed");
                }
            }
        });
    }

    private void speak(String text){
        if(ready){
            HashMap<String, String> hashMap = new HashMap<String, String>();

            hashMap.put(TextToSpeech.Engine.KEY_PARAM_STREAM, String.valueOf(AudioManager.STREAM_NOTIFICATION));
            textToSpeech.speak(text, TextToSpeech.QUEUE_ADD, hashMap);
        }

    }

    // Questions to ask assistant
    private void dialogue(String text) {
        Log.e("Speech", "" + text);

        String[] speech = text.split(" ");

        if (text.contains("hello")) {
            speak("What is your name?");
        }
        if (text.contains("my name is")) {
            String name = speech[speech.length - 1];
            Log.e("Your name", "" + name);
            editor.putString(NAME, name).apply();
            speak("Your name is " + sharedPreference.getString(NAME, null));
        }
        if (text.contains("my name is " + sharedPreference.getString(NAME, null))) { //speech.length == 1
            speak("How are you today?" + sharedPreference.getString(NAME, null));
        }
        if (text.contains("I'm good") || text.contains("I'm fine")) {
            speak("Good, how can I help you today?");
        }
        if (text.contains("not feeling good") || text.contains("coughing") || text.contains("should I do")) {
            speak("I can understand. Please tell your symptoms in short.");
        }
        if (text.contains("what medicine should I take")){
            speak("I think you have fever. Please take this medicine.");
        }
        if (text.contains("what time is it")) {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("HH:mm"); // dd/mm/yyyy
            Date now = new Date();
            String[] strDate = simpleDateFormat.format(now).split(":");
            if (strDate[1].contains("00")) {
                strDate[1] = "o'clock";
            }
            speak("The time is " + simpleDateFormat.format(now));
        }
        if (text.contains("thank you, my medical assistant") || text.contains("thank you")) {
            speak("Thank you " + sharedPreference.getString(NAME, null) + "Take care and have a nice day");
        }
    }

    private void startVoiceInput() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Hello, How can I help you?");
        try {
            startActivityForResult(intent, REQ_CODE_SPEECH_INPUT); // Call appropriate Intent
        } catch (ActivityNotFoundException a) {
            Toast.makeText(getApplicationContext(), "Sorry your device not supported", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (resultCode == RESULT_OK && null != data) {
                    ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    String inSpeech = result.get(0);
                    mVoiceInputTv.setText(inSpeech); // mVoiceInputTv.setText(result.get(0))
                    dialogue(inSpeech);
                }
                break;
            }

        }
    }

    public void onDestroy(){
        if (textToSpeech != null){
            textToSpeech.stop();
            textToSpeech.shutdown();
        }
        super.onDestroy();
    }
}