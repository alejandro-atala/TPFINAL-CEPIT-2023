import React from 'react'

const Mensaje = () => {
  return (
    <div>
      <div class="">
    <form class=" container col-xs-12 col-md-3 mt-5 ">
        <select class="form-select" aria-label="Default select example">
            <option selected>Selecione profesor</option>
            <option value="1">Marta Sanchez</option>
            <option value="2">Raul Gonzalez</option>
            <option value="3">Estela Garto</option>
        </select>

        <div class="mt-3">
            <label for="exampleFormControlTextarea1" class="form-label">Escriba su mensaje</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <button type="submit" class="mt-5 btn btn-primary">Enviar mensaje</button>
        </div>
    </form>
</div>
    </div>
  )
}

export default Mensaje
