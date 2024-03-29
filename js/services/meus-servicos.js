angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function($resource){

	return $resource('v1/fotos/:fotoId', null, {
		update : {
			method : 'PUT'
		}
	});

})
.factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope){

	var servico = {};

	var evento = 'fotoCadastrada';

	servico.cadastrar = function(foto){
		return $q(function(resolve, reject){
			if(foto._id){

				recursoFoto.update({fotoId: foto._id}, foto, function(){
					$rootScope.$broadcast(evento);
					resolve({
						mensagem : 'Foto ' + foto.titulo + ' atualizada!!',
						inclusao: false
					})
				}, function(erro){
					console.log(erro);
					reject({
						mensagem: 'Não foi possivel alterar a foto'
					});
				});

			} else {
				recursoFoto.save(foto, function(){
					$rootScope.$broadcast(evento);
					resolve({
						mensagem : 'Foto ' + foto.titulo + ' incluida com sucesso',
						inclusao: true
					}, function(erro){
						console.log(erro);
						reject({
							mensagem: 'Não foi possivel incluir a foto'
						});
					});
				})
			}
		});
	};

	return servico;
});
