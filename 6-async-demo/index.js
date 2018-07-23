console.log('Before');
getUser(1, getRepos);
console.log('After');

function getRepos(user) {
    getRepositories(user.gitHubUsername, getCmmts);
}

function getCmmts(repos) {
    getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({
            id: id,
            gitHubUsername: 'mac'
        });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Getting user github repositories...');
        callback(
            ['repo1', 'repo2', 'repo3']
        );
    }, 2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log('Getting user github repo commits...');
        callback(
            ['commit1', 'commit2', 'commit3']
        );
    }, 2000);
}