$(document).ready(function () {
    // observe changes on input form
    $('#incomplete_year_input').on('change', 'input', function (event) {
        var input = pajomatic_view.extractFormData('incomplete_year_input');
        pajomatic_model.calculatePajemploiDeclaration(input);
    });
    // extract data from view
    // pass data to the model
    // ask the model to calculate output
});
