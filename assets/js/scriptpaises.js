function redirectToDetailsPage(pais) {
  window.location.href = `detalhespais.html?id=${pais}`;
}

var cloneOriginalCard = $('.cardPaisPaises').clone();

$(document).ready(function () {
  $('#countries-container').html('');
  $.ajax({
    url: "https://restcountries.com/v3.1/all",
    type: "GET",
    success: function (data) {
      

      let paises = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      $("#search").on("input", function () {
        const search = $(this).val().toLowerCase();
        paises = data.filter((pais) =>
          pais.name.common.toLowerCase().includes(search)
        );
        criarPaginacao(paises);
      });

      // Se não houver pesquisa, mostrar todos os países
      criarPaginacao(paises);
    },
    error: function (error) {
      console.log(error);
    },
  });

  function criarPaginacao(paises) {
    const itemsPorPagina = 12;
    const totalPaginas = Math.ceil(paises.length / itemsPorPagina);
    let paginaAtual = 1;

    renderizarPaises(paises, paginaAtual, itemsPorPagina);
    if (paises.length == 0) {
      $("#pagination").empty();
    } else {
      atualizarPaginacao(paginaAtual, totalPaginas, paises, itemsPorPagina);
    }
  }

  function renderizarPaises(paises, pagina, itemsPorPagina) {
    const countriesContainer = $("#countries-container");
    countriesContainer.empty();
    var favoritos = JSON.parse(localStorage.getItem("paisesFavoritos")) || [];
    const inicio = (pagina - 1) * itemsPorPagina;
    const fim = inicio + itemsPorPagina;
    const paisesPagina = paises.slice(inicio, fim);

    if (paisesPagina.length === 0) {
      countriesContainer.append(`
            <div class="col-12 container d-flex justify-content-center align-items-center half-screen">
              <h3 class="text-center">Nenhum país encontrado</h3>
            </div>
        `);
    } else {
      paisesPagina.forEach((pais) => {

        console.log(pais.cca2);
        let id = pais.cca2;
        var objetoPais = {
          "name": pais.name.common,
          "cca2": pais.cca2,
          "capital": pais.capital,
          "area": pais.area,
          "populacao": pais.population,
          "continente": pais.continents,
          "flag": pais.flags.svg
        };
        var stringObjetoPais = JSON.stringify(objetoPais);
                                      
        var cloneCard = cloneOriginalCard.clone();
        $('.tituloCard', cloneCard).html(pais.name.common);
        $('.capital', cloneCard).html(pais.capital);
        $('.imagemCard', cloneCard).attr("src", pais.flags.svg);
        $('.area', cloneCard).html(pais.area);
        $('.continente', cloneCard).html(pais.continents);
        $('.populacao', cloneCard).html(pais.population);
      
        var estaNosFavoritos = favoritos.some(favorito => favorito.cca2 === pais.cca2); 
        if (estaNosFavoritos) { 
            $('.btnFavorito', cloneCard).css("color", "red"); 
        }
      
        $('.btnFavorito', cloneCard).attr("onclick", "addFavorito("+stringObjetoPais+")");
        $('.btnVerDetalhes', cloneCard).attr("onclick", "verDetalhes('" + pais.cca2 + "')");

        $('#countries-container').append(cloneCard);
      });
    
    }
  }

  function atualizarPaginacao(
    paginaAtual,
    totalPaginas,
    paises,
    itemsPorPagina
  ) {
    const paginationContainer = $("#pagination");
    paginationContainer.empty();

    const ul = $('<ul class="pagination pagination-flat"></ul>');
    const prevLi = $('<li class="page-item "></li>');
    const prevLink = $('<a class="page-link" href="#">Anterior</a>');

    prevLink.click(() => {
      if (paginaAtual > 1) {
        paginaAtual--;
        renderizarPaises(paises, paginaAtual, itemsPorPagina);
        atualizarPaginacao(paginaAtual, totalPaginas, paises, itemsPorPagina);
      }
    });

    prevLi.append(prevLink);
    ul.append(prevLi);

    const paginasVisiveis = Math.min(totalPaginas, 5);
    let inicio = Math.max(1, paginaAtual - 2);
    let fim = Math.min(totalPaginas, inicio + paginasVisiveis - 1);

    if (fim - inicio < paginasVisiveis - 1) {
      inicio = Math.max(1, fim - paginasVisiveis + 1);
    }

    for (let i = inicio; i <= fim; i++) {
      const li = $('<li class="page-item"></li>');
      const link = $(`<a class="page-link" href="#">${i}</a>`);

      if (i === paginaAtual) {
        li.addClass("active");
      }

      link.click(() => {
        paginaAtual = i;
        renderizarPaises(paises, paginaAtual, itemsPorPagina);
        atualizarPaginacao(paginaAtual, totalPaginas, paises, itemsPorPagina);
      });

      li.append(link);
      ul.append(li);
    }

    const nextLi = $('<li class="page-item"></li>');
    const nextLink = $('<a class="page-link" href="#">Próximo</a>');

    nextLink.click(() => {
      if (paginaAtual < totalPaginas) {
        paginaAtual++;
        renderizarPaises(paises, paginaAtual, itemsPorPagina);
        atualizarPaginacao(paginaAtual, totalPaginas, paises, itemsPorPagina);
      }
    });

    nextLi.append(nextLink);
    ul.append(nextLi);

    paginationContainer.append(ul);
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


function verDetalhes(cca2) { 
  window.location.href = 'detalhespais.html?id=' + cca2; 
}