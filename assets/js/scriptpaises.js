function redirectToDetailsPage(pais) {
  window.location.href = `detalhespais.html?id=${pais}`;
}

$(document).ready(function () {
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

    const inicio = (pagina - 1) * itemsPorPagina;
    const fim = inicio + itemsPorPagina;
    const paisesPagina = paises.slice(inicio, fim);

    // <button type="button" id="btnslide1" class="btn btn-primary btn-md px-5" onclick="redirectToDetailsPage(${id})">Explorar</button>

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
        const paisDiv = $(`
          <div class="col-md-3 mb-3">
            <div class="card">
              <img
                src="${pais.flags.png}"
                class="card-img-top"
                alt="Bandeira de ${pais.name.common}"
                style="aspect-ratio: 4 / 3; object-fit: cover;"
              />
              <div class="card-body">
                <h5 class="card-title">${pais.name.common}</h5>
                <button type="button" id="btnslide1" class="btn btn-primary btn-md px-5" onclick="redirectToDetailsPage('${id}')">Explorar</button>

              </div>
            </div>
          </div>
        `);
        countriesContainer.append(paisDiv);
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
