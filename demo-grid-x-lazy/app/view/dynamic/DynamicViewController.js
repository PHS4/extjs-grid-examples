Ext.define('Demo.view.dynamic.DynamicViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dynamicviewcontroller',

    listeners: {
        selectionchange: 'onGridRowSelect'
    },

    onReloadGrid: function (e, el, header, tool) {
        var grid = header.up('grid');
        if (grid.store) {
            grid.store.reload();
        }
    },
    
    onResizeColumns: function (e, el, header, tool) {
        this.getView().getColumns().forEach(col => col.autoSize());
    },

    onGridRowSelect: function (view, selected) {
        if (selected.length) {
            Ext.Msg.alert('Row Selected', JSON.stringify(selected[0].data));
        }
    }
})