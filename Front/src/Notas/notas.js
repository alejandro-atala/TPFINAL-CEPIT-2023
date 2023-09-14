import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './notas.css';
import { useAlumno } from '../Alumno/AlumnoContext';

const formatDate = (dateString) => {
	const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
	const date = new Date(dateString);
	return date.toLocaleDateString(undefined, options);
};

const Notas = () => {
	const [notas, setNotas] = useState([]);
	const { alumnoLogueado } = useAlumno();
	useEffect(() => {
		fetchNotas();
	}, []);

	const fetchNotas = async () => {
		try {
			console.log(alumnoLogueado);
			const response = await axios.get(`http://localhost:3000/notas-examenes/${alumnoLogueado.idAlumno}`);
			const notasData = response.data; // Asumiendo que response.data es un Array de objetos de nota
			setNotas(notasData);
			console.log(notasData);
		} catch (error) {
			console.error('Error fetching notas:', error);
		}

	};

	return (
		<div>
			<h4>Aquí podrás ver las notas de tus exámenes</h4>

			<table>
				<thead>
					<tr>
						<th>Fecha</th>
						<th>Materia</th>
						<th>Nota del examen</th>
						<th>Estado</th>
						<th>Recuperatorio</th>
						<th>Nota del recuperatorio</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>
					{notas.map((nota, index) => (
						<tr key={index}>

							<td>{formatDate(nota.fechaNota)}</td>
							<td>{nota.materia.materia}</td>
							<td>{nota.nota}</td>
							<td> {nota.nota !== null ? (nota.nota >= 7 ? 'Aprobado' : 'Desaprobado') : '-'}</td>
							<td>
								{nota.nota !== null && nota.nota < 7 ? formatDate(nota.fechaRecuperatorio) : '-'}
							</td>
							<td>{nota.notaRecuperatorio || '-'}</td>
							<td>{nota.notaRecuperatorio !== (null || undefined) ? (nota.notaRecuperatorio >= 7 ? 'Aprobado' : 'Desaprobado') : '-'}</td>

						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Notas;
