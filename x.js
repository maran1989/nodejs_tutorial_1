
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