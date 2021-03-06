'use strict';

module.exports = function (app){
     var refresh_controller = require('./refresh-controller');
     var controller = require('./controller');
     
     app.route('/')
        .get(function(req, res) { res.send ("You've made it!")});

    app.route('/update/guildies')
        .get(refresh_controller.update_guildies);

    app.route('/update/guildiechars/:index')
        .get(refresh_controller.update_guildie_chars);

    app.route('/tb/setup/hoth_rebel')
        .post(controller.new_tb_hoth_rebel_phase_data);

    app.route('/tb/new/hoth_rebel')
        .post(controller.instantiate_hoth_rebel);

    app.route('/tb/waves')
        .post(controller.mission_completed);
        
    app.route('/tb/currentphase/hoth_rebel')
        .post(controller.get_current_phase_data);
}