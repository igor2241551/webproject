document.addEventListener("DOMContentLoaded", function () {
    function LerURL(param) { // Função para obter parâmetros da URL
        // Exemplo: https://site.com/pagina.html?id=PT
        const parametro = new URLSearchParams(window.location.search);
        return parametro.get(param);
    }

    const paisID = LerURL("id"); // Obter o id do país da URL
    const apiUrl = `https://restcountries.com/v3.1/alpha/${paisID}`; // URL com o ID do país para ir buscar os detalhes

    $.ajax({
        method: "GET",
        url: apiUrl,
        success: function (data) {
            const pais = data[0]; // A API retorna um array com os dados do país pedido (array com objetos dentro)
    
        // Atualizar título e imagem
        document.getElementById("nome").innerText = pais.name?.common || "N/A";
        document.getElementById("bandeira").src = pais.flags?.svg || "";

        // Preenche os campos do formulário
        document.getElementById("capital").value = pais.capital || "N/A";
        document.getElementById("moeda").value = pais.currencies
            ? Object.values(pais.currencies).map((currency) => currency.name).join(", ")
            : "N/A";
        document.getElementById("continente").value = pais.region || "N/A";
        document.getElementById("linguas").value = pais.languages
            ? Object.values(pais.languages).join(", ")
            : "N/A";

        // Preenche as informações adicionais
        document.getElementById("area").innerHTML = `<strong>Área:</strong> ${pais.area ? pais.area.toLocaleString() + " km²" : "N/A"}`;
        document.getElementById("subregiao").innerHTML = `<strong>Sub-região:</strong> ${pais.subregion || "N/A"}`;
        document.getElementById("uniaoeuropeia").innerHTML = `<strong>Membro da ONU:</strong> ${pais.unMember ? "Sim" : "Não"}`;
        document.getElementById("populacao-urbana").innerHTML = `<strong>População:</strong> ${pais.population ? pais.population.toLocaleString() : "N/A"}`;

        // Atualiza o link para o Google Maps
        const mapaLink = pais.maps ? pais.maps.googleMaps : "#"; // O link existe, se sim, ir buscar. Se não, #
        const botaoMapa = document.getElementById("linkMapa"); // Seleciona o link dentro do botão
        botaoMapa.href = mapaLink; // Atualiza o href do link

    },
    
    error: function (error) {
        console.error("Erro ao pedir dados à API:", error);
        alert("Não foi possível obter os dados do país. Por favor, tente novamente mais tarde.");
    }
    });
});


