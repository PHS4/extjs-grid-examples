/**
 * https://docs.sencha.com/extjs/7.2.0/classic/Ext.app.ViewController.html
 */
Ext.define('Demo.view.users.UsersViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.usersviewcontroller',
    
    id: 'usersViewController',

    onEdit: function (editor, context, eOpts) {

        if (context.originalValue !== context.value) {

            /**
             * https://docs.sencha.com/extjs/7.2.0/classic/Ext.window.Toast.html
             */
            Ext.toast({
                layout: 'fit',
                html: `'${context.originalValue}' to '${context.value}'`,
                title: 'Cell Edited',
                align: 't'
            });

            /**
             * Commit 'saves' the change to memory. When connected to an API
             * you can call `context.record.save();`
             * 
             * https://docs.sencha.com/extjs/7.2.0/classic/Ext.data.Model.html
             */
            context.record.commit();
        }
    }
});