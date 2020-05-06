/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.panel.Panel.html
 */
Ext.define('Demo.view.main.MainView', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainview',
    requires: [
        'Demo.view.source.SourceView',
        'Demo.view.users.UsersView',

        'Demo.view.main.MainViewController',
        'Demo.view.main.MainViewModel'
    ],

    viewModel: 'mainviewmodel',
    controller: 'mainviewcontroller',

    header: {

        bind: {
            title: '{title} : {feature}'
        },
        
        itemPosition: 1,

        items: [ 
            {
                xtype: 'button',
                ui: 'default-toolbar',
                cls: 'dock-tab-btn',
                iconCls: 'x-fa fa-code',
                text: 'View Source',
                handler: 'viewSource'
            }
        ]
    },

    bodyPadding: '20px',

    layout: {
        type: 'hbox',
        pack: 'stretch',
        align: 'stretch'
    },

    defaults: {
        flex: 1,
        margin: 5
    },
    
    items: [
        {
            xtype: 'usersview'
        }
    ]
});