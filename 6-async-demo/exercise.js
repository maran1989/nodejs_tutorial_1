// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//         getTopMovies((movies) => {
//             console.log('Top movies: ', movies);
//             sendEmail(customer.email, movies, () => {
//                 console.log('Email sent...')
//             });
//         });
//     }
// });

async function displayResult() {
    try {
        const customer = await getCustomer(1);
        console.log('Customer: ', customer);

        if (customer.isGold) {
            const movies = await getTopMovies();
            console.log('Top movies: ', movies);
            await sendEmail(customer.email, movies);
            console.log('Email Sent..')
        }
    } catch (err) {
        console.log(err.message);
    }
}

displayResult();

function getCustomer(id) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve({
                    id: 1,
                    name: 'Mac Gutierrez',
                    isGold: true,
                    email: 'email'
                });
            }, 4000);
        } catch (err) {
            reject(new Error(err));
        }
    });
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(['movie1', 'movie2']);
            }, 4000);
        } catch (err) {
            reject(new Error(err));
        }
    });
}

function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve();
            }, 4000);
        } catch (err) {
            reject(new Error(err));
        }
    });
}