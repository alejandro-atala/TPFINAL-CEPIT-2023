import React from 'react'
import './notas.css';


const Notas = () => {
  return (
    <div>
      
  <h4> Aqui podras ver las notas de tus examenes</h4>

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
			<tr>
				<td>2023-04-21</td>
				<td>Matematica</td>
				<td>8</td>
				<td>Aprobado</td>
				<td>-</td>
        <td>-</td>
        <td>-</td>
			</tr>
			<tr>
				<td>2023-04-20</td>
				<td>Ingles</td>
				<td>5</td>
				<td>Desaprobado</td>
				<td>2023-04-27</td>
        <td>7</td>
        <td>Aprobado</td>
			</tr>
			<tr>
				<td>2023-04-19</td>
				<td>Historia</td>
				<td>9</td>
				<td>Aprobado</td>
				<td>-</td>
        <td>-</td>
        <td>-</td>
			</tr>
			<tr>
				<td>2023-04-18</td>
				<td>Fisica</td>
				<td>3</td>
				<td>Desaprobado</td>
				<td>2023-05-01</td>
        <td>6</td>
        <td>Desaprobado</td>
			</tr>
		</tbody>
	</table>

</div>

  )
}

export default Notas
