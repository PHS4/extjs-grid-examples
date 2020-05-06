/**
 * The primary view that references the Users grid view.
 * Overrides can be applied in the configuration.
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.panel.Panel.html
 * ./app/view/main/Main.js
 */
Ext.define('Demo.view.main.MainView', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainview',
    
    requires: [
        'Demo.ux.Code',
        'Demo.view.datasource.RawView',
        'Demo.view.datasource.DataSourceView',
        'Demo.view.dynamic.DynamicView',
        
        'Demo.view.main.MainViewController',
        'Demo.view.main.MainViewModel',
    ],

    viewModel: 'mainviewmodel',
    controller: 'mainviewcontroller',

    header: {
        bind: { title: '{title}' },
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

    // margin: 10,
    bodyPadding: '20px 0 20px 0',

    // layout: { type: 'hbox', pack: 'stretch', align: 'stretch' },
    layout: 'border',

    items: [
        {
            xtype: 'panel',
            region: 'west',
            resizable: true,
            collapsible: true,
            split: true,
            iconCls: 'x-fa fa-cog',
            title: 'Settings',
            flex: 2,
            
            layout: { type: 'vbox', pack: 'stretch', align: 'stretch' },
            items: [
                {
                    xtype: 'datasourceview',
                    collapsible: true,
                    flex: 1,
                    margin: '10px 0 0 0'
                },
                { xtype: 'splitter' },
                {
                    xtype: 'container',
                    flex: 3,
                    // margin: 10,
                    layout: { type: 'hbox', pack: 'stretch', align: 'stretch' },
                    items: [
                        {
                            xtype: 'datasourcerawview',
                            itemId: 'raw',
                            flex: 1.5,
                            cls: 'interactive-source',
                            infoText:
                                'Click on a property below to set or change to ' +
                                'Root (<code>rootProperty</code>) value. For best ' +
                                'results choose an array property name.',
                            bind: {
                                value: '{rawData}'
                            }
                        },
                        { xtype: 'splitter' },
                        {
                            xtype: 'datasourcerawview',
                            title: 'Sample Record',
                            itemId: 'sample',
                            flex: 1,
                            infoText:
                                'This data should represent a single record. It ' +
                                'will be used to generate the fields & columns.',
                            bind: { value: '{sampleData}' }
                        },
                        { xtype: 'splitter' },
                        {
                            xtype: 'datasourcerawview',
                            title: 'Generated Fields',
                            itemId: 'fields',
                            infoText:
                                'This data is used to generate the grid columns ' +
                                'and store fields.',
                            flex: 1,
                            bind: { value: '{fieldsData}' }
                        }
                    ]
                }
            ]
        },
        {
            region: 'center',
            split: true,
            flex: 1,

            xtype: 'dynamicview',
            itemId: 'tbdGrid',
            bind: { title: '{selection.name}.{selection.root}' },
        }
    ]
});
