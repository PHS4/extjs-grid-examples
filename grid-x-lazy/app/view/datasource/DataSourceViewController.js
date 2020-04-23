Ext.define('Demo.view.datasource.DataSourceViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.datasourceviewcontroller',

    onLoadDataActionClick: function (grid, rowIndex, colIndex, actionCmp, event, record) {
        this.getView().fireEvent('loaddata', record);
    },

    onGenerateGridActionClick: function (grid, rowIndex, colIndex, actionCmp, event, record) {
        this.getView().fireEvent('generategrid', record);
    },

    onRemoveDataSource: function (grid, rowIndex, colIndex, actionCmp, event, record) {
        record.drop();
    },

    addDataSource: function (event, element, header, tool) {
        var grid = this.getView();
        var rec = grid.getStore().insert(0, {
            name: null,
            url: null,
            root: null
        });
        grid.findPlugin('cellediting').startEdit(rec[0], 0);
    },

    onEdit: function (editor, context) {
        context.record.save();
    }
});