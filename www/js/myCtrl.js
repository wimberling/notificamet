//=====================MODULO DE CONTROLADORES======================
var module = angular.module('starter.controllers', [])

//Controlador para conectar con el Servidor NotificaMet y así, poder mostrar los msjs del usuario.
.controller('myCtrl', function( $scope, $rootScope, $http, storeService) 
{  
    var usuario = 24811945;
    var cont = '20121110565wjaz$';
    
    $http({
        method : "GET",
        url : "https://notificamet.unimet.edu.ve/estuRest2/mostrarMsjJSON.php?usuario="+usuario+"&psw="+cont+""
    }).then(function mySucces(response) {
        
        $rootScope.timeline = response.data;
        JSON.stringify($rootScope.timeline); //para mostrar JSON de las notificaciones del usuario por consola
    
        storeService.guardarNotificaciones(response.data);
        //modeloService.guardarModelo($rootScope.timeline);
        }, function myError(response) {
        alert('Error: ' + response);
    });
})

//Controlador para ir de la notificación seleccionada en el timeline a la vista de ver notificación.
.controller('NotificacionController', function(storeService, $scope) {
    
    $scope.notificacion = storeService.getData1();
    JSON.stringify($scope.notificacion);
    console.log("wim");
    
    this.init = function(e) {
      // Ensure the emitter is the current page, not a nested one
      if (e.target === e.currentTarget) {
        // Safely access data
        console.log('init', e.target.data);
      }
    };
})

//Controlador para el login.
//(hacer un app.controller para el login)

//========SERVICES=========
.service('storeService', function() {
    var data1 = {};

    this.guardarNotificaciones = function(data1) {
        this.data1 = data1;
        console.log(data1);
    };

    this.getData1 = function() {
        return data1;
    }
    
})


/*
* 
* Si creas un servicio hay que pasárselo al controlador pero no como dependencia si no como parámetro, es decir, no con "[nombreServicio]"
* si no como parámetro del mismo function( $scope, nombreServicio) y definir el servicio si quieres aquí mismo con .service

* No puedes colocarle un servicio a un controlador si el servicio no existe, te dará el error [$injector:unpr] una vez más.
* Debes crear el servicio y luego inyectárselo como parámetro al controlador.
*/