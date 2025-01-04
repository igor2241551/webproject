var cloneOriginalCard = $('.cardPaisPaises').clone();
  
$(document).ready(function () {

    $('#countries-container-Favoritos').html('');
    arrayFavoritos = JSON.parse(localStorage.getItem("paisesFavoritos")) || [];
    
    if (arrayFavoritos.length === 0) {
        $('#countries-container-Favoritos').append(`
            <div class="col-12 container d-flex justify-content-center align-items-center half-screen">
            <h3 class="text-center">Nenhum país encontrado</h3>
            </div>
        `);
    } else {
        arrayFavoritos.forEach((pais) => {

            console.log(pais);
            let id = pais.cca2;
            var objetoPais = {
            "name": pais.name,
            "cca2": pais.cca2,
            "capital": pais.capital,
            "area": pais.area,
            "populacao": pais.populacao,
            "continente": pais.continente,
            "flag": pais.flag
            };
            var stringObjetoPais = JSON.stringify(objetoPais);
                                        
            var cloneCard = cloneOriginalCard.clone();
            $('.tituloCard', cloneCard).html(pais.name);
            $('.capital', cloneCard).html(pais.capital);
            $('.imagemCard', cloneCard).attr("src", pais.flag);
            $('.area', cloneCard).html(pais.area);
            $('.continente', cloneCard).html(pais.continente);
            $('.populacao', cloneCard).html(pais.populacao);
        
            var estaNosFavoritos = arrayFavoritos.some(favorito => favorito.cca2 === pais.cca2); 
            if (estaNosFavoritos) { 
                $('.btnFavorito', cloneCard).css("color", "red"); 
            }
        
            $('.btnFavorito', cloneCard).attr("onclick", "addFavorito("+stringObjetoPais+")");
            $('.btnVerDetalhes', cloneCard).attr("onclick", "verDetalhes('" + pais.cca2 + "')");

            $('#countries-container-Favoritos').append(cloneCard);
        });
    }
});


function addFavorito(pais){
    
    var arrayFavoritos;
    var encontrado=false;
    console.log("Estas nos Favoritos");
    console.log(pais);
    if(localStorage.getItem("paisesFavoritos") === null){
        arrayFavoritos = [];
    } else {
        console.log("Resultado da variavel"+pais.cca2);
        arrayFavoritos = JSON.parse(localStorage.getItem("paisesFavoritos"));

        for(var i=0; i<arrayFavoritos.length; i++){
            
            if(arrayFavoritos[i].cca2===pais.cca2){
                encontrado= true;
                arrayFavoritos.splice(i,1);
                $(`.btnFavorito[onclick*="${pais.cca2}"]`).css("color", "black");
                break;
            }
        }
        console.log(arrayFavoritos);
    }
    if(encontrado === false){
        arrayFavoritos.push(pais);
        $(`.btnFavorito[onclick*="${pais.cca2}"]`).css("color", "red");
    }
    var favoritosStorage = JSON.stringify(arrayFavoritos)
    localStorage.setItem("paisesFavoritos", favoritosStorage);

}

function verDetalhes(cca2){ 
    window.location.href = 'detalhespais.html?id=' + cca2; 
}
