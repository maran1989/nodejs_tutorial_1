const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password123@ds245901.mlab.com:45901/db_playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// async function updateAuthor(courseId) {
//   const course = await Course.findById(courseId);
//   course.author.name = "Mac Gutierrez";
//   course.save();
// }

async function updateAuthor(courseId) {
  const course = await Course.findByIdAndUpdate(courseId, {
      $set: {
          'author.name': 'Mac Gwapo'
      }
  }, {
      new: true
  });
  console.log(course);
}

// async function updateAuthor(courseId) {
//   const course = await Course.update({ _id: courseId }, {
//     $set: {
//       'author.name': 'Mac Gutierrez'
//     }
//   });
//   console.log(course);
// }

async function removeSubdocument(courseId) {
  const course = await Course.findByIdAndUpdate({ _id: courseId }, {
    $unset: {
      'author': ''
    }
  });
  console.log(course);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  
  course.authors.push(author);
  course.save();

  console.log(course);
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();

  console.log(course);
}

// createCourse('Node Course', [
//   new Author({ name: 'Mosh' }), 
//   new Author({ name: 'Mac' })
// ]);
// removeSubdocument('5b58cb759b59db179c8c2233');

// addAuthor('5b58d062025bed0e88acdd75', new Author({
//   name: 'Amy'
// }));

removeAuthor('5b58d062025bed0e88acdd75', '5b58d15f30a25516e82313d5');