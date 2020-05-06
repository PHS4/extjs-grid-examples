/**
 * The primary view that references the Users grid view.
 * Overrides can be applied in the configuration.
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.panel.Panel.html
 */
Ext.define('Demo.view.main.MainView', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainview',
    requires: [
        'Demo.ux.CountriesCombo',
        'Demo.view.source.SourceView',
        'Demo.view.users.UsersView',

        'Demo.view.main.MainViewController',
        'Demo.view.main.MainViewModel'
    ],

    viewModel: 'mainviewmodel',
    controller: 'mainviewcontroller',

    header: {
        bind: {
            title: '{title}'
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
        // wrap: true,
        pack: 'stretch',
        align: 'stretch'
    },

    defaults: {
        flex: 1,
        margin: 5
    },
    
    referenceHolder: true,
    
    items: [
        {
            xtype: 'usersview'
        },
        // {
        //     title: 'Manufacturers',
        //     xtype: 'grid',
        //     bind: '{manufacturers}',
        //     reference: 'manufacturer',
        //     columns: [
        //         { text: 'Name', dataIndex: 'name', flex: 1 }
        //     ],
        //     viewConfig: {
        //         emptyText: 'No Data',
        //         deferEmptyText: false
        //     }
        // },
        // {
        //     title: 'Items',
        //     xtype: 'grid',
        //     bind: '{items}',
        //     columns: [
        //         { dataIndex: 'id',              text: 'id' },
        //         { dataIndex: 'manufacturer_id', text: 'manufacturer_id' },
        //         { dataIndex: 'price',           text: 'price' },
        //         { dataIndex: 'name',            text: 'name' },
        //         { dataIndex: 'description',     text: 'description' },
        //         { dataIndex: 'image',           text: 'image' }
        //     ],
        //     viewConfig: {
        //         emptyText: 'No Data',
        //         deferEmptyText: false
        //     }
        // },
        // {
        //     title: 'Users',
        //     xtype: 'grid',
        //     bind: '{users}',
        //     columns: [
        //         { dataIndex: 'id', text: 'id' },    
        //     ],
        //     viewConfig: {
        //         emptyText: 'No Data',
        //         deferEmptyText: false
        //     }
        // },
        // {
        //     title: 'Properties',
        //     xtype: 'propertygrid',
        //     source: {
        //         "(name)": "My Object",
        //         "Created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
        //         "Available": false,
        //         "Version": 0.01,
        //         "Description": "A test object"
        //     }
        // }
    ]
});