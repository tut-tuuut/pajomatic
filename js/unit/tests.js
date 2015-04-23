function getBaseInput() {
  return { 
      nb_semaines : 0, 
      nb_jours_par_semaine : 0, 
      nb_heures_normales : 0, 
      nb_heures_majorees : 0, 
      salaire_net_normal : 0, 
      majoration_heures_majorees : 0, 
      indemnite_entretien : 0, 
      indemnite_repas : 0, 
      indemnite_gouter : 0, 
      nb_jours_accueil_reel : 0, 
      nb_repas : 0, 
      nb_gouters : 0, 
      nb_jours_conges_payes : 0, 
      montant_conges_payes : 0, 
      nb_supp_complementaires : 0, 
      nb_supp_majorees : 0, 
      absences_nb_heures_normales : 0, 
      absences_nb_heures_majorees : 0, 
      absences_nb_jours : 0
    };
}

QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
  var tata = 'x';
  var toto = 'z';
  assert.deepEqual({toto: tata, titi: toto}, {titi: toto, toto:tata}, "Comparaison d'objets");
});


QUnit.module("Année incomplète");

QUnit.test("Mensualisation sans heures majorées", function(assert) {
  var input = getBaseInput();
  input.nb_semaines = 44;
  input.nb_jours_par_semaine = 5;
  input.nb_heures_normales = 45;
  input.salaire_net_normal = 3.37;

  var subject = pajomatic_model.calculateAnneeIncomplete(input);

  assert.equal(
    subject.nb_heures_normales,
    165,
    "Le nombre d’heures normales est bien calculé."
  );
  assert.equal(
    subject.nb_heures_majorees,
    0,
    "Le nombre d’heures majorées est bien calculé."
  );
  assert.equal(
    subject.nb_jours_activite,
    19,
    "Le nombre de jours d'activité est bien calculé."
  );
  assert.equal(
    subject.total_a_payer,
    556.05,
    "Le montant total à payer est bien calculé."
  );
  assert.equal(
    subject.salaire_net_total,
    556.05,
    "Le salaire net total est bien calculé."
  );
});

QUnit.test("Mensualisation avec heures majorées", function(assert) {
  var input = getBaseInput();
  input.nb_semaines = 44;
  input.nb_jours_par_semaine = 5;
  input.nb_heures_normales = 45;
  input.nb_heures_majorees = 3;
  input.salaire_net_normal = 3.37;
  input.majoration_heures_majorees = 20;

  var subject = pajomatic_model.calculateAnneeIncomplete(input);

  assert.equal(
    subject.nb_heures_normales,
    165,
    "Le nombre d’heures normales est bien calculé."
  );
  assert.equal(
    subject.nb_heures_majorees,
    11,
    "Le nombre d’heures majorées est bien calculé."
  );
  assert.equal(
    subject.nb_jours_activite,
    19,
    "Le nombre de jours d'activité est bien calculé."
  );
  assert.equal(
    subject.total_a_payer,
    600.53,
    "Le montant total à payer est bien calculé."
  );
  assert.equal(
    subject.salaire_net_total,
    600.53,
    "Le salaire net total est bien calculé."
  );
});

QUnit.test("Calcul des indemnités d’entretien", function (assert) {
  var input = getBaseInput();
  input.indemnite_entretien = 3.37;
  input.nb_jours_accueil_reel = 14;

  var subject = pajomatic_model.calculateAnneeIncomplete(input);

  assert.equal(
    subject.indemnites_entretien,
    47.18, // 3.37 * 14
    "Le montant de l'indemnité d'entretien est bien calculé."
  );
});


QUnit.test("Indemnités de repas", function (assert) {
  var input = getBaseInput();
  input.indemnite_repas = 3.00;
  input.indemnite_gouter = 2.00;
  input.nb_repas = 21;
  input.nb_gouters = 20;

  var subject = pajomatic_model.calculateAnneeIncomplete(input);

  assert.equal(
    subject.indemnites_repas,
    103,
    "Le montant de l'indemnité de repas est correct."
  );
});


