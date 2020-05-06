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
    
    bind: {
        store: '{repos}'
    },

    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],

    columns: [{
        xtype: 'booleancolumn',
        dataIndex: 'has_issues',
        text: 'Has Issues',
        trueText: 'Yes',
        falseText: 'No',
        align: 'center',
        hidden: true
    },
    {
        dataIndex: 'avatar_url',
        width: 50,
        align: 'center',
        renderer: 'imageRenderer'
    },
    {
        xtype: 'numbercolumn',
        dataIndex: 'open_issues_count',
        text: 'Issues',
        width: 120,
        format: '0,000',
        align: 'center',
        renderer: RendererUtil.multi('bold', 'numberInverseColor'),
        summaryType: 'sum',
        summaryRenderer: 'sumSummary'
    },
    {
        xtype: 'numbercolumn',
        dataIndex: 'watchers_count',
        text: 'Watchers',
        width: 120,
        iconCls: 'x-fa fa-cog',
        format: '0,000',
        align: 'center',
        renderer: RendererUtil.bold,
        summaryType: 'sum',
        summaryRenderer: 'sumSummary'
    },
    {
        xtype: 'widgetcolumn',
        ingoreExport: true,
        width: 60,
        padding: 0,
        widget: {
            xtype: 'button',
            cls: 'icon-only',
            iconCls: 'x-fa fa-list-ul',
            tooltip: 'View Issues',
            preventDefault: true,
            bind: { href: '{record.url}' },
            handler: 'onViewIssuesClick'
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'full_name',
        text: 'Name',
        width: 300,
        renderer: Demo.util.Renderer.bold
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    },
    {
        xtype: 'datecolumn',
        dataIndex: 'pushed_at',
        text: 'Last Push to Repo',
        width: 300,
        align: 'right',
        format: 'l, M jS, Y, g:i a',
        summaryType: 'max',
        summaryRenderer: 'pushedAtSummary' // Look in RepoViewController.js
    },
    {
        xtype: 'widgetcolumn',
        text: 'Clone',
        ingoreExport: true,
        width: 60,
        padding: 0,
        widget: {
            xtype: 'button',
            cls: 'icon-only',
            iconCls: 'x-fab fa-github',
            tooltip: 'Open on Desktop',
            hrefTarget: '',
            bind: { href: 'x-github-client://openRepo/{record.clone_url}' }
        }
    }]
});

