Ext.define('Demo.view.repo.RepoView', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Demo.model.github.Repo',

        'Demo.view.repo.RepoViewController',
        'Demo.view.repo.RepoViewModel'
    ],

    controller: 'repoviewcontroller',
    viewModel: 'repoviewmodel',
    xtype: 'repoview',

    title: 'Repos',

    headerBorders: true,

    bind: {
        store: '{repos}'
    },

    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],

    columns: [{
        xtype: 'rownumberer',
        summaryType: 'count',
        width: 90,
        summaryRenderer: 'sumSummary'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        width: 300
    }, {
        xtype: 'numbercolumn',
        dataIndex: 'open_issues_count',
        text: 'Issues',
        align: 'center',
        format: '0,000',
        summaryType: 'sum',
        summaryRenderer: 'sumSummary'
    }, {
        xtype: 'numbercolumn',
        dataIndex: 'watchers_count',
        text: 'Watchers',
        align: 'center',
        format: '0,000',
        summaryType: 'sum',
        summaryRenderer: 'sumSummary'
    }, {
        xtype: 'datecolumn',
        dataIndex: 'updated_at',
        text: 'Last Updated',
        flex: 1,
        align: 'right',
        format: 'M jS, Y',
        summaryType: 'max',
        summaryRenderer: 'updatedAtSummary' // Look in RepoViewController.js
    }, {
        xtype: 'datecolumn',
        dataIndex: 'pushed_at',
        text: 'Last Push to Repo',
        flex: 1,
        align: 'right',
        format: 'l, M jS, Y, g:i a',
        summaryType: 'max',
        summaryRenderer: 'pushedAtSummary' // Look in RepoViewController.js
    }]
});

