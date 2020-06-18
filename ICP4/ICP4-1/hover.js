function upDate(previewPic) {
    /* In this function you should
       1) change the url for the background image of the div with the id = "image"
       to the source file of the preview image

       2) Change the text  of the div with the id = "image"
       to the alt text of the preview image
       */
    console.log(previewPic);
    $('#image').css('background-image', 'url(' + previewPic.src + ')');
    $('#image').html(previewPic.alt);
    if(previewPic.alt=="Batter is ready") {
        $('#image').src = "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-7.jpg";
        $('#image').html("Batter is ready");
    }
    else if (previewPic.alt=="Perfect Baking"){
        $('#image').src = "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-6.jpg";
        $('#image').html("Perfect Baking");
    }
    else if(previewPic.alt=="Yummy yummy cup cake"){
        $('#image').src = "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg";
        $('#image').html("Yummy yummy cup cake");
    }
}

function unDo() {
    /* In this function you should
   1) Update the url for the background image of the div with the id = "image"
   back to the orginal-image.  You can use the css code to see what that original URL was

   2) Change the text  of the div with the id = "image"
   back to the original text.  You can use the html code to see what that original text was
   */
    {
        $('#image').css('background-image','none');
        $('#image').html("Hover over an image below to display here.");
    }
}
