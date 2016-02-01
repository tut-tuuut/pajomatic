$(document).ready(function () {
    var output_container = $('#incomplete_year_output');
    var input_form = $('#incomplete_year_input');
    var saved_url = $('#saved_url');
    var input_reminder = $('#input_reminder');
    var calculateAndDisplay = function (event) {
        var input = pajomatic_view.extractFormData('incomplete_year_input');
        var result = pajomatic_model.calculateAnneeIncomplete(input);
        pajomatic_view.display(result, output_container);
        pajomatic_view.display(input, input_reminder, 'in_');
        window.history.pushState({},"",'?'+input_form.serialize());
        saved_url.text(window.location.href);
    };

    // fill form from URL
    url2form('incomplete_year_input');
    calculateAndDisplay();

    // validate form
    input_form.validate({
        // presentation rules for twitter bootstrap CSS
        errorPlacement : function(error, element) {
            element.closest('.input-group').after(error);
        },
        errorClass : 'text-danger',
        highlight : function(element, errorClass) {
            $(element).closest('.input-group')
                .addClass('has-error')
                .removeClass('has-success');
        },
        unhighlight : function(element, errorClass) {
            $(element).closest('.input-group')
                .addClass('has-success')
                .removeClass('has-error');
        },
        // validation rules specific for this form
        rules : {
            nb_semaines : {
                number : true,
                max : {
                    param: 46
                }
            },
            nb_jours_par_semaine : {
                number: true,
                range: [1, 7] // maybe maximum is 6 actually?
            },
            nb_heures_normales : {
                number: true,
                max: {
                    param: 45
                }
            }
        },
        messages : {
            nb_semaines : {
                max : function (maxval, element) {
                    var value = parseInt($(element).val(), 10);
                    if (value == 47) {
                        return "47 semaines correspondent à une année complète. Les règles de calcul diffèrent."
                    }
                    return "Vous devez offrir au moins 5 semaines de congés payés à votre assmat (donc 47 semaines d’accueil au maximum)."
                }
            },
            nb_heures_normales : {
                max : "Au-delà de 45 heures par semaine, le salaire est majoré. Par exemple, si votre assmat travaille 48 heures par semaine, saisissez 45 heures normales et 3 heures majorées."
            }
        }
    });
	
	var verifyHeuresMajorees = (function () {
		var majoration_heures_majorees_pcent = $('#majoration_heures_majorees');
		var majoration_heures_majorees_valeur = $('#majoration_heures_majorees_valeur');
		return function () {
			if (majoration_heures_majorees_pcent.val()=='' && majoration_heures_majorees_valeur.val()=='') {
				majoration_heures_majorees_pcent.closest('.input-group').addClass('has-error').removeClass('has-success');
				majoration_heures_majorees_valeur.closest('.input-group').addClass('has-error').removeClass('has-success');
			} else if (majoration_heures_majorees_pcent.val()!='' || majoration_heures_majorees_valeur.val()!='') {
				majoration_heures_majorees_pcent.closest('.input-group').addClass('has-success').removeClass('has-error');
				majoration_heures_majorees_valeur.closest('.input-group').addClass('has-success').removeClass('has-error');
			}
		}
	})();

    var calculateNbOfMeals = (function () {
        var nb_days_input = $('#nb_jours_accueil_reel');
        var meals_wrap = $('#wrap_nb_of_meals');
        var to_update = $('.nb-days-if-omad')
        return function () {
            var omad = parseInt(meals_wrap.find('[type=radio][name=one_meal_a_day]:checked').val(), 10);
            if (omad) {
                var nb_days = parseInt(nb_days_input.val(), 10);
                if (!nb_days) { nb_days = 0; }
                to_update.each(function(i, el) {
                    if (el.tagName === 'INPUT') {
                        $(el).val(nb_days);
                    } else {
                        $(el).text(nb_days);
                    }
                });
            }
        }
    })();
    calculateNbOfMeals();
    // observe changes on input form
    input_form.on('change', 'input', calculateAndDisplay);
    input_form.on('change', '[name=one_meal_a_day], [name=nb_jours_accueil_reel]', calculateNbOfMeals)
    input_form.on('submit', function(event) {
        calculateNbOfMeals();
		verifyHeuresMajorees();
        calculateAndDisplay();
        event.preventDefault();
    });
    // init help bubbles
    var popoverOptions = {
        placement: 'top',
        selector: '[data-toggle=popover]',
    }
    $('body').popover(popoverOptions);
});
