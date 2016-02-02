var pajomatic_model = (function (undefined) {
    var exports;

    exports = {};

    var decimal = function (number) {
        if (!number) { return 0; }
        return Math.round(number * 100)/100;
    }

    exports.calculateAnneeIncomplete = function (input) {
        var nb_heures_normales_mensualise = input.nb_semaines * input.nb_heures_normales / 12;
        var nb_heures_normales = nb_heures_normales_mensualise;
        var nb_heures_majorees_mensualise = input.nb_semaines * input.nb_heures_majorees / 12;
        var nb_heures_majorees = nb_heures_majorees_mensualise + input.nb_supp_majorees;
        var nb_heures_complementaires = Math.round(input.nb_supp_complementaires);

        var nb_jours_mensualise = Math.ceil(input.nb_semaines * input.nb_jours_par_semaine / 12);

        var nb_jours_activite = nb_jours_mensualise;
        var salaire_h_normales = (nb_heures_normales + nb_heures_complementaires) * input.salaire_net_normal;
        if (input.salaire_horaire_majore) {
            var salaire_majore = input.salaire_horaire_majore;
        } else if (input.majoration_heures_majorees != 0) {
            var salaire_majore = input.salaire_net_normal * (100 + input.majoration_heures_majorees) / 100;
        } else if (input.majoration_heures_majorees_valeur != 0) {
            var salaire_majore = input.majoration_heures_majorees_valeur;
        } else {
            var salaire_majore = 0;
        }
        var salaire_h_majorees = nb_heures_majorees * salaire_majore;
        var salaire_hors_conges = (salaire_h_majorees + salaire_h_normales);
        var salaire_net_total = Math.round((salaire_hors_conges + input.montant_conges_payes)*100)/100;

        var nb_jours_reel_1 = input.nb_jours_accueil_reel;
        var nb_jours_reel_2 = input.nb_jours_accueil_reel_2;
        var nb_jours_reel_3 = input.nb_jours_accueil_reel_3;
        var nb_jours_reel_4 = input.nb_jours_accueil_reel_4;
        var indemnites_entretien_1 = input.indemnite_entretien * nb_jours_reel_1;
        var indemnites_entretien_2 = input.indemnite_entretien_2 * nb_jours_reel_2;
        var indemnites_entretien_3 = input.indemnite_entretien_3 * nb_jours_reel_3;
        var indemnites_entretien_4 = input.indemnite_entretien_4 * nb_jours_reel_4;
        var indemnites_entretien = indemnites_entretien_1 + indemnites_entretien_2 + indemnites_entretien_3 + indemnites_entretien_4;

        var indemnites_repas = input.indemnite_repas * input.nb_repas + input.indemnite_gouter * input.nb_gouters;

        var output = {
            nb_heures_normales : Math.round(nb_heures_normales),
            nb_jours_activite : nb_jours_activite,
            nb_jours_conges_payes : Math.ceil(input.nb_jours_conges_payes),
            salaire_horaire_net_normal : input.salaire_net_normal,
            nb_heures_majorees : Math.round(nb_heures_majorees),
            nb_heures_complementaires : Math.round(input.nb_supp_complementaires),
            salaire_net_total : salaire_net_total,
            indemnites_entretien : indemnites_entretien,
            indemnites_repas : indemnites_repas,
            total_a_payer : decimal(salaire_net_total + indemnites_repas + indemnites_entretien)
        };
        return output;
    };


    exports.calculateAnneeComplete = function (input) {
        var nb_jours_activite = input.nb_jours_par_semaine * 52 / 12;
        var nb_heures_normales = input.nb_heures_normales * 52 / 12;
        var nb_heures_majorees = input.nb_heures_majorees * 52 / 12 + input.nb_supp_majorees;

        var salaire_heures_normales = (nb_heures_normales + input.nb_supp_complementaires) * input.salaire_net_normal;
        if (input.salaire_horaire_majore) var salaire_horaire_majore = input.salaire_horaire_majore;
        else if (input.majoration_heures_majorees!=0) var salaire_horaire_majore = input.salaire_horaire_majore || input.salaire_net_normal * (100 + input.majoration_heures_majorees) / 100 ;
        else if (input.majoration_heures_majorees_valeur!=0) var salaire_horaire_majore = input.majoration_heures_majorees_valeur;
        else var salaire_horaire_majore = 0;
        var salaire_heures_majorees = nb_heures_majorees * salaire_horaire_majore;
        var salaire_net_total = salaire_heures_normales + salaire_heures_majorees;

        var nb_jours_reel_1 = input.nb_jours_accueil_reel;
        var nb_jours_reel_2 = input.nb_jours_accueil_reel_2;
        var nb_jours_reel_3 = input.nb_jours_accueil_reel_3;
        var nb_jours_reel_4 = input.nb_jours_accueil_reel_4;
        var indemnites_entretien_1 = input.indemnite_entretien * nb_jours_reel_1;
        var indemnites_entretien_2 = input.indemnite_entretien_2 * nb_jours_reel_2;
        var indemnites_entretien_3 = input.indemnite_entretien_3 * nb_jours_reel_3;
        var indemnites_entretien_4 = input.indemnite_entretien_4 * nb_jours_reel_4;
        var indemnites_entretien = indemnites_entretien_1 + indemnites_entretien_2 + indemnites_entretien_3 + indemnites_entretien_4;

        var indemnites_repas = input.indemnite_repas * input.nb_repas + input.indemnite_gouter * input.nb_gouters;

        var output = {
            nb_heures_normales          : Math.round(nb_heures_normales),
            nb_jours_activite           : Math.ceil(nb_jours_activite),
            nb_jours_conges_payes       : 0,
            salaire_horaire_net_normal  : decimal(input.salaire_net_normal),
            nb_heures_majorees          : Math.round(nb_heures_majorees),
            nb_heures_complementaires   : Math.round(input.nb_supp_complementaires),
            salaire_net_total           : decimal(salaire_net_total),
            indemnites_entretien        : decimal(indemnites_entretien),
            indemnites_repas            : decimal(indemnites_repas),
            total_a_payer               : decimal(salaire_net_total + indemnites_repas + indemnites_entretien)
        };
        return output;
    };

    return exports;
})();
