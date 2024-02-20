$(document).ready(() => {
    let listaVisible = false; // Variable para rastrear el estado de la lista de personajes

    $('#personajes').hide(); // Ocultamos el contenedor donde se muestran los personajes

    // Función para obtener todos los personajes
    $('#importarJson').click(function() {
        if (listaVisible) {
            // Si la lista está visible, la ocultamos
            $('#personajes').hide();
            listaVisible = false;
            $('#imagenPersonaje').hide();

        } else {
            // Si la lista está oculta, la mostramos y realizamos la solicitud AJAX
            $.ajax({
                type: 'GET',
                url: 'https://rickandmortyapi.com/api/character',
                dataType: 'json'
            }).done((data) => {
                let personajes = data.results;

                // Limpiamos la tabla antes de agregar nuevos personajes
                $('#personajes tbody').empty();

                $.each(personajes, function(indice, personaje) {
                    // Por cada ciclo tomamos un objeto personaje
                    let fila = $('<tr>');
                    fila.append($(`<td class="personaje" data-imagen="${personaje.image}">${personaje.name}</td>`));
                    $('#personajes tbody').append(fila);
                });

                // Mostramos la lista de personajes después de agregarlos
                $('#personajes').show();
                listaVisible = true;
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.error('Error al obtener los personajes:', textStatus, errorThrown);
            });
        }
    });

    $(document).on('click', '.personaje', function() {
        let imagen = $(this).data('imagen');
        $('#imagenPersonajeImg').attr('src', imagen);
        $('#imagenPersonaje').show();

    });
    
    // Cambiar el color al pasar el mouse sobre las columnas de la tabla
    $(document).on('mouseover', '.personaje', function() {
        $(this).css('background-color', 'green');
    });

    $(document).on('mouseout', '.personaje', function() {
        $(this).css('background-color', '');
    });
});
