const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password123@ds147391.mlab.com:47391/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
    .find({ isPublished: true })
    .or([{ price: { $gte: 15 }}, { name: /.*by.*/i }]);
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
