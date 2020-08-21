'use strict';

//events
const submit = document.getElementById("login");
submit.onclick = login();

function login(){
    let email = document.getElementById('emailinput').value;
    let password = document.getElementById('passwordinput').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('teest');
            
        }
    };
    xhttp.open("POST", "localhost:3000/checklogin", true);
    xhttp.setRequestHeader("contentType", "applcation/json");
    let jsonString = '{"email":"'+email+'","password":"'+password+'"}';
    xhttp.send(jsonString);

}






//POST insertComment
/*app.post('/insertComment', (req, res) => {
    console.log('insert triggered!');
    console.log(req.body);

    connection.query(
        'UPDATE order SET status = ? ,comment = ? WHERE `id` = ?',
        [req.body.type, req.body.text, req.body.id],
        function(err, results){
            console.log(results);
            console.log(err);
        }
    );
    res.send('OK');

});*/




