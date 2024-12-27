document.addEventListener("DOMContentLoaded", function () {
    function LerURL(param) { // Função para obter parâmetros da URL
        const parametro = new URLSearchParams(window.location.search);
        return parametro.get(param);
    }

    const paisID = LerURL("id"); // Obter o id do país da URL
    const apiUrl = `https://restcountries.com/v3.1/alpha/${paisID}`; // URL com o ID do país para ir buscar os detalhes

    $.ajax({
        method: "GET",
        url: apiUrl,
        success: function (data) {
            // Valida a resposta da API
            if (!data || data.length === 0) {
                alert("Os dados do país não foram encontrados.");
                return;
            }
            const pais = data[0]; // A API retorna um array com os dados do país pedido (array com objetos dentro)

            // Preenche os campos do formulário com validações (se a API não retornar qualquer campo, retorna "N/A")                                
            document.getElementById("nome").value = pais.name?.common || "N/A";
            document.getElementById("capital").value = pais.capital?.[0] || "N/A";
            document.getElementById("moeda").value = pais.currencies ?   Object.values(pais.currencies).map((currency) => currency.name).join(", "): "N/A";
            document.getElementById("continente").value = pais.region || "N/A";
            document.getElementById("populacao").value = pais.population ? pais.population.toLocaleString(): "N/A";
            document.getElementById("linguas").value = pais.languages ? Object.values(pais.languages).join(", "): "N/A";
            document.getElementById("bandeira").src = pais.flags?.svg || "";
        },
        error: function (error) {
            console.error("Erro ao pedir dados à API:", error);
            alert("Não foi possível obter os dados do país. Por favor, tente novamente mais tarde.");
        }
    });
});

