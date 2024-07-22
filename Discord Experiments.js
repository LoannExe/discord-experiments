(function() {
    const getCache = () => {
        let cache;
        webpackChunkdiscord_app.push([['wp_isdev_patch'], {}, r => cache = r.c]);
        return cache;
    };
    
    const getUserStore = (cache) => {
        return Object.values(cache)
            .find(module => module?.exports?.default?.getUser)
            .exports.default;
    };
    
    const getActions = (userStore) => {
        return Object.values(userStore._dispatcher._actionHandlers._dependencyGraph.nodes);
    };
    
    const performConnectionOpen = (actions, user) => {
        actions.find(action => action.name === 'ExperimentStore')
            .actionHandler.CONNECTION_OPEN({
                type: 'CONNECTION_OPEN',
                user: { flags: user.flags |= 1 },
                experiments: []
            });
        actions.find(action => action.name === 'DeveloperExperimentStore')
            .actionHandler.CONNECTION_OPEN();
    };
    
    const finalize = (user) => {
        user.flags &= ~1;
        alert('Succesfully enabled Discord Experiments.\nScript made by NotLoann.');
    };
    
    const main = () => {
        const cache = getCache();
        const userStore = getUserStore(cache);
        const actions = getActions(userStore);
        const user = userStore.getCurrentUser();
        performConnectionOpen(actions, user);
        webpackChunkdiscord_app.pop();
        finalize(user);
    };
    
    main();
})();
