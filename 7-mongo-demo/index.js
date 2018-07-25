const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password123@ds245901.mlab.com:45901/db_playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(value, callback) {
                setTimeout(() => {
                // Do some async work
                    const result = value && value.length > 0;
                    callback(result);
                }, 2000);
            },
            message: 'A course should have atleast one tag'
        }
    },
    date: Date,
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 10,
        max: 200,
        get: value => Math.round(value),
        set: value => Math.round(value)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    
    const course = new Course({
        name: 'Angular Course',
        category: 'Web',
        author: 'Mac',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    });

    try {
        const result = await course.save();
        console.log(result);
    } catch (err) {
        for(field in err.errors)
            console.log(err.errors[field].message);
    }
}

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;

    // Comparison Operators
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)

    // Logical Operators
    // or
    // and

    const courses = await Course
        .find({
            author: 'Mac',
            isPublish: true
        })
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .sort({
            name: 1
        })
        .select({
            name: 1,
            tags: 1
        });
    // Comparison Operators example
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })

    // Logical Operators example
    // .find()
    // .or([ { author: 'Mac' }, { isPublish: true } ])
    // .and([ { author: 'Mac' }, { isPublish: true } ])

    // Find using regex
    // Starts with Mac
    // .find({ author: /^Mac/ })

    // Ends with Gutierrez 'i' is case insensitive
    // .find({ author: /Gutierrez$/i })

    // Contains Mac
    // .find({author: /.*Mac.*/ })


    console.log(courses);
}

// async function updateCourse(id) {
//     const course = await Course.findById(id);
//     if(!course) return;
//     course.isPublish = true;
//     course.author = "Another Author";

//     const result = await course.save();
//     console.log(result);
// }
async function updateCourse(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublish: true
        }
    }, {
        new: true
    });
    console.log(course);
}

async function removeCourse(id) {
    //const result = await Course.deleteMany({ _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

createCourse();