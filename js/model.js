var pajomatic_model = (function (undefined) {
    var exports;

    exports = {};

    exports.calculateAnneeIncomplete = function (input) {
        var nb_heures_normales_mensualise = input.nb_semaines * input.nb_heures_normales / 12;
        var nb_heures_majorees_mensualise = input.nb_semaines * input.nb_heures_majorees / 12;
        var nb_heures_majorees = nb_heures_majorees_mensualise + input.nb_supp_majorees;
        var nb_heures_complementaires = Math.round(input.nb_supp_complementaires);

        var nb_jours_mensualise = Math.ceil(input.nb_semaines * input.nb_jours_par_semaine / 12);

        var nb_jours_activite = nb_jours_mensualise - input.absences_nb_jours;
        var salaire_h_normales = (nb_heures_normales_mensualise + nb_heures_complementaires) * input.salaire_net_normal;
        var salaire_majore = input.salaire_net_normal * (100 + input.majoration_heures_majorees) / 100;
        var salaire_h_majorees = nb_heures_majorees * salaire_majore;
        var salaire_hors_conges = (salaire_h_majorees + salaire_h_normales);
        var salaire_net_total = Math.round((salaire_hors_conges + input.montant_conges_payes)*100)/100;

        var nb_jours_reel = input.nb_jours_accueil_reel;
        var indemnites_entretien = input.indemnite_entretien * nb_jours_reel;
        var indemnites_repas = input.indemnite_repas * input.nb_repas + input.indemnite_gouter * input.nb_gouters;

        var output = {
            nb_heures_normales : Math.round(nb_heures_normales_mensualise),
            nb_jours_activite : nb_jours_activite,
            nb_jours_conges_payes : Math.ceil(input.nb_jours_conges_payes),
            salaire_horaire_net_normal : input.salaire_net_normal,
            nb_heures_majorees : Math.round(nb_heures_majorees),
            nb_heures_complementaires : Math.round(input.nb_supp_complementaires),
            salaire_net_total : salaire_net_total,
            indemnites_entretien : indemnites_entretien,
            indemnites_repas : indemnites_repas,
            total_a_payer : Math.round((salaire_net_total + indemnites_repas + indemnites_entretien)*100)/100
        };
        return output;
    };


    exports.calculateAnneeComplete = function (input) {
//  input.nb_jours_par_semaine = 4;
//  input.nb_heures_normales = 32;
//  input.salaire_net_normal = 3.00;
//  input.nb_supp_majorees = 0;
//  input.majoration_heures_majorees = 17;

        var nb_jours_activite = input.nb_jours_par_semaine * 52 / 12;
        var nb_heures_normales = input.nb_heures_normales * 52 / 12;
        var nb_heures_majorees = input.nb_heures_majorees * 52 / 12 + input.nb_supp_majorees;
        var salaire_heures_normales = (nb_heures_normales + input.nb_supp_complementaires) * input.salaire_net_normal;
        var salaire_horaire_majore = input.salaire_horaire_majore || input.salaire_net_normal * (100 + input.majoration_heures_majorees) / 100 ;
        var salaire_heures_majorees = nb_heures_majorees * salaire_horaire_majore;
        var salaire_net_total = salaire_heures_normales + salaire_heures_majorees;

        var output = {
            nb_heures_normales          : Math.round(nb_heures_normales),
            nb_jours_activite           : Math.ceil(nb_jours_activite),
            nb_jours_conges_payes       : 0,
            salaire_horaire_net_normal  : input.salaire_horaire_net_normal,
            nb_heures_majorees          : Math.round(nb_heures_majorees),
            nb_heures_complementaires   : Math.round(input.nb_supp_complementaires),
            salaire_net_total           : salaire_net_total,
            indemnites_entretien        : 0,
            indemnites_repas            : 0,
            total_a_payer               : 0
        };
        return output;
    };


    return exports;
})();
