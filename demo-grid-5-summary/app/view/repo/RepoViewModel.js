Ext.define('Demo.view.repo.RepoViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.repoviewmodel',

    stores: {
        repos: {
            model: 'Demo.model.github.Repo',
            autoLoad: true
        }
    }
});