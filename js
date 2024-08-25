// globalValidation.js

$(document).ready(function() {
    // Función para validar todos los formularios en la página
    function validateForms() {
        let isValid = true;

        // Recorre cada formulario en la página
        $('form').each(function () {
            const form = $(this);

            // Recorre cada input, select y textarea en el formulario
            form.find('input, select, textarea').each(function () {
                const field = $(this);
                const fieldId = field.attr('id');
                const errorElement = $(`#error${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`);

                if (field.prop('required') && field.val().trim() === '') {
                    // Campo requerido está vacío
                    errorElement.text('Este campo es obligatorio');
                    isValid = false;
                } else if (field.attr('type') === 'email' && !/^\S+@\S+\.\S+$/.test(field.val().trim())) {
                    // Validación de correo electrónico
                    errorElement.text('El correo electrónico es inválido');
                    isValid = false;
                } else if (field.attr('type') === 'password' && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,18}$/.test(field.val().trim())) {
                    // Validación de contraseña
                    errorElement.text('La contraseña debe tener entre 6-18 caracteres, y al menos 1: mayúscula, minúscula, dígito y carácter especial');
                    isValid = false;
                } else if (field.attr('id') === 'confirmarContrasena' && field.val().trim() !== $('#contrasena').val().trim()) {
                    // Comparación de contraseñas
                    errorElement.text('Las contraseñas no coinciden');
                    isValid = false;
                } else {
                    // Limpiar mensaje de error si el campo es válido
                    errorElement.text('');
                }
            });
        });

        return isValid;
    }

    // Maneja el envío de formularios
    $('form').on('submit', function(event) {
        if (!validateForms()) {
            event.preventDefault(); // Previene el envío si hay errores
            $('#mensajeError').text('Por favor, corrige los errores en el formulario');
        } else {
            $('#mensajeError').text('');
        }
    });

    // Función para limpiar todos los formularios y los mensajes de error
    window.limpiarFormulario = function() {
        $('form')[0].reset();
        $('.text-danger').text('');
        $('#mensajeError').text('');
    };
});