const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");

var team = [];

const roleQuestion = [
    {
        type: 'list',
        name: 'role',
        message: `What is the role of this team member?`,
        choices: ["Manager", "Engineer", "Intern", "None/Done"],
    }
];

const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the manager?',
    },

    {
        type: 'input',
        name: 'id',
        message: 'What is the ID of this manager?',
    },

    {
        type: 'input',
        name: 'email',
        message: 'What is this managers email?',
    },

    {
        type: 'input',
        name: 'office',
        message: 'What is this managers office number?',
    },
];

const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the engineer?',
    },

    {
        type: 'input',
        name: 'id',
        message: 'What is the ID of this engineer?',
    },

    {
        type: 'input',
        name: 'email',
        message: 'What is this engineers email?',
    },

    {
        type: 'input',
        name: 'github',
        message: 'What is this engineers github?',
    },

];

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the intern?',
    },

    {
        type: 'input',
        name: 'id',
        message: 'What is the ID of this intern?',
    },

    {
        type: 'input',
        name: 'email',
        message: 'What is this interns email?',
    },

    {
        type: 'input',
        name: 'school',
        message: 'What is this interns school?',
    },
];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function generateManager() {
    inquirer.prompt(managerQuestions)
      .then((answers) => {
          const manager = new Manager(answers.name, answers.id, answers.email, answers.office);
          team.push(manager);
          init();
      })
};

function generateEngineer() {
    inquirer.prompt(engineerQuestions)
      .then((answers) => {
          const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
          team.push(engineer);
          init();
      })
};

function generateIntern() {
    inquirer.prompt(internQuestions)
      .then((answers) => {
          const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
          team.push(intern);
          init();
      })
};

function init(){
    inquirer.prompt(roleQuestion)
    .then((answer) => {
        console.log(answer.role);

        if(answer.role === "Manager"){
            generateManager();
        } 
        else if(answer.role === "Engineer"){
            generateEngineer();
        }
        else if(answer.role === "Intern" ){
            generateIntern();
        }
        else {
            console.log(team);
            const template = render(team);
            console.log(template);
            return fs.writeFileSync(outputPath, template)
        }
    });
}

    

  init();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
