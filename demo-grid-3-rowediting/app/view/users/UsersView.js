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

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.Panel.html#cfg-store
     */
    bind: {
        store: '{users}'
    },

    /**
     * Functionality to add onto a grid.
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.plugin.RowEditing.html
     */
    plugins: [{
        ptype: 'rowediting',
        autoUpdate: true,
        clicksToEdit: 2,
        listeners: {
            beforeedit: 'onBeforeEdit',
            edit: 'onEdit',
            validateedit: 'onValidateEdit',
            canceledit: 'onCancelEdit'
        }
    }],
    
    /**
     * Define a selection as the row (record) row or a cell (single value).
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.selection.Model.html
     */
    selModel: 'rowmodel',

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
        align: 'left',
        editor: {
            xtype: 'textfield',
            vtype: 'alpha'
        }
    }, {
        dataIndex: 'last_name',
        text: 'Last Name',
        width: 110,
        align: 'left',
        editor: {
            xtype: 'textfield',
            vtype: 'alpha'
        }
    }, {
        dataIndex: 'email',
        text: 'Email',
        width: 300,
        editor: {
            xtype: 'textfield',
            vtype: 'email'
        }
    }, {
        xtype: 'booleancolumn',
        dataIndex: 'active',
        text: 'Active',
        width: 80,
        align: 'center',
        trueText: 'Yes',
        falseText: 'No',
        editor: {
            xtype: 'checkbox'
        }
    }, {
        xtype: 'datecolumn',
        dataIndex: 'created_at',
        text: 'Created',
        width: 140,
        align: 'center',
        editor: {
            xtype: 'datefield'
        }
    }, {
        xtype: 'datecolumn',
        dataIndex: 'updated_at',
        text: 'Updated',
        width: 140,
        align: 'center',
        editor: {
            xtype: 'datefield'
        }
    }]
});