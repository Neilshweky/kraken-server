'use strict'

var admin = require("firebase-admin");
var db = admin.database();
var moment = require ('moment')
var ref = db.ref();

exports.new_tb_hoth_rebel_phase_data = function (req, res) {
    
    set_up_hoth_rebel_db();
                                 
    res.send('Done!');

}

exports.instantiate_hoth_rebel = function (req, res) {
    ref.child('Territory Battles').child('Hoth: Rebel').child('Events').child(req.body.date).set(1, function(error) {
        if (error)
            res.send (error);
        else
            res.send ('Done');
    });
}

exports.get_current_phase_data = function (req, res) {

    var now = moment.utc();
    

    var tb_ref = ref.child('Territory Battles').child('Hoth: Rebel').child('Events');
    tb_ref.on("value", function (snapshot) {
        
        if (snapshot.val()) {

            var dic = snapshot.val();

            for (var key in dic) {
                console.log('key: ' + date);

                var date = moment(key, 'MM-DD-YYYY')
                console.log(date + ' ' + date.isBefore(moment()));
                
                

            }

        } else {
            console.log('No such document!');
        }
        res.send('Done');

    }, function(err) {
        console.log('Error getting document', err);
        res.send(err)
    });


}

exports.mission_completed = function (req, res) {
    // Hoth: Rebel-10/27/2017-Phase 1-combat-1
    var username = req.body.user;
    var guild = req.body.guild;
    var tb_name = req.body.tb_name;
    var dateString = req.body.date; 
    var phase = req.body.phase;
    var mission = req.body.mission;
    var waves = req.body.waves;
    
    var new_wave_data = ref.child('Territory Battles')
                         .child(tb_name)
                         .child('Events')
                         .child(dateString)
                         .child('Wave Data')
                         .child(guild)
                         .child('Users')
                         .child(username)
                         .child('Phases')
                         .child(phase)
                         .child(mission)
                         .set({
                             waves_completed: waves
                         });

    res.send("Done!")                
}



