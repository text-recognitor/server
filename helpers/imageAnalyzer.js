const axios = require('axios')

module.exports = function (cb) {

    // Replace <Subscription Key> with your valid subscription key.
    var subscriptionKey = process.env.MICROSOFT_SUBSCRIPTION_KEY;
    var uriBase = process.env.MICROSOFT_URI_BASE

    // Request parameter.
    var params = {
        "mode": "Handwritten",
    };

    // Display the image from GCP
    var sourceImageUrl = req.file.cloudStoragePublicUrl

    axios({
        url: process.env.MICROSOFT_URI_BASE,
        params: params,
        method: "POST",
        headers: 
        {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": subscriptionKey
        },
        data: {"url": sourceImageUrl}
    })
    .then((result) => {
        let timerInterval
        console.log(` Handwritten text submitted. Waiting 10 seconds to retrieve the recognized text...`)
        setTimeout(function () {
            // "Operation-Location" in the response contains the URI
            // to retrieve the recognized text.
            var operationLocation = result.headers["operation-location"];

            // Make the second REST API call and get the response.
            axios({
                url: operationLocation,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Ocp-Apim-Subscription-Key": subscriptionKey
                }
            })
            .then(function(response) {
                let lines = response.data.recognitionResults[0].lines;
                lines = lines.map(x => {
                    return x.text
                })
                cb(null, lines)
            })
            .catch(err => {
                console.log(`error ---- ${err}`);
                cb(err)
            });
        }, 10000);
    })
    .catch(err => {
        console.log(`error ---- ${err}`);
        cb(err)
    });
};