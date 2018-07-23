// Callback example
// console.log('Before');
// getUser(1, getRepos);
// console.log('After');

// function getRepos(user) {
//     getRepositories(user.gitHubUsername, getCmmts);
// }

// function getCmmts(repos) {
//     getCommits(repos[0], displayCommits);
// }

// function displayCommits(commits) {
//     console.log(commits);
// }

// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log('Reading a user from a database...');
//         callback({
//             id: id,
//             gitHubUsername: 'mac'
//         });
//     }, 2000);
// }

// function getRepositories(username, callback) {
//     setTimeout(() => {
//         console.log('Getting user github repositories...');
//         callback(
//             ['repo1', 'repo2', 'repo3']
//         );
//     }, 2000);
// }

// function getCommits(repo, callback) {
//     setTimeout(() => {
//         console.log('Getting user github repo commits...');
//         callback(
//             ['commit1', 'commit2', 'commit3']
//         );
//     }, 2000);
// }


console.log('Before');

// Promise-based approach
// getUser(1)
//     .then(user => getRepositories(user.gitHubUsername))
//     .then(repos => getCommits(repos[1]))
//     .then(commits => displayCommits(commits))
//     .catch(err => console.log(err.message));

// Async and Await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error', err.message);
    }
}

displayCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        // Kick off some async work
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({
                id: id,
                gitHubUsername: 'mac'
            });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting user github repositories...');
            // resolve(
            //     ['repo1', 'repo2', 'repo3']
            // );
            reject(new Error('Could not get the repos'));
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Getting user github repo commits...');
            resolve(
                ['commit1', 'commit2', 'commit3']
            );
        }, 2000);
    });
}