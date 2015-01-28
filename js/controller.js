$(document).ready(function () {
    // observe changes on input form
    $('#incomplete-year-input').on('change', 'input', function (event) {
        pajomatic_view.extractFormData('incomplete-year-input');
    });
    // extract data from view
    // pass data to the model
    // ask the model to calculate output
});
