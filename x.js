
// Trade off between query performance vs consistency

// Using References (Normalization) -> CONSISTENCY
let author = {
    name: 'Mac Gutierrez'
}

let course = {
    author: 'id'
}

// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course = {
    author: {
        name: 'Mac Gutierrez'
    }
}

// Hybrid
let author = {
    name: 'Mosh'
    // 50 other properties
}

let course = {
    author: {
        id: 'ref',
        name: 'Mac'
    }
}

// Section 10 - Authentication and Authorization

// Authentication -is the process of identifying if the user is who they claim they are, for example logging in
// Authorization - is determining if the user has the right permission to perform the given operation

// Register User: POST /api/users {name, email {unique: true}, password}
// Login User: POST /api/logins


// Section 14: TDD

// POST /api/returns {customerId, movieId}

// Return 401 if client is not logged in
// Return 400 if customerId is not provided
// Return 400 if movieId is not provided
// Return 404 if no rental found for this customer/movie
// Return 400 if rental already processed
// Return 200 if valid request
// Set the return date
// Calculate the rental fee
// Increase the stock
// Return the rental