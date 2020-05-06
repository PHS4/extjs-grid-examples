/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html
 */
Ext.define('Demo.view.main.MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewcontroller',
    
    id: 'mainViewController',
    
    viewSource: function(btn) {
        if (window.viewSourceWindow) {
            return;
        }
        window.viewSourceWindow = Ext.create('Demo.view.source.SourceView', {
            width: '65%',
            height: '75%',
            autoShow: true
        });

        window.viewSourceWindow.on('close', e => window.viewSourceWindow = null);
    }
});