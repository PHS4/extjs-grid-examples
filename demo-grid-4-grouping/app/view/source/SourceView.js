/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.window.Window.html
 */
Ext.define('Demo.view.source.SourceView', {
    extend: 'Ext.window.Window',
    requires: [
        'Demo.ux.Code',

        'Demo.view.source.SourceViewModel',
        'Demo.view.source.SourceViewController'
    ],

    xtype: 'sourceview',
    viewModel: 'sourceviewmodel',
    controller: 'sourceviewcontroller',

    maximizable: true,
    collapsible: true,

    layout: 'fit',

    title: 'View Source',
    
    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.Component.html#method-initComponent
     */
    initComponent: function() {

        var me = this;
        var files = [
            { text: 'index.html' },
            { text: 'data/db.json' }
        ];

        // checks for script files added to the html document.
        //
        document.querySelectorAll('script:not(.exclude-from-source)').forEach((script, i) => {
            var relativePath = script.src.replace(window.location.href, '').split('?').slice(0, 1)[0];
            files.push({
                iconCls: 'x-fa fa-code',
                text: relativePath
            });
        });

        Ext.apply(me, {

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'left',
                margin: 10,
                scrollable: true,
                defaults: {
                    xtype: 'button',
                    textAlign: 'left',
                    ui: 'default-toolbar',
                    cls: 'dock-tab-btn',
                    iconCls: 'x-fa fa-code',
                    handler: 'changeSource'
                },
                items: files
            }],

            items: [{
                xtype: 'code',
                language: 'javascript',
                value: '// choose a file',
                margin: 10
            }]
        });

        me.callParent(arguments);
    }
});