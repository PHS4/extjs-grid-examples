Ext.define('Demo.view.datasource.DataSourceView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.datasourceview',

    requires: [
        'Demo.view.datasource.DataSourceViewModel',
        'Demo.view.datasource.DataSourceViewController'
    ],

    viewModel: 'datasourceviewmodel',
    controller: 'datasourceviewcontroller',

    // listeners: {
    //     select: 'onSelect'
    // },
    
    title: 'Data Sources',
    
    bind: {
        store: '{dataSources}',
        selection: '{selection}'
    },

    tools: [{
        iconCls: 'x-fa fa-plus',
        handler: 'addDataSource'
    }],

    selModel: 'rowmodel',

    plugins: {
        cellediting: {
            clicksToEdit: 2,
            autoUpdate: true,
            listeners: {
                edit: 'onEdit'
            }
        }
    },

    columns: [
        { dataIndex: 'name', text: 'Name', editor: 'textfield', flex: 1 },
        { dataIndex: 'url', text: 'URL', editor: 'textfield', flex: 3 },
        { dataIndex: 'root', text: 'Root', editor: 'textfield', flex: 1 },
        {
            xtype: 'actioncolumn',
            align: 'center',
            width: 40,
            sortable: false,
            menuDisabled: true,
            items: [{
                xtype: 'button',
                itemId: 'reloadAction',
                iconCls: 'x-fa fa-sync-alt',
                tooltip: 'Test Load',
                handler: 'onLoadDataActionClick'
            }]
        }, {
            xtype: 'actioncolumn',
            align: 'center',
            width: 40,
            sortable: false,
            menuDisabled: true,
            items: [{
                xtype: 'button',
                itemId: 'generateGridAction',
                iconCls: 'x-fa fa-wrench',
                tooltip: 'Generate Grid',
                handler: 'onGenerateGridActionClick',
            }]
        },
        {
            xtype: 'actioncolumn',
            align: 'center',
            width: 40,
            sortable: false,
            menuDisabled: true,
            items: [{
                iconCls: 'x-fa fa-minus',
                tooltip: 'Delete Data Source',
                handler: 'onRemoveDataSource'
            }]
        }
    ]
}); 