/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html
 */
Ext.define('Demo.view.users.UsersViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersviewcontroller',
    
    id: 'usersViewController',
    
    /**
     * Return false if desired to prevent/cancel editing.
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.plugin.RowEditing.html#event-beforeedit
     */
    onBeforeEdit: function(editor, context, eOpts) {
        Ext.toast({
            title: 'Event',
            iconCls: 'x-fa fa-broadcast-tower',
            html: arguments.callee.name,
            layout: 'fit'
        });
        // return false;
    },

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.plugin.RowEditing.html#event-canceledit
     */
    onCancelEdit: function (editor, context, eOpts) {
        Ext.toast({
            title: 'Event',
            iconCls: 'x-fa fa-broadcast-tower',
            html: arguments.callee.name,
            layout: 'fit'
        });
    },

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.plugin.RowEditing.html#event-validateedit
     */
    onValidateEdit: function (editor, context, eOpts) {
        Ext.toast({
            title: 'Event',
            iconCls: 'x-fa fa-broadcast-tower',
            html: arguments.callee.name,
            layout: 'fit'
        });
    },

    /**
     * https://docs.sencha.com/extjs/7.2.0/classic/Ext.grid.plugin.RowEditing.html#event-edit
     */
    onEdit: function (editor, context, eOpts) {

        /**
         * https://docs.sencha.com/extjs/7.2.0/classic/Ext.window.Toast.html
         */
        Ext.toast({
            layout: 'fit',
            html: `'${context.originalValue}' to '${context.value}'`,
            title: 'Cell Edited',
            align: 't'
        });
        context.record.commit();
    }
});