$(document).ready(function(){

    console.log('Ready')

    //  Fetch the current date and update it in the DOM
    var date_time = new Date()
    let current_date= date_time.toLocaleDateString()
    $("#date").text("Date:" + current_date)



    //  write an event, when Submit button is clicked
    $('#button').click(function(){

        //  get the text value from the textarea using the 'val()' method
        let review = $('#text').val()

        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_data = {'customer_review' : review}
        console.log(input_data)

        //  ajax request
        $.ajax({
            
            url: "/predict",
            //  type of web request
            type : 'POST',

            //  Data to be sent in JSON format
            data : JSON.stringify(input_data),

            //  type of response expected is json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',

            //  if everything is successful, run this function
            success : function(result){

                // extract prediction and emoticon url from result
                let prediction = result.prediction
                let emoji_url = result.url

                //  update the DOM elements
                $('#sentiment').text(prediction)
                $('#sentiment').show()

                $('#emoji').attr('src', emoji_url)
                $('#emoji').show()

                //  show them

            },

            //  if any error, run this function
            error : function(result){

                console.log(result)
            }
        })


        //  clearing the textbox after every button push
        $('#text').val("")
    })
        
})