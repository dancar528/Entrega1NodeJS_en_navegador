let cursos = require('./cursos.json');

let opciones = {
	id_curso: {
		demand: true,
		alias: 'id'
	},
	nombre_interesado: {
		demand: true,
		alias: 'nombre'
	},
	cedula: {
		demand: true,
		alias: 'doc'
	}
};

const argv = require('yargs')
	.command('inscribir', 'Inscribir alumno', opciones)
	.argv;
const express = require('express');
const app = express();
let texto = '';

app.get('/', function(req, res) {
	res.send(texto);
});

app.listen(3000, function() {
	console.log('Servidor escuchando en el puerto 3000');
});

if (argv._[0] === 'inscribir') {

	let curso = cursos.find(curso => curso.id == argv.id);

	if (typeof curso !== 'undefined'){

		texto = `<br>Curso: ${curso.nombre}<br>`
			+ `Id: ${curso.id}<br>`
			+ `Duracion: ${curso.duracion}<br>`
			+ `Valor: ${curso.valor}<br><br>`
			+ `Nombre: ${argv.nombre}<br>`
			+ `Cedula: ${argv.doc}<br>`;
	} else {
		texto = `<br>No existe curso con ID ${argv.id}<br><br>` +
			'<br>Cursos existentes:<br><br>';

		for (let i = 0; i < cursos.length; i++) {
			texto += `Curso: ${cursos[i].nombre}<br>`
				+ `Id: ${cursos[i].id}<br>`
				+ `Duracion: ${cursos[i].duracion}<br>`
				+ `Valor: ${cursos[i].valor}<br><br>`;
		}
	}
} else {
	texto = 'Comando no existe. Comandos existentes: Inscribir';
}
