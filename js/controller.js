$(document).ready(function () {
    // observe changes on input form
    $('#incomplete-year-input').on('change', 'input', function (event) {
        console.log(event);
        var elt;
        elt = $(event.target);
        console.log(elt.val(), typeof(elt.val()));
    });
    // extract data from view
    // pass data to the model
    // ask the model to calculate output
});
