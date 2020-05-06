/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.Panel.html
 */
Ext.define('Demo.view.users.UsersView', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Demo.view.users.UsersViewController',
        'Demo.view.users.UsersViewModel'
    ],
    
    xtype: 'usersview',
    viewModel: 'usersviewmodel',
    controller: 'usersviewcontroller',

    title: 'Users',
    iconCls: 'x-fa fa-users',
    
    selModel: 'rowmodel',

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.Panel.html#cfg-store
     */
    bind: {
        store: '{users}'
    },

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.feature.Grouping.html
     */
    features: [{
        ftype: 'grouping',

        /**
         * Hides the column that is currently chosen to group by.
         * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.feature.Grouping.html#cfg-hideGroupedHeader
         */
        hideGroupedHeader: true,

        /**
         * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.feature.Grouping.html#cfg-groupHeaderTpl
         */
        groupHeaderTpl: 'Grouped by: {columnName} {name}'
    }],

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.Panel.html#cfg-columns
     */
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'ID',
        width: 60,
        align: 'right'
    }, {
        dataIndex: 'first_name',
        text: 'First Name',
        width: 110,
        align: 'left'
    }, {
        dataIndex: 'last_name',
        text: 'Last Name',
        width: 110,
        align: 'left'
    }, {
        dataIndex: 'email',
        text: 'Email',
        width: 300
    }, {
        xtype: 'booleancolumn',
        dataIndex: 'active',
        text: 'Active',
        width: 80,
        align: 'center',
        trueText: 'Yes',
        falseText: 'No'
    }, {
        xtype: 'datecolumn',
        dataIndex: 'created_at',
        text: 'Created',
        width: 140,
        align: 'center'
    }, {
        xtype: 'datecolumn',
        dataIndex: 'updated_at',
        text: 'Updated',
        width: 140,
        align: 'center'
    }]
});