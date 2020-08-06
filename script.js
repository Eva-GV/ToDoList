

"use strict"
// tenemos un objeto que tiene dos listas;
var tareas = {
    porHacer:[],
    completadas:[]
}

var tareaIntroducida_ = $("#tareaIntroducida").val();

function validarInput(){
      if(tareaIntroducida_==0 || /^\s+$/.test(tareaIntroducida_)) {
               return false
                }return true;
}
function  limpiarInput(){
        // tareaIntroducida_= " ";
        $("#tareaIntroducida").val("")    
    }

function pintaTareaEnDom(nombreTarea , idDondePintar){// paso variable y donde quiero pintar!! en el grid de porcompletas o por hacer
    console.log("nombreTarea")
    console.log(nombreTarea)
    //<div>
    
        let nodoTareaNueva = document.createElement("div");
        nodoTareaNueva.classList.add("nuevaTarea","flex");
    

        let nodoTareita = document.createElement("div");
        nodoTareita.classList.add("tarea","flex");


                let nodoNombreTarea = document.createElement("p");
                nodoNombreTarea.innerHTML=nombreTarea;
                nodoTareita.append(nodoNombreTarea);

                // Tachado solo cuando estoy pintanto en tareas completadas

        // Fin <div> tarea

        let nodoIconos = document.createElement("div");
        nodoIconos.classList.add("iconos","flex");

        // icono eliminar ----------------------------------------
                let nodoIconEliminar = document.createElement("img");
                nodoIconEliminar.classList.add("icono");
                $(nodoIconEliminar).attr("src","imagenes/eliminar.png")
        // icono hecho----------------------------------------
                let nodoIconHecho = document.createElement("img");
                $(nodoIconHecho).attr("src","imagenes/tick.png")
                nodoIconHecho.classList.add("icono");

        //ordenamos los div padres e hijos----------------
        nodoIconos.append(nodoIconEliminar);
        nodoIconos.append(nodoIconHecho);
        nodoTareaNueva.append(nodoTareita);
        nodoTareaNueva.append(nodoIconos);

        console.log(nodoTareaNueva);

        $(idDondePintar).append(nodoTareaNueva)

        // si en el parámetro id del lugar pone "#gridTareasPorhacer" --> los botones tendran una funcionalidad
        // else -->se entiende que el id del lugar es "#gridTareasHechas" --> los botones harán otras cosas       

        var textoTarea;
        var borrar;

        if ( idDondePintar == ("#grid_tareasHacer") ){
                
                $(nodoIconHecho).on({
                        click:function(){
                               textoTarea = $(nodoTareaNueva).text();
                               $(tareas.completadas.push(textoTarea));
                               console.log(tareas)
                               $(nodoTareaNueva).remove();
                                borrar = tareas.porHacer.indexOf(textoTarea);
                                if (borrar!== -1){
                                        tareas.porHacer.splice(borrar,1);
                                 }                        
                               pintaTareaEnDom(textoTarea,"#grid_tareasCompletadas" );
                               }

                });      

                 $(nodoIconEliminar).on({
                        click:function(){
                                 console.log("Eliminar");
                                 $(nodoTareaNueva).remove();
                                 borrar = tareas.porHacer.indexOf(textoTarea);
                                 if (borrar!== -1){
                                         tareas.porHacer.splice(borrar,1);
                                         
                                 }
                        }
                })                               


        }else{
                $(nodoIconHecho).on({
                        click:function(){
                               textoTarea = $(nodoTareaNueva).text();
                               //textoTarea.classList.add("tachado");
                               $(tareas.porHacer.push(textoTarea));
                               console.log(tareas)
                               $(nodoTareaNueva).remove();
                                borrar = tareas.completadas.indexOf(textoTarea);
                                if (borrar!== -1){
                                        tareas.completadas.splice(borrar,1);
                                 }
                                pintaTareaEnDom(textoTarea,"#grid_tareasHacer" );
                        }

                });  
                                  
                $(nodoIconEliminar).on({
                        click:function(){
                                $(nodoTareaNueva).remove();
                                borrar = tareas.completadas.indexOf(textoTarea);
                                if (borrar!== -1){
                                tareas.completadas.splice(borrar,1);
                                 }
                        }
                })                   

        }

}

$("#anadir").on({
        click:function(){
                tareaIntroducida_ = $("#tareaIntroducida").val();
                if(tareaIntroducida_==false){alert('Escribe una tarea')
                }else{ tareas.porHacer.push(tareaIntroducida_);
                pintaTareaEnDom(tareaIntroducida_,"#grid_tareasHacer" );
                limpiarInput();
                }
                    
        }

        
 });


       