var set_up_hoth_rebel_phase_data = function() {

    var new_territory_battle = ref.child('Territory Battles')
                                 .child('Hoth: Rebel')
                                 .child('Phase Data');
    
    // Phase 1
    var new_phases = new_territory_battle.child('Phase 1');
    new_phases.child("combat_1"). set({
        waves: 6,
        requirements: "Light Side (2-Star)",
        type: "Combat Mission",
        rewards: "291,000 TP",
        territory: 'A',
        troops: "Characters"
    });
    new_phases.child("combat_2").set({
        waves: 6,
        requirements: "Light Side (2-Star)",
        type: "Combat Mission",
        rewards: "291,000 TP",
        territory: 'A',
        troops: "Characters"    
    });
    new_phases.child("special_1").set({
        waves: 3,
        requirements: "Phoenix Only (2-Star)",
        type: "Special Mission",
        rewards: "7 GETs",
        territory: 'A',
        troops: "Characters"      
    });

    //Phase 2
    var new_phases = new_territory_battle.child('Phase 2');
    new_phases.child("combat_1"). set({
        waves: 6,
        requirements: "Rebel (3-Star); Hoth Rebel Soldier",
        type: "Combat Mission",
        rewards: "329,000 TP",
        territory: 'A',
        troops: "Characters"
        
    });
    new_phases.child("combat_2").set({
        waves: 6,
        requirements: "Light Side (3-Star)",
        type: "Combat Mission",
        rewards: "329,000 TP",
        territory: 'A',
        troops: "Characters"
    });

    new_phases.child("combat_3").set({
        waves: 6,
        requirements: "Light Side (3-Star)",
        type: "Combat Mission",
        rewards: "329,000 TP",
        territory: "B",
        troops: "Characters"
    });

    new_phases.child("special_1").set({
        waves: 3,
        requirements: "Rogue One Only (3-Star)",
        type: "Special Mission",
        rewards: "8 GETs",
        territory: "B",
        troops: "Characters"
    });

    //Phase 3
    var new_phases = new_territory_battle.child('Phase 3');
    new_phases.child("combat_1"). set({
        waves: 3,
        requirements: "Light Side (3-Star)",
        type: "Combat Mission",
        rewards: "371,000 TP",
        territory: 'A',
        troops: "Ships"
        
    });
    new_phases.child("combat_2").set({
        waves: 6,
        requirements: "Rebels (4-Star); Hoth Rebel Scout",
        type: "Combat Mission",
        rewards: "372,000 TP",
        territory: 'B',
        troops: "Characters"
    });

    new_phases.child("combat_3").set({
        waves: 6,
        requirements: "Light Side (4-Star)",
        type: "Combat Mission",
        rewards: "372,000 TP",
        territory: "B",
        troops: "Characters"
    });

    new_phases.child("combat_4").set({
        waves: 6,
        requirements: "Light Side (4-Star)",
        type: "Combat Mission",
        rewards: "372,000 TP",
        territory: "C",
        troops: "Characters"
    });

    new_phases.child("special_1").set({
        waves: 3,
        requirements: "Light Side (5-Star); Captain Han Solo; Hoth Rebel Soldier",
        type: "Special Mission",
        rewards: "1 ROLO Shard",
        territory: "C",
        troops: "Characters"
    });

    //Phase 4
    var new_phases = new_territory_battle.child('Phase 4');
    new_phases.child("combat_1"). set({
        waves: 3,
        requirements: "Light Side (4-Star)",
        type: "Combat Mission",
        rewards: "478,000 TP",
        territory: 'A',
        troops: "Ships"
        
    });
    new_phases.child("combat_2").set({
        waves: 6,
        requirements: "Rebels (5-Star); Hoth Rebel Soldier",
        type: "Combat Mission",
        rewards: "423,000 TP",
        territory: 'B',
        troops: "Characters"
    });

    new_phases.child("combat_3").set({
        waves: 6,
        requirements: "Light Side (5-Star)",
        type: "Combat Mission",
        rewards: "423,000 TP",
        territory: "B",
        troops: "Characters"
    });

    new_phases.child("combat_4").set({
        waves: 6,
        requirements: "Light Side (5-Star)",
        type: "Combat Mission",
        rewards: "423,000 TP",
        territory: "C",
        troops: "Characters"
    });

    new_phases.child("special_1").set({
        waves: 3,
        requirements: "Light Side (5-Star); Captain Han Solo; Rebel Officer Leia Organa",
        type: "Special Mission",
        rewards: "20 GETs",
        territory: "C",
        troops: "Characters"
    });

    //Phase 5
    var new_phases = new_territory_battle.child('Phase 5');
    new_phases.child("combat_1"). set({
        waves: 3,
        requirements: "Light Side (5-Star)",
        type: "Combat Mission",
        rewards: "536,000 TP",
        territory: 'A',
        troops: "Ships"
        
    });
    new_phases.child("combat_2").set({
        waves: 6,
        requirements: "Rebels (6-Star); Hoth Rebel Scout",
        type: "Combat Mission",
        rewards: "470,000 TP",
        territory: 'B',
        troops: "Characters"
    });

    new_phases.child("combat_3").set({
        waves: 6,
        requirements: "Phoenix Only (6-Star)",
        type: "Combat Mission",
        rewards: "470,000 TP",
        territory: "B",
        troops: "Characters"
    });

    new_phases.child("special_1").set({
        waves: 3,
        requirements: "Light Side (6-Star); Commander Luke Skywalker",
        type: "Special Mission",
        rewards: "20 GETs",
        territory: "B",
        troops: "Characters"
    });

    new_phases.child("combat_4").set({
        waves: 6,
        requirements: "Light Side (6-Star)",
        type: "Combat Mission",
        rewards: "470,000 TP",
        territory: "C",
        troops: "Characters"
    });

    //Phase 6
    var new_phases = new_territory_battle.child('Phase 6');
    new_phases.child("combat_1"). set({
        waves: 3,
        requirements: "Light Side (6-Star)",
        type: "Combat Mission",
        rewards: "614,000 TP",
        territory: 'A',
        troops: "Ships"
        
    });
    new_phases.child("combat_2").set({
        waves: 6,
        requirements: "Rebels (7-Star)",
        type: "Combat Mission",
        rewards: "541,000 TP",
        territory: 'B',
        troops: "Characters"
    });

    new_phases.child("combat_3").set({
        waves: 6,
        requirements: "Rogue One Only (7-Star)",
        type: "Combat Mission",
        rewards: "541,000 TP",
        territory: "B",
        troops: "Characters"
    });

    new_phases.child("combat_4").set({
        waves: 6,
        requirements: "Light Side (7-Star)",
        type: "Combat Mission",
        rewards: "541,000 TP",
        territory: "C",
        troops: "Characters"
    });

    new_phases.child("special_1").set({
        waves: 3,
        requirements: "Light Side (7-Star); Captain Han Solo; Rebel Officer Leia Organa",
        type: "Special Mission",
        rewards: "20 GETs",
        territory: "B",
        troops: "Characters"
    });



}