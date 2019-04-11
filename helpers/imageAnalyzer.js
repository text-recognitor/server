const axios = requier('axios')

module.exports = function () {
    // **********************************************
    // *** Update or verify the following values. ***
    // **********************************************

    // Replace <Subscription Key> with your valid subscription key.
    var subscriptionKey = process.env.MICROSOFT_SUBSCRIPTION_KEY;

    // You must use the same Azure region in your REST API method as you used to
    // get your subscription keys. For example, if you got your subscription keys
    // from the West US region, replace "westcentralus" in the URL
    // below with "westus".
    //
    // Free trial subscription keys are generated in the "westus" region.
    // If you use a free trial subscription key, you shouldn't need to change
    // this region.
    var uriBase = process.env.MICROSOFT_URI_BASE

    // Request parameter.
    var params = {
        "mode": "Handwritten",
    };

    // Display the image.
    var sourceImageUrl = 'https://storage.googleapis.com/textrecognitor/1554993996957sample.jpeg'

    // This operation requires two REST API calls. One to submit the image
    // for processing, the other to retrieve the text found in the image.
    //
    // Make the first REST API call to submit the image for processing.
    axios.post({
        url: process.env.MICROSOFT_URI_BASE,
        params: params,
        headers: 
        {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": subscriptionKey
        },
        data: {"url": sourceImageUrl}
    })
    .done((result) => {
        let timerInterval
        console.log(result.data);
        console.log(result.headers);
        console.log(` Handwritten text submitted. Waiting 10 seconds to retrieve the recognized text...`)
        setTimeout(function () {
            // "Operation-Location" in the response contains the URI
            // to retrieve the recognized text.
            var operationLocation = result.headers["Operation-Location"];

            // Make the second REST API call and get the response.
            axios.get({
                url: operationLocation,
                headers: {
                    "Content-Type": "application/json",
                    "Ocp-Apim-Subscription-Key": subscriptionKey
                }
            })
            .done(function({data}) {
                console.log(`after calling operationLocation ${data}`);
            })
            .fail(err => {
                console.log(`error ---- ${err}`);
            });
        }, 10000);
    })
    .fail(err => {
        console.log(`error ---- ${err}`);
    });
};