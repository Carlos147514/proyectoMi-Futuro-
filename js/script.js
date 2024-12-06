/* Validación de jqBootstrap
 * Un complemento para automatizar la validación en formularios con formato Twitter Bootstrap.
 *
 * versión 1.3.6
 *
 * Licencia: MIT <http://opensource.org/licenses/mit-license.php> - ver archivo LICENCIA
 *
 * http://ReactiveRaven.github.com/jqBootstrapValidation/
 */

(función( $ ){

	var createdElements = [];

	var valores predeterminados = {
		opciones: {
			anteponerExistingHelpBlock: falso,
			sniffHtml: verdadero, // busca 'requerido', 'longitud máxima', etc.
			preventSubmit: true, // evita que se active el evento de envío de formulario si falla la validación
			submissionError: false, // función llamada si hay un error al intentar enviar
			submissionSuccess: false, // función llamada justo antes de que se envíe un evento de envío exitoso al servidor
            semanticallyStrict: false, // configúrelo como verdadero para ordenar la salida HTML generada
			autoAgregar: {
				Bloques de ayuda: verdadero
			},
            filtro:función(){
                // devuelve $(this).is(":visible"); // valida solo los elementos que puedes ver
                devuelve verdadero; // valida todo
            }
		},
    métodos: {
      init : función( opciones ) {

        var configuraciones = $.extend(true, {}, valores predeterminados);

        configuraciones.opciones = $.extend(true, configuraciones.opciones, opciones);

        var $siblingElements = esto;

        var uniqueForms = $.unique(
          $siblingElements.map(función () {
            devuelve $(this).parents("formulario")[0];
          }).toArray()
        );

        $(uniqueForms).bind("enviar", función (e) {
          var $formulario = $(este);
          var advertenciasEncontradas = 0;
          var $inputs = $form.find("entrada,áreadetexto,seleccionar").not("[tipo=enviar],[tipo=imagen]").filter(configuraciones.opciones.filter);
          $inputs.trigger("enviar.validacion").trigger("validacionPerdidoEnfoque.validacion");

          $entradas.each(función (i, el) {
            var $esto = $(el),
              $grupoControl = $this.parents(".grupo-Control").first();
            si (
              $controlGroup.hasClass("advertencia")
            ) {
              $controlGroup.removeClass("advertencia").addClass("error");
              advertenciasEncontradas++;
            }
          });

          $inputs.trigger("validacionPerdidaDeFocus.validacion");

          si (advertenciasEncontradas) {
            si (configuraciones.opciones.preventSubmit) {
              e.preventDefault();
            }
            $formulario.addClass("error");
            si ($.isFunction(configuraciones.opciones.submitError)) {
              configuraciones.opciones.submitError($formulario, e, $entradas.jqBootstrapValidation("collectErrors", verdadero));
            }
          } demás {
            $form.removeClass("error");
            si ($.isFunction(configuraciones.opciones.submitSuccess)) {
              configuraciones.opciones.submitSuccess($formulario, e);
            }
          }
        });

        devuelve esto.each(función(){

          // Obtenga referencias de todo lo que nos interesa
          var $esto = $(esto),
            $grupoDeControl = $this.parents(".grupoDeControl").first(),
            $helpBlock = $controlGroup.find(".help-block").first(),
            $formulario = $this.parents("formulario").first(),
            validadoresNombres = [];

          // crea un contenedor de mensajes si no existe
          si (!$helpBlock.length && configuraciones.opciones.autoAdd && configuraciones.opciones.autoAdd.helpBlocks) {
              $bloque-de-ayuda = $('<div class="bloque-de-ayuda" />');
              $controlGroup.find('.controls').append($helpBlock);
							createdElements.push($helpBlock[0]);
          }

          // ================================================== ==============
          // SNIFF HTML PARA VALIDADORES
          // ================================================== ==============

          // *bufido, sorbo, resoplido*

          si (configuraciones.opciones.sniffHtml) {
            var mensaje = "";
            // ------------------------------------------------ ---------
            // PATRÓN
            // ------------------------------------------------ ---------
            si ($this.attr("patrón") !== indefinido) {
              mensaje = "No está en el formato esperado<!-- mensaje-patrón-de-validación-de-datos a anular -->";
              si ($this.data("mensajePatrónValidación")) {
                mensaje = $this.data("validationPatternMessage");
              }
              $this.data("validationPatternMessage", mensaje);
              $this.data("validationPatternRegex", $this.attr("patrón"));
            }
            // ------------------------------------------------ ---------
            // MÁXIMO
            // ------------------------------------------------ ---------
            si ($this.attr("max") !== indefinido || $this.attr("aria-valuemax") !== indefinido) {
              var max = ($this.attr("max") !== indefinido ? $this.attr("max") : $this.attr("aria-valuemax"));
              mensaje = "Demasiado alto: máximo de '" + max + "'<!-- data-validation-max-message a anular -->";
              si ($this.data("validationMaxMessage")) {
                mensaje = $this.data("validationMaxMessage");
              }
              $this.data("validationMaxMessage", mensaje);
              $this.data("validationMaxMax", máx);
            }
            // ------------------------------------------------ ---------
            // MÍNIMO
            // ------------------------------------------------ ---------
            si ($this.attr("min") !== indefinido || $this.attr("aria-valuemin") !== indefinido) {
              var min = ($this.attr("min") !== indefinido ? $this.attr("min") : $this.attr("aria-valuemin"));
              mensaje = "Demasiado bajo: mínimo de '" + min + "'<!-- data-validation-min-message a anular -->";
              si ($this.data("validationMinMessage")) {
                mensaje = $this.data("validationMinMessage");
              }
              $this.data("validationMinMessage", mensaje);
              $this.data("validacionMinMin", min);
            }
            // ------------------------------------------------ ---------
            // LONGITUD MÁXIMA
            // ------------------------------------------------ ---------
            si ($this.attr("maxlength") !== indefinido) {
              mensaje = "Demasiado largo: máximo de '" + $this.attr("maxlength") + "' caracteres<!-- data-validation-maxlength-message a anular -->";
              si ($this.data("validationMaxlengthMessage")) {
                mensaje = $this.data("validationMaxlengthMessage");
              }
              $this.data("validationMaxlengthMessage", mensaje);
              $this.data("validationMaxlengthMaxlength", $this.attr("longitud máxima"));
            }
            // ------------------------------------------------ ---------
            // LONGITUD MÍNIMA
            // ------------------------------------------------ ---------
            si ($this.attr("minlength") !== indefinido) {
              mensaje = "Demasiado corto: mínimo de '" + $this.attr("minlength") + "' caracteres<!-- data-validation-minlength-message a anular -->";
              si ($this.data("validationMinlengthMessage")) {
                mensaje = $this.data("validationMinlengthMessage");
              }
              $this.data("validationMinlengthMessage", mensaje);
              $this.data("validationMinlengthMinlength", $this.attr("minlength"));
            }
            // ------------------------------------------------ ---------
            // REQUERIDO
            // ------------------------------------------------ ---------
            si ($this.attr("requerido") !== indefinido || $this.attr("aria-requerido") !== indefinido) {
              mensaje = configuraciones.builtInValidators.required.mensaje;
              si ($this.data("validationRequiredMessage")) {
                mensaje = $this.data("validationRequiredMessage");
              }
              $this.data("validationRequiredMessage", mensaje);
            }
            // ------------------------------------------------ ---------
            // NÚMERO
            // ------------------------------------------------ ---------
            si ($this.attr("tipo") !== indefinido && $this.attr("tipo").toLowerCase() === "número") {
              mensaje = configuraciones.builtInValidators.numero.mensaje;
              si ($this.data("mensajeNumeroValidacion")) {
                mensaje = $this.data("validationNumberMessage");
              }
              $this.data("validationNumberMessage", mensaje);
            }
            // ------------------------------------------------ ---------
            // CORREO ELECTRÓNICO
            // ------------------------------------------------ ---------
            si ($this.attr("tipo") !== indefinido && $this.attr("tipo").toLowerCase() === "correo electrónico") {
              mensaje = "Correo electrónico no válido";
              si ($this.data("validationValidemailMessage")) {
                mensaje = $this.data("validationValidemailMessage");
              } de lo contrario si ($this.data("validationEmailMessage")) {
                mensaje = $this.data("validationEmailMessage");
              }
              $this.data("validationValidemailMessage", mensaje);
            }
            // ------------------------------------------------ ---------
            // MINCOMPROBADO
            // ------------------------------------------------ ---------
            si ($this.attr("minchecked") !== indefinido) {
              mensaje = "No se han marcado suficientes opciones; se requiere un mínimo de '" + $this.attr("minchecked") + "'<!-- data-validation-minchecked-message para anular -->";
              si ($this.data("validationMincheckedMessage")) {
                mensaje = $this.data("validationMincheckedMessage");
              }
              $this.data("validationMincheckedMessage", mensaje);
              $this.data("validaciónMincheckedMinchecked", $this.attr("minchecked"));
            }
            // ------------------------------------------------ ---------
            // MÁXIMO COMPROBADO
            // ------------------------------------------------ ---------
            si ($this.attr("maxchecked") !== indefinido) {
              mensaje = "Demasiadas opciones marcadas; se requiere un máximo de '" + $this.attr("maxchecked") + "'<!-- data-validation-maxchecked-message para anular -->";
              si ($this.data("validationMaxcheckedMessage")) {
                mensaje = $this.data("validationMaxcheckedMessage");
              }
              $this.data("validationMaxcheckedMessage", mensaje);
              $this.data("validacionMaxcheckedMaxchecked", $this.attr("maxchecked"));
            }
          }

          // ================================================== ==============
          // RECOGER NOMBRES DE VALIDADORES
          // ================================================== ==============

          // Obtener validadores nombrados
          si ($this.data("validacion") !== indefinido) {
            validatorNames = $this.data("validacion").split(", ");
          }

          // Obtener los adicionales definidos en los atributos de datos del elemento
          $.each($this.data(), función (i, el) {
            var partes = i.replace(/([AZ])/g, ",$1").split(",");
            si (partes[0] === "validación" && partes[1]) {
              validatorNames.push(partes[1]);
            }
          });

          // ================================================== ==============
          // NORMALIZAR NOMBRES DE VALIDADORES
          // ================================================== ==============

          var validatorNamesToInspect = validatorNames;
          var newValidatorNamesToInspect = [];

          hacer // expandir repetidamente los validadores de 'acceso directo' a sus validadores reales
          {
            // En mayúsculas solo la primera letra de cada nombre
            $.each(validatorNames, función (i, el) {
              validatorNames[i] = formatValidatorName(el);
            });

            // Eliminar nombres de validadores duplicados
            validatorNames = $.unique(validatorNames);

            // Extraiga los nuevos nombres de validador de cada acceso directo
            nuevosValidadoresParaInspeccionar = [];
            $.each(validatorNamesToInspect, función(i, el) {
              si ($this.data("validación" + el + "Acceso directo") !== indefinido) {
                // ¿Son estos validadores personalizados?
                // ¡Saquenlos!
                $.each($this.data("validación" + el + "Acceso directo").split(",", función(i2, el2) {
                  nuevoValidatorNamesToInspect.push(el2);
                });
              } de lo contrario si (configuraciones.builtInValidators[el.toLowerCase()]) {
                // ¿Es este un elemento integrado reconocido?
                //¡Sácalo!
                var validador = configuraciones.builtInValidators[el.toLowerCase()];
                si (validator.type.toLowerCase() === "atajo") {
                  $.each(validator.shortcut.split(","), función (i, el) {
                    el = formatValidatorName(el);
                    nuevoValidatorNamesToInspect.push(el);
                    validadorNames.push(el);
                  });
                }
              }
            });

            validatorNamesToInspect = nuevoValidatorNamesToInspect;

          } mientras (validatorNamesToInspect.length > 0)

          // ================================================== ==============
          // CONFIGURAR MATRICES DE VALIDADORES
          // ================================================== ==============

          var validadores = {};

          $.each(validatorNames, función (i, el) {
            // Configurar el mensaje de 'anulación'
            var mensaje = $this.data("validacion" + el + "Mensaje");
            var hasOverrideMessage = (mensaje! == indefinido);
            var foundValidator = falso;
            mensaje =
              (
                mensaje
                  ? mensaje
                  : "'" + el + "' validación fallida <!-- Agregue el atributo 'data-validation-" + el.toLowerCase() + "-message' a la entrada para cambiar este mensaje -->"
              )
            ;

            $.cada(
              configuraciones.validatorTypes,
              función (validatorType, validatorTemplate) {
                si (validadores[validatorType] === indefinido) {
                  validadores[validatorType] = [];
                }
                si (!foundValidator && $this.data("validation" + el + formatValidatorName(validatorTemplate.name)) !== indefinido) {
                  validadores[validatorType].push(
                    $.extender(
                      verdadero,
                      {
                        nombre: formatValidatorName(validatorTemplate.name),
                        mensaje: mensaje
                      },
                      validadorTemplate.init($this, el)
                    )
                  );
                  foundValidator = verdadero;
                }
              }
            );

            si (!foundValidator && configuraciones.builtInValidators[el.toLowerCase()]) {

              var validador = $.extend(true, {}, configuraciones.builtInValidators[el.toLowerCase()]);
              si (hasOverrideMessage) {
                validador.mensaje = mensaje;
              }
              var validatorType = validador.type.toLowerCase();

              si (validatorType === "acceso directo") {
                foundValidator = verdadero;
              } demás {
                $.cada(
                  configuraciones.validatorTypes,
                  función (validatorTemplateType, validatorTemplate) {
                    si (validadores[validatorTemplateType] === indefinido) {
                      validadores[validatorTemplateType] = [];
                    }
                    si (!foundValidator && validatorType === validatorTemplateType.toLowerCase()) {
                      $this.data("validación" + el + formatValidatorName(validatorTemplate.name), validador[validatorTemplate.name.toLowerCase()]);
                      validadores[validatorType].push(
                        $.extender(
                          validador,
                          validadorTemplate.init($this, el)
                        )
                      );
                      foundValidator = verdadero;
                    }
                  }
                );
              }
            }

            si (! encontradoValidador) {
              $.error("No se puede encontrar la información de validación para '" + el + "'");
            }
          });

          // ================================================== ==============
          // ALMACENAR VALORES DE RESERVA
          // ================================================== ==============

          $helpBlock.datos(
            "contenido original",
            (
              $helpBlock.data("contenido original")
                ? $helpBlock.data("contenido original")
                : $helpBlock.html()
            )
          );

          $helpBlock.datos(
            "papel original",
            (
              $helpBlock.data("rol original")
                ? $helpBlock.data("rol original")
                : $helpBlock.attr("rol")
            )
          );

          $grupocontrol.datos(
            "clases originales",
            (
              $controlGroup.data("clases-originales")
                ? $controlGroup.data("clases-originales")
                : $controlGroup.attr("clase")
            )
          );

          $esto.datos(
            "aria-original-no-válida",
            (
              $this.data("aria-original-no-válida")
                ? $this.data("aria-original-no-válida")
                : $this.attr("aria-no válida")
            )
          );

          // ================================================== ==============
          // VALIDACIÓN
          // ================================================== ==============

          $este.bind(
            "validacion.validacion",
            función (evento, parámetros) {

              var valor = obtenerValor($este);

              // Obtener una lista de los errores a aplicar
              var erroresEncontrados = [];

              $.each(validadores, función (validatorType, validatorTypeArray) {
                si (valor || valor.longitud || (parámetros && parámetros.includeEmpty) || (!!settings.validatorTypes[validatorType].blockSubmit && parámetros && !!parámetros.submitting)) {
                  $.each(validatorTypeArray, función (i, validador) {
                    si (configuraciones.validatorTypes[validatorType].validate($this, valor, validador)) {
                      erroresEncontrados.push(validador.mensaje);
                    }
                  });
                }
              });

              devuelve errores encontrados;
            }
          );

          $este.bind(
            "getValidators.validacion",
            función () {
              validadores de retorno;
            }
          );

          // ================================================== ==============
          // Esté atento a los cambios
          // ================================================== ==============
          $este.bind(
            "enviar.validacion",
            función () {
              devuelve $this.triggerHandler("cambio.validación", {enviando: verdadero});
            }
          );
          $este.bind(
            [
              "tecla arriba",
              "enfocar",
              "difuminar",
              "hacer clic",
              "pulsar tecla",
              "pulsación de tecla",
              "cambiar"
            ].join(".validacion ") + ".validacion",
            función (e, parámetros) {

              var valor = obtenerValor($este);

              var erroresEncontrados = [];

              $controlGroup.find("entrada,área de texto,seleccionar").each(función (i, el) {
                var oldCount = erroresEncontrados.length;
                $.each($(el).triggerHandler("validation.validation", params), función (j, mensaje) {
                  erroresEncontrados.push(mensaje);
                });
                si (erroresEncontrados.length > oldCount) {
                  $(el).attr("aria-inválida", "verdadero");
                } demás {
                  var original = $this.data("aria-original-invalida");
                  $(el).attr("aria-inválida", (original !== indefinido ? original : falso));
                }
              });

              $form.find("entrada,seleccionar,área de texto").not($this).not("[nombre=\"" + $this.attr("nombre") + "\"]").trigger("validationLostFocus.validation");

              erroresEncontrados = $.unique(erroresEncontrados.sort());

              //¿Hubo algún error?
              si (erroresEncontrados.longitud) {
                // Será mejor marcarlo como advertencia.
                $controlGroup.removeClass("error de éxito").addClass("advertencia");

                //¿Cuántos errores encontramos?
                si (configuraciones.opciones.semanticallyStrict && erroresEncontrados.length === 1) {
                  // ¿Solo uno? ¿Ser estricto? Simplemente imprimirlo.
                  $helpBlock.html(errores encontrados[0] +
                    ( configuraciones.opciones.prependExistingHelpBlock ? $helpBlock.data("contenido-original") : "" ));
                } demás {
                  // ¿Múltiples? ¿Ser descuidado? Pégalos juntos para formar un UL.
                  $helpBlock.html("<ul role=\"alert\"><li>" + erroresEncontrados.join("</li><li>") + "</li></ul>" +
                    ( configuraciones.opciones.prependExistingHelpBlock ? $helpBlock.data("contenido-original") : "" ));
                }
              } demás {
                $controlGroup.removeClass("error de advertencia exitoso");
                si (valor.longitud > 0) {
                  $controlGroup.addClass("éxito");
                }
                $helpBlock.html($helpBlock.data("contenido-original"));
              }

              si (e.type === "desenfoque") {
                $controlGroup.removeClass("éxito");
              }
            }
          );
          $this.bind("validationLostFocus.validation", función () {
            $controlGroup.removeClass("éxito");
          });
        });
      },
      destruir : función() {

        devuelve esto.each(
          función() {

            variedad
              $esto = $(esto),
              $grupoDeControl = $this.parents(".grupoDeControl").first(),
              $helpBlock = $controlGroup.find(".help-block").first();

            //eliminar nuestros eventos
            $this.unbind('.validation'); // Los eventos tienen espacios de nombres.
            // restablecer el texto de ayuda
            $helpBlock.html($helpBlock.data("contenido-original"));
            // restablecer clases
            $controlGroup.attr("clase", $controlGroup.data("clases-originales"));
            // restablecer aria
            $this.attr("aria-inválida", $this.data("aria-original-inválida"));
            // restablecer rol
            $helpBlock.attr("rol", $this.data("rol-original"));
						//eliminamos todos los elementos que hemos creado
						si (createdElements.indexOf($helpBlock[0]) > -1) {
							$helpBlock.eliminar();
						}

          }
        );

      },
      recopilarErrores : función(incluirVacío) {

        var mensajesDeError = {};
        esto.each(función (i, el) {
          var $el = $(el);
          var nombre = $el.attr("nombre");
          var errores = $el.triggerHandler("validation.validation", {includeEmpty: true});
          errorMessages[nombre] = $.extend(true, errores, errorMessages[nombre]);
        });

        $.each(mensajesDeError, función (i, el) {
          si (el.length === 0) {
            eliminar errorMessages[i];
          }
        });

        devuelve mensajes de error;

      },
      tieneErrores: función() {

        var mensajesDeError = [];

        esto.each(función (i, el) {
          mensajesDeError = mensajesDeError.concat(
            $(el).triggerHandler("getValidators.validation") ? $(el).triggerHandler("validation.validation", {enviando: verdadero}) : []
          );
        });

        devolver (errorMessages.length > 0);
      },
      anular: función (newDefaults) {
        valores predeterminados = $.extend(true, valores predeterminados, newDefaults);
      }
    },
		tipos de validadores: {
      llamar de vuelta: {
        nombre: "devolución de llamada",
        init: función ($this, nombre) {
          devolver {
            validatorName: nombre,
            devolución de llamada: $this.data("validación" + nombre + "Devolución de llamada"),
            últimoValor: $this.val(),
            lastValid: verdadero,
            lastFinished: verdadero
          };
        },
        validar: función ($this, valor, validador) {
          if (validator.lastValue === valor && validator.lastFinished) {
            devuelve !validator.lastValid;
          }

          si (validador.lastFinished === verdadero)
          {
            validador.lastValue = valor;
            validador.lastValid = verdadero;
            validador.lastFinished = falso;

            var rrjqbvValidator = validador;
            var rrjqbvEsto = $esto;
            ejecutarFuncionPorNombre(
              validador.callback,
              ventana,
              $esto,
              valor,
              función (datos) {
                if (rrjqbvValidator.lastValue === datos.valor) {
                  rrjqbvValidator.lastValid = datos.valid;
                  si (datos.mensaje) {
                    rrjqbvValidator.message = datos.mensaje;
                  }
                  rrjqbvValidator.lastFinished = verdadero;
                  rrjqbvThis.data("validación" + rrjqbvValidator.validatorName + "Mensaje", rrjqbvValidator.message);
                  // El tiempo de espera se establece para evitar problemas con los eventos que se consideran 'ya disparados'
                  setTimeout(función () {
                    rrjqbvThis.trigger("cambio.validacion");
                  }, 1); // no necesita un tiempo de espera largo, solo el suficiente para que la burbuja del evento explote
                }
              }
            );
          }

          devuelve falso;

        }
      },
      ajax: {
        nombre: "ajax",
        init: función ($this, nombre) {
          devolver {
            validatorName: nombre,
            url: $this.data("validación" + nombre + "Ajax"),
            últimoValor: $this.val(),
            lastValid: verdadero,
            lastFinished: verdadero
          };
        },
        validar: función ($this, valor, validador) {
          si (""+validador.lastValue === ""+valor && validador.lastFinished === verdadero) {
            return validador.lastValid === falso;
          }

          si (validador.lastFinished === verdadero)
          {
            validador.lastValue = valor;
            validador.lastValid = verdadero;
            validador.lastFinished = falso;
            $.ajax({
              url: validador.url,
              datos: "valor=" + valor + "&campo=" + $this.attr("nombre"),
              tipo de datos: "json",
              éxito: función (datos) {
                if (""+validador.últimoValor === ""+datos.valor) {
                  validador.lastValid = !!(datos.valid);
                  si (datos.mensaje) {
                    validador.mensaje = datos.mensaje;
                  }
                  validador.lastFinished = verdadero;
                  $this.data("validación" + validador.validatorName + "Mensaje", validador.message);
                  // El tiempo de espera se establece para evitar problemas con los eventos que se consideran 'ya disparados'
                  setTimeout(función () {
                    $this.trigger("cambio.validacion");
                  }, 1); // no necesita un tiempo de espera largo, solo el suficiente para que la burbuja del evento explote
                }
              },
              fallo:funcion(){
                validador.lastValid = verdadero;
                validator.message = "la llamada ajax falló";
                validador.lastFinished = verdadero;
                $this.data("validación" + validador.validatorName + "Mensaje", validador.message);
                // El tiempo de espera se establece para evitar problemas con los eventos que se consideran 'ya disparados'
                setTimeout(función () {
                  $this.trigger("cambio.validacion");
                }, 1); // no necesita un tiempo de espera largo, solo el suficiente para que la burbuja del evento explote
              }
            });
          }

          devuelve falso;

        }
      },
			expresión regular: {
				nombre: "regex",
				init: función ($this, nombre) {
					devuelve {regex: regexFromString($this.data("validación" + nombre + "Regex"))};
				},
				validar: función ($this, valor, validador) {
					devuelve (!validador.regex.test(valor) && !validador.negativo)
						|| (validador.regex.test(valor) && validador.negativo);
				}
			},
			requerido: {
				nombre: "requerido",
				init: función ($this, nombre) {
					devolver {};
				},
				validar: función ($this, valor, validador) {
					devuelve !!(valor.longitud === 0 && ! validador.negativo)
						|| !!(valor.longitud > 0 && validador.negativo);
				},
        blockSubmit: verdadero
			},
			fósforo: {
				nombre: "partido",
				init: función ($this, nombre) {
					var elemento = $this.parents("formulario").first().find("[nombre=\"" + $this.data("validacion" + nombre + "Coincidencia") + "\"]").first();
					elemento.bind("validacion.validacion", funcion () {
						$this.trigger("cambio.validacion", {enviando: verdadero});
					});
					devuelve {"elemento": elemento};
				},
				validar: función ($this, valor, validador) {
					devolver (valor !== validador.elemento.val() && ! validador.negativo)
						|| (valor === validador.elemento.val() && validador.negativo);
				},
        blockSubmit: verdadero
			},
			máximo: {
				nombre: "max",
				init: función ($this, nombre) {
					devolver {max: $this.data("validacion" + nombre + "Max"});
				},
				validar: función ($this, valor, validador) {
					devuelve (parseFloat(valor, 10) > parseFloat(validador.max, 10) && ! validador.negativo)
						|| (parseFloat(valor, 10) <= parseFloat(validador.max, 10) && validador.negativo);
				}
			},
			mín: {
				nombre: "min",
				init: función ($this, nombre) {
					devuelve {min: $this.data("validacion" + nombre + "Min"});
				},
				validar: función ($this, valor, validador) {
					devuelve (parseFloat(valor) < parseFloat(validador.min) && ! validador.negativo)
						|| (parseFloat(valor) >= parseFloat(validador.min) && validador.negativo);
				}
			},
			longitud máxima: {
				nombre: "longitud máxima",
				init: función ($this, nombre) {
					devuelve {longitud máxima: $this.data("validación" + nombre + "Longitud máxima"});
				},
				validar: función ($this, valor, validador) {
					devuelve ((valor.longitud > validador.longitudmáxima) && ! validador.negativo)
						|| ((valor.longitud <= validador.longitudmáxima) && validador.negativo);
				}
			},
			minlongitud: {
				nombre: "minlength",
				init: función ($this, nombre) {
					devuelve {minlength: $this.data("validation" + name + "Minlength"});
				},
				validar: función ($this, valor, validador) {
					devuelve ((valor.longitud < validador.longitud mínima) && ! validador.negativo)
						|| ((valor.longitud >= validador.longitud mínima) && validador.negativo);
				}
			},
			Máximo comprobado: {
				nombre: "maxchecked",
				init: función ($this, nombre) {
					var elementos = $this.parents("form").first().find("[nombre=\"" + $this.attr("nombre") + "\"]");
					elementos.bind("click.validation", función () {
						$this.trigger("cambio.validacion", {includeEmpty: true});
					});
					devolver {maxchecked: $this.data("validation" + name + "Maxchecked"), elementos: elementos};
				},
				validar: función ($this, valor, validador) {
					devuelve (validador.elementos.filtro(":comprobado").longitud > validador.máximocomprobado && ! validador.negativo)
						|| (validador.elementos.filtro(":comprobado").longitud <= validador.máximocomprobado && validador.negativo);
				},
        blockSubmit: verdadero
			},
			minchecked: {
				nombre: "minchecked",
				init: función ($this, nombre) {
					var elementos = $this.parents("form").first().find("[nombre=\"" + $this.attr("nombre") + "\"]");
					elementos.bind("click.validation", función () {
						$this.trigger("cambio.validacion", {includeEmpty: true});
					});
					devolver {minchecked: $this.data("validation" + name + "Minchecked"), elementos: elementos};
				},
				validar: función ($this, valor, validador) {
					devuelve (validador.elementos.filtro(":comprobado").longitud < validador.mincomprobado && ! validador.negativo)
						|| (validador.elementos.filtro(":comprobado").longitud >= validador.mincomprobado && validador.negativo);
				},
        blockSubmit: verdadero
			}
		},
		Validadores incorporados: {
			correo electrónico: {
				nombre: "Correo electrónico",
				tipo: "atajo",
				Atajo: "validemail"
			},
			correo electrónico válido: {
				nombre: "Validemail",
				tipo: "regex",
				expresión regular: "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\.[A-Za-z]{2,4}",
				mensaje: "Dirección de correo electrónico no válida<!-- data-validator-validemail-message para anular -->"
			},
			contraseña de nuevo: {
				nombre: "Contraseña de nuevo",
				tipo: "coincidencia",
				coincidencia: "contraseña",
				mensaje: "No coincide con la contraseña proporcionada<!-- data-validator-paswordagain-message para anular -->"
			},
			positivo: {
				nombre: "Positivo",
				tipo: "atajo",
				atajo: "número,númeropositivo"
			},
			negativo: {
				nombre: "Negativo",
				tipo: "atajo",
				atajo: "número,númeronegativo"
			},
			número: {
				nombre: "Número",
				tipo: "regex",
				expresión regular: "([+-]?\\\d+(\\\.\\\d*)?([eE][+-]?[0-9]+)?)?",
				mensaje: "Debe ser un número<!-- data-validator-number-message para anular -->"
			},
			entero: {
				nombre: "Entero",
				tipo: "regex",
				expresión regular: "[+-]?\\\d+",
				mensaje: "No se permiten decimales<!-- data-validator-integer-message para anular -->"
			},
			numeropositivo: {
				nombre: "Número positivo",
				tipo: "min",
				mín: 0,
				mensaje: "Debe ser un número positivo<!-- data-validator-positivenumber-message para anular -->"
			},
			número negativo: {
				nombre: "Número negativo",
				tipo: "max",
				máx: 0,
				mensaje: "Debe ser un número negativo<!-- data-validator-negativenumber-message para anular -->"
			},
			requerido: {
				nombre: "Obligatorio",
				tipo: "requerido",
				mensaje: "Esto es obligatorio<!-- data-validator-required-message para anular -->"
			},
			comprobar uno: {
				nombre: "Checkone",
				tipo: "minchecked",
				minchecked: 1,
				mensaje: "Marque al menos una opción<!-- data-validation-checkone-message para anular -->"
			}
		}
	};

	var formatValidatorName = función (nombre) {
		devolver nombre
			.toLowerCase()
			.reemplazar(
				/(^|\s)([az])/g ,
				función(m,p1,p2) {
					devuelve p1+p2.toUpperCase();
				}
			)
		;
	};

	var getValue = función ($this) {
		// Extraemos el valor del que estamos hablando
		var valor = $this.val();
		var tipo = $this.attr("tipo");
		si (tipo === "casilla de verificación") {
			valor = ($this.is(":checked") ? valor : "");
		}
		si (tipo === "radio") {
			valor = ($('input[name="' + $this.attr("name") + '"]:checked').longitud > 0 ? valor : "");
		}
		valor de retorno;
	};

  función regexFromString(cadena de entrada) {
		devuelve nueva RegExp("^" + cadena de entrada + "$");
	}

  /**
   * Gracias a Jason Bunting a través de StackOverflow.com
   *
   * http://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string#answer-359910
   * Enlace corto: http://tinyurl.com/executeFunctionByName
  **/
  función ejecutarFunciónPorNombre(nombreFunción, contexto /*, argumentos*/) {
    var args = Array.prototype.slice.call(argumentos).splice(2);
    var espacios de nombres = nombreFunción.split(".");
    var func = espacios de nombres.pop();
    para(var i = 0; i < espacios de nombres.longitud; i++) {
      contexto = contexto[espacios de nombres[i]];
    }
    devolver contexto[func].apply(this, args);
  }

	$.fn.jqBootstrapValidation = función( método ) {

		si ( valores predeterminados.métodos[método] ) {
			devuelve valores predeterminados.métodos[método].aplicar( esto, Array.prototype.slice.call( argumentos, 1 ));
		} else if ( typeof método === 'objeto' || ! método ) {
			retorna predeterminados.métodos.init.aplicar( esto, argumentos );
		} demás {
		$.error( 'El método ' + método + ' no existe en jQuery.jqBootstrapValidation' );
			devuelve nulo;
		}

	};

  $.jqBootstrapValidation = función (opciones) {
    $(":entrada").no("[tipo=imagen],[tipo=enviar]").jqBootstrapValidation.apply(esto,argumentos);
  };

})(jQuery);

$(function () {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function () {
                    // Enable button & show success message
                    $("#btnSubmit").attr("disabled", false);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Tu mensaje ha sido enviado.</strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Lo siento " + firstName + ", parece que mi servidor de correo no responde. ¡Por favor, inténtelo de nuevo más tarde!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function () {
    $('#success').html('');
});

    // realiza el efecto del texto en los input
(function ($) {
    $(function () {
        $("body").on("input propertychange", ".floating-label-form-group", function (e) {
            $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
        }).on("focus", ".floating-label-form-group", function () {
            $(this).addClass("floating-label-form-group-with-focus");
        }).on("blur", ".floating-label-form-group", function () {
            $(this).removeClass("floating-label-form-group-with-focus");
        });
    });
})(jQuery); // End of use strict