Ext.define('Demo.view.repo.RepoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.repoviewcontroller',

    css: `
        font-weight: 600;
        text-align: center;
        padding: 3px;
        border: 1px solid #d0d0d0; 
        border-radius: 3px; 
        background-color: #f6f6f6;
    `,

    sumSummary: function (value) {
        return `<div style="${this.css}">Total: ${value}</div>`;
    },

    avgSummary: function (value) {
        return `<div style="${this.css}">${value} AVG</div>`;
    },

    updatedAtSummary: function (value) {
        var date = Ext.util.Format.date(value, 'l, M jS, Y, g:i a');
        return `<div style="${this.css}">Latest Repo Update: ${date}</div> `;
    },

    pushedAtSummary: function (value) {
        var date = Ext.util.Format.date(value, 'l, M jS, Y, g:i a');
        return `<div style="${this.css}">Latest Commit Pushed: ${date}</div>`;
    }
});