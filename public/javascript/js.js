$(function(){
    console.log('linked');

    getPackage();


    //Eventlisteners voor buttons
    $('#list').click(function(){
        $('form').hide();
        $('#ListPackages').show();
        getList();
    });



    //Retrieves list of books from database using AJAX call
    function getList(){

        $.ajax({
            url: 'http://127.0.0.1:3000/Order',
            method: 'GET',
            dataType: 'json'
        }).done(function(data){
            console.log('DONE');
            //clean up previous data
            $('#ListPackages').empty();
            for(let b of data){
                $('#ListPackages').append(`id: ${b.id}, user id: ${b.user_id}, status of order: ${b.status}, comments: ${b.comment}`);
            }
        }).fail(function(er1, er2){
            console.log(er1);
            console.log(er2);
        });



    }

    $('form').submit(function(e){
        //standard behaviour block
        e.preventDefault();

        //Get all data from form with jQuery
        // $(this).serialize
        // $(this).serializeArray()


        let PackageObject = {
            id: $('#id').val(),
            user_id: $('#user_id').val(),
            status: $('#status').val(),
            comment: $('#comment').val()
        };

        //Call to server
        $.ajax({
            url: 'http://127.0.0.1:3000/insertComment',
            method: 'POST',
            data: PackageObject

        }).done(function(data){
            console.log('comment Inserted!');


        }).fail(function(er1, er2){
            console.log(er1);
            console.log(er2);
        });
    });

});
