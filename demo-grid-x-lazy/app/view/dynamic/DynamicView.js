Ext.define('Demo.view.dynamic.DynamicView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.dynamicview',

    requires: [
        'Demo.view.dynamic.DynamicViewModel',
        'Demo.view.dynamic.DynamicViewController'
    ],

    viewModel: 'dynamicviewmodel',
    controller: 'dynamicviewcontroller',

    // bind: {
    //     title: '{selection.name}' 
    // },

    store: Ext.emptyStore,

    tools: [{
        iconCls: 'x-fas fa-table',
        tooltip: 'Resize Columns',
        handler: 'onResizeColumns'
    }, {
        iconCls: 'x-fa fa-sync-alt',
        tooltip: 'Reload',
        handler: 'onReloadGrid'
    }],

    columns: []
})