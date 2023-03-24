// objectif: afficher la liste des etudiants d'une classe en particulier
const studentTable = []

class Student {
	constructor(params) {
		this.name = params.name
		this.firstName = params.firstName
		this.classroom = params.classroom
	}
}

class StudentView {
	display(studentList) {
		const container = document.createElement('div')
		container.innerHTML = `
<table>
    ${studentList.map((item) => `<tr><td>${item.name}</td><td>${item.firstName}</td></tr>`).join('')}
    </table>
    <button id="2deA">A</button><button id="2deC">C</button>
`
		document.getElementById('app').innerHTML = ''
		document.getElementById('app').appendChild(container)
	}
}

class StudentController {
	constructor() {
		this.studentModel = new StudentModel()
		this.studentModel.add(
			new Student({
				name: 'John',
				firstName: 'Doe',
				classroom: '2deA',
			})
		)
		this.studentModel.add(
			new Student({
				name: 'Ema',
				firstName: 'Beauty',
				classroom: '2deC',
			})
		)
		this.studentModel.add(
			new Student({
				name: 'Dufourc',
				firstName: 'Joseph',
				classroom: '2deA',
			})
		)
		this.studentView = new StudentView()
		this.show2deA = this.show2deA.bind(this)
		this.show2deC = this.show2deC.bind(this)
		this.show2deA()
	}
	handleSelectedClassroom() {
		document.getElementById('2deA').addEventListener('click', this.show2deA)
		document.getElementById('2deC').addEventListener('click', this.show2deC)
	}
	show2deA() {
		this.studentView.display(this.studentModel.listByClassroom('2deA'))
		this.handleSelectedClassroom()
	}
	show2deC() {
		this.studentView.display(this.studentModel.listByClassroom('2deC'))
		this.handleSelectedClassroom()
	}
}

class StudentModel {
	add(student /*de type Student*/) {
		studentTable.push(student)
	}
	list() {}
	listByClassroom(classroom /*string*/) {
		// liste les élèves pour une classe
		return studentTable.filter((item) => item.classroom === classroom)
	}
	update() {}
	remove() {}
}

const init = () => {
	new StudentController()
}

// init()
