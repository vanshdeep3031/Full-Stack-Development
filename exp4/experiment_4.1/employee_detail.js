const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let employee = [];

function menu() {
    console.log("\n1. Add");
    console.log("2. List");
    console.log("3. Exit");

    rl.question("Choose: ", function (choice) {

        if (choice === "1") {
            addEmployee();
        } 
        else if (choice === "2") {
            listEmployee();
        } 
        else if (choice === "3") {
            console.log("Exiting...");
            rl.close();
        } 
        else {
            console.log("Invalid choice!");
            menu();
        }
    });
}

function addEmployee() {
    rl.question("Name: ", function (name) {
        rl.question("Position: ", function (position) {

            let emp = {
                name: name,
                position: position
            };

            employee.push(emp);   // ✅ fixed
            console.log("Employee added successfully!");
            menu();
        });
    });
}

function listEmployee() {
    if (employee.length === 0) {
        console.log("No employees found.");
    } else {
        console.log("\nEmployee List:");
        employee.forEach((emp, index) => {
            console.log(`${index + 1}. Name: ${emp.name}, Position: ${emp.position}`);
        });
    }
    menu();
}

menu();
