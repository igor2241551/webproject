// $(document).ready(function () {
//     // Função para obter parâmetros da URL
//     function getQueryParam(param) {
//         const urlParams = new URLSearchParams(window.location.search);
//         return urlParams.get(param);
//     }

//     // Obter o ID do país da URL
//     const paisID = getQueryParam("id"); // Ex: "PT" ou "ES"

//     if (!paisID) {
//         alert("ID do país não encontrado no link. Verifique a URL.");
//         return;
//     }

//     // URL com o ID do país para ir fazer o pedido à API
//     const apiUrl = `https://restcountries.com/v3.1/alpha/${paisID}`;

//     // Chamada AJAX para obter os detalhes do país
//     $.ajax({
//         method: "GET",
//         url: apiUrl,
//         success: function (response) {
//             const pais = response; // A API retorna diretamente o objeto do país

//             // Preenche os campos do formulário
//             $("#nome").val(pais.name.common);
//             $("#capital").val(pais.capital ? pais.capital[0] : "N/A");
//             $("#moeda").val(pais.currencies ? Object.values(pais.currencies).map((currency) => currency.name).join(", "): "N/A");
//             $("#continente").val(pais.region);
//             $("#populacao").val(pais.population.toLocaleString());
//             $("#linguas").val(
//                 pais.languages
//                     ? Object.values(pais.languages).join(", ")
//                     : "N/A"
//             );
//             $("#bandeira").attr("src", pais.flags.svg);
//         },
//         error: function (error) {
//             console.error("Erro ao pedir dados à API:", error);
//             alert("Não foi possível obter os dados do país. Por favor, tente novamente mais tarde.");
//         },
//     });
// });
$(document).ready(function () {
    // Função para obter parâmetros da URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Obter o ID do país da URL
    const paisID = getQueryParam("id"); // Ex: "PT" ou "ES"

    if (!paisID) {
        alert("ID do país não encontrado no link. Verifique a URL.");
        return;
    }

    // URL com o ID do país para ir buscar os detalhes
    const apiUrl = `https://restcountries.com/v3.1/alpha/${paisID}`;

    // Chamada AJAX para obter os detalhes do país
    $.ajax({
        method: "GET",
        url: apiUrl,
        success: function (response) {
            // Valida a resposta da API
            if (!response || response.length === 0) {
                alert("Os dados do país não foram encontrados.");
                return;
            }

            const pais = response[0]; // A API retorna um array com o primeiro elemento como o país

            // Preenche os campos do formulário com validações
            $("#nome").val(pais.name?.common || "N/A");
            $("#capital").val(pais.capital?.[0] || "N/A");
            $("#moeda").val(
                pais.currencies
                    ? Object.values(pais.currencies).map((currency) => currency.name).join(", ")
                    : "N/A"
            );
            $("#continente").val(pais.region || "N/A");
            $("#populacao").val(pais.population ? pais.population.toLocaleString() : "N/A");
            $("#linguas").val(
                pais.languages
                    ? Object.values(pais.languages).join(", ")
                    : "N/A"
            );
            $("#bandeira").attr("src", pais.flags?.svg || "");
        },
        error: function (error) {
            console.error("Erro ao pedir dados à API:", error);
            alert("Não foi possível obter os dados do país. Por favor, tente novamente mais tarde.");
        },
    });
});


