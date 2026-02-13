import React from "react";
import "./App.css";

// Base Class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name}.`;
  }
}

// Student Class (Inheritance)
class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }

  greet() {
    return `Hello, my name is ${this.name} and I'm studying ${this.major}.`;
  }
}

// Teacher Class (Inheritance)
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  greet() {
    return `Hello, my name is ${this.name} and I teach ${this.subject}.`;
  }
}

function App() {
  const person = new Person("Alex Johnson", 30);
  const student = new Student("Emma Watson", 20, "Computer Science");
  const teacher = new Teacher("Dr. James Wilson", 45, "Mathematics");

  const people = [
    { obj: person, type: "Person" },
    { obj: student, type: "Student" },
    { obj: teacher, type: "Teacher" },
  ];

  return (
    <div className="container">
      <h1>Person Class Hierarchy</h1>

      {people.map((item, index) => (
        <div key={index} className="card">
          <h2>
            {item.obj.name} ({item.type})
          </h2>
          <p>Age: {item.obj.age}</p>
          <p><i>{item.obj.greet()}</i></p>

          {item.type === "Student" && (
            <p>Major: {item.obj.major}</p>
          )}

          {item.type === "Teacher" && (
            <p>Teaching: {item.obj.subject}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;

