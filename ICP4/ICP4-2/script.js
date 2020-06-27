function getGithubInfo(username) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
    var userAPI ='https://api.github.com/users/'+username;
    console.log(userAPI);
    $.ajax({
        type: "GET",
        url: userAPI,
        dataType: 'json',
//if the response is successful show the user's details
    }).done(function(data){
        showUserInfo(data);
//else show the suitable message
    }).fail(function(){
        console.log("Error");
        noSuchUser(username);
    });

}

function showUserInfo(userAPIdata) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $('#profile h2').html("User " + username + " Profile");
    document.getElementById('imgavg').src=userAPIdata.avatar_url;
    document.getElementById('txtname').innerText=userAPIdata.name;
    document.getElementById('txtid').innerText=userAPIdata.id;
    document.getElementById('txturl').href=userAPIdata.html_url;
    document.getElementById('txturl').innerText=userAPIdata.html_url;
    document.getElementById('txtrepository').innerText=userAPIdata.public_repos;
}
function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $('#profile h2').html("No such User  " + username + " found");
}
$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            getGithubInfo(username);
        }
    })
});
