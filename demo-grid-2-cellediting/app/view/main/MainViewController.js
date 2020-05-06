/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html
 */
Ext.define('Demo.view.main.MainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.mainviewcontroller',
    
    id: 'mainViewController',
    
    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html#cfg-control
     */
    control: {
        'button': {
            click: 'onEventLogger'
        }
    },
    
    onEventLogger: function (e) {
        console.log(`${this.$className}.${arguments.callee.name}`, e);
    },

    viewSource: function(btn) {
        Ext.create('Demo.view.source.SourceView', {
            width: '65%',
            height: '75%',
            layout: 'fit',
            id: 'viewSourceWindow',
            autoShow: true
        });
    }
});