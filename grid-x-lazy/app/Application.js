/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.Application.html
 */
Ext.define('Demo.Application', {
    extend: 'Ext.app.Application',

    name: 'Demo',

    requires: [
        'Demo.view.main.MainView'
    ],

    launch: function () {
        Ext.create({
            xtype: 'mainview', 
            plugins: 'viewport' 
        });
    }
});