QUnit.test("Heures complémentaires", function (assert) {
  var input = getBaseInput();
  input.nb_semaines = 44;
  input.nb_jours_par_semaine = 5;
  input.nb_heures_normales = 45;
  input.salaire_net_normal = 3.37;
  input.nb_supp_complementaires = 4;

  var subject = pajomatic_model.calculateAnneeIncomplete(input);

  assert.equal(
    subject.nb_heures_normales,
    165,
    "Le nombre d’heures normales est bien calculé."
  );
  assert.equal(
    subject.nb_heures_majorees,
    0,
    "Le nombre d’heures majorées est bien calculé."
  );
  assert.equal(
    subject.nb_jours_activite,
    19,
    "Le nombre de jours d'activité est bien calculé."
  );
  assert.equal(
    subject.total_a_payer,
    556.05 + input.salaire_net_normal * input.nb_supp_complementaires,
    "Le montant total à payer est bien calculé."
  );
  assert.equal(
    subject.salaire_net_total,
    556.05 + input.salaire_net_normal * input.nb_supp_complementaires,
    "Le salaire net total est bien calculé."
  );
});


QUnit.test("Heures supplémentaires majorées", function(assert) {
  var input = getBaseInput();
  input.nb_semaines = 44;
  input.nb_jours_par_semaine = 5;
  input.nb_heures_normales = 45;
  input.nb_heures_majorees = 3;
  input.salaire_net_normal = 3.37;
  input.nb_supp_majorees = 4;
  input.majoration_heures_majorees = 20;

  var subject = pajomatic_model.calculateAnneeIncomplete(input);

  assert.equal(
    subject.nb_heures_normales,
    165,
    "Le nombre d’heures normales est bien calculé."
  );
  assert.equal(
    subject.nb_heures_majorees,
    15,
    "Le nombre d’heures majorées est bien calculé."
  );
  assert.equal(
    subject.nb_jours_activite,
    19,
    "Le nombre de jours d'activité est bien calculé."
  );
  assert.equal(
    subject.total_a_payer,
    616.71,
    "Le montant total à payer est bien calculé."
  );
  assert.equal(
    subject.salaire_net_total,
    616.71,
    "Le salaire net total est bien calculé."
  );
});


QUnit.test("Cas réel avril 2015", function(assert) {
  var input = getBaseInput();
  input.nb_semaines = 44;
  input.nb_jours_par_semaine = 5;
  input.nb_heures_normales = 45;
  input.nb_heures_majorees = 4;
  input.salaire_net_normal = 3.50;
  input.nb_supp_majorees = 2;
  input.majoration_heures_majorees = 20;
  input.nb_repas = 21;
  input.indemnite_repas = 3.00;
  input.indemnite_gouter = 2.00;
  input.nb_gouters = 21;
  input.nb_jours_accueil_reel = 21;
  input.indemnite_entretien = 3.50;

  var subject = pajomatic_model.calculateAnneeIncomplete(input);
  assert.equal(
    subject.nb_heures_normales,
    165,
    "Le nombre d’heures normales est bien calculé."
  );
  assert.equal(
    subject.nb_heures_majorees,
    17,
    "Le nombre d’heures majorées est bien calculé."
  );
  assert.equal(
    subject.nb_jours_activite,
    19,
    "Le nombre de jours d'activité est bien calculé."
  );
  assert.equal(
    subject.total_a_payer,
    826.00,
    "Le montant total à payer est bien calculé."
  );
  assert.equal(
    subject.salaire_net_total,
    647.50,
    "Le salaire net total est bien calculé."
  );
  assert.equal(
    subject.indemnites_repas,
    105,
    "Le montant de l'indemnité de repas est correct."
  );
  assert.equal(
    subject.indemnites_entretien,
    73.50,
    "Le montant de l'indemnité d'entretien est bien calculé."
  );
});

QUnit.module("Année complète");

QUnit.test("Mensualisation simple", function(assert) {
  // http://www.pajemploi.urssaf.fr/files/live/sites/pajewebinfo/files/contributed/pdf/employeur_ama/ExempleRemunerationAccueilRegulierAMA.pdf
  var input = getBaseInput('année complète');
// Josette gardera Laura du mardi
// au vendredi de 9 h à 17 h soit
// 32 h par semaine et 47 semaines
// au total dans l’année.
// Le salaire horaire net prévu au contrat de travail
// est de 3 € et 3,50 € pour les heures majorées

  input.nb_jours_par_semaine = 4;
  input.nb_heures_normales = 32;
  input.salaire_net_normal = 3.00;
  input.nb_supp_majorees = 0;
  input.majoration_heures_majorees = 17; // ça marche pas "3,50 € pour les heures majorées"

  var subject = pajomatic_model.calculateAnneeComplete(input);
  assert.equal(
    subject.nb_heures_normales,
    139,
    "Le nombre d’heures normales est bien calculé."
  );
  assert.equal(
    subject.nb_heures_majorees,
    0,
    "Le nombre d’heures majorées est bien calculé."
  );
  assert.equal(
    subject.nb_jours_activite,
    18,
    "Le nombre de jours d'activité est bien calculé."
  );
  assert.equal(
    subject.salaire_net_total,
    416.00,
    "Le salaire net total est bien calculé."
  );
});


QUnit.test("Heures supplémentaires complémentaires et majorées", function(assert) {
  // http://www.pajemploi.urssaf.fr/files/live/sites/pajewebinfo/files/contributed/pdf/employeur_ama/ExempleRemunerationAccueilRegulierAMA.pdf
  var input = getBaseInput('année complète');
// Josette gardera Laura du mardi
// au vendredi de 9 h à 17 h soit
// 32 h par semaine et 47 semaines
// au total dans l’année.
// Le salaire horaire net prévu au contrat de travail
// est de 3 € et 3,50 € pour les heures majorées

  input.nb_jours_par_semaine = 4;
  input.nb_heures_normales = 32;
  input.salaire_net_normal = 3.00;
  input.nb_supp_complementaires = 13;
  input.nb_supp_majorees = 5;
  input.salaire_horaire_majore = 3.50;

  var subject = pajomatic_model.calculateAnneeComplete(input);
  assert.equal(
    subject.nb_heures_normales,
    139,
    "Le nombre d’heures normales est bien calculé."
  );
  assert.equal(
    subject.nb_heures_majorees,
    5,
    "Le nombre d’heures majorées est bien calculé."
  );
  assert.equal(
    subject.nb_heures_complementaires,
    13,
    "Le nombre d’heures complémentaires est bien calculé."
  );
  assert.equal(
    subject.nb_jours_activite,
    18,
    "Le nombre de jours d'activité est bien calculé."
  );
  assert.equal(
    subject.salaire_net_total,
    472.50,
    "Le salaire net total est bien calculé."
  );
});


//QUnit.test("8 jours d'absence", function(assert) {
//  // http://www.pajemploi.urssaf.fr/files/live/sites/pajewebinfo/files/contributed/pdf/employeur_ama/ExempleRemunerationAccueilRegulierAMA.pdf
//  var input = getBaseInput('année complète');
//// Le mois suivant, Josette est
//// absente pour motif familial
//// pendant 2 semaines 
//// (absences non
//// rémunérées). Elle ne garde pas Laura pendant
//// 8 jours soit 64 heures au total (8 j x 8 h).
//// Josette aurait dû, réellement, garder Laura 17
//// jours ce mois ci, soit 136 heures (17 j x 8 h), or,
//// elle ne la garde que 9 jours
//
//  input.nb_jours_par_semaine = 4;
//  input.nb_heures_normales = 32;
//  input.salaire_net_normal = 3.00;
//  input.majoration_heures_majorees = 17; // ça marche pas "3,50 € pour les heures majorées"
//
//  input.absences_nb_heures_normales = 64; 
//  input.absences_nb_jours = 8;
//
//  var subject = pajomatic_model.calculateAnneeComplete(input);
//  assert.equal(
//    subject.nb_heures_normales,
//    73,
//    "Le nombre d’heures normales est bien calculé."
//  );
//  assert.equal(
//    subject.nb_heures_majorees,
//    0,
//    "Le nombre d’heures majorées est bien calculé."
//  );
//  assert.equal(
//    subject.nb_jours_activite,
//    10,
//    "Le nombre de jours d'activité est bien calculé."
//  );
//  assert.equal(
//    subject.salaire_net_total,
//    220.24,
//    "Le salaire net total est bien calculé."
//  );
//});
//