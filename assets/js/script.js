var cloneCard = $('.cardPais').clone();

$(document).ready(function() {
    $('#btnslide1').attr("onclick", "verDetalhesJapao()");
    $('#btnslide2').attr("onclick", "verDetalhesAustralia()");

    $('#listaPaises').html('');
    $.ajax({
        method: "GET",
        url: "https://restcountries.com/v3.1/all"
    }).done(function(dados){
            console.log(dados);
            for(var i=0; i<3; i++){
                // var indiceAleatorio = Math.floor(Math.random() * (dados.length + 1));
                var indiceAleatorio = Math.floor(Math.random() * (dados.length));
                console.log(dados[indiceAleatorio].name.common);                                                 //futuramente apagar
                
                var cardCopia = `
                    <div class="col-md-4 cardPaises mt-3">
                        <a href="detalhespais.html?id=${dados[indiceAleatorio].cca2}" class="linkCard">
                            <div class="card rounded-0 border-2">
                                <div class="d-flex flex-column justify-content-center h-100">
                                    <img
                                    src=${dados[indiceAleatorio].flags.svg}
                                    class="card-img-top p-4 imagemCard"
                                    alt=${dados[indiceAleatorio].name.common}/>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title text-center tituloCard">${dados[indiceAleatorio].name.common}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                `;

                // var cardCopia = cloneCard.clone();
                // $('.linkCard', cardCopia).attr('href', 'detalhespais.html?id='+dados[indiceAleatorio].cca2);  //alterar para a variavel correta
                // console.log(dados[indiceAleatorio].cca2);
                // $('.imagemCard', cardCopia).attr("src", dados[indiceAleatorio].flags.svg); 
                // $('.imagemCard', cardCopia).attr("alt", "Bandeira de "+dados[indiceAleatorio].name.common); 
                // console.log(dados[indiceAleatorio].flags.svg);
                // $('.tituloCard', cardCopia).html(dados[indiceAleatorio].name.common);
                // console.log(dados[indiceAleatorio].name.common);
           
                $('#listaPaises').append(cardCopia);

            }
            console.log(dados.length);

        });
    });
    
    

    document.getElementById("btin").addEventListener("mouseover", function() { 
        this.src = "assets/img/inhover.png"; 
        }); 
    document.getElementById("btin").addEventListener("mouseout", function() { 
        this.src = "assets/img/in.png";  
    });

    document.getElementById("btfb").addEventListener("mouseover", function() { 
        this.src = "assets/img/fbhover.png"; 
        }); 
    document.getElementById("btfb").addEventListener("mouseout", function() { 
        this.src = "assets/img/fb.png";  
    });

    document.getElementById("btinst").addEventListener("mouseover", function() { 
        this.src = "assets/img/insthover.png"; 
        }); 
    document.getElementById("btinst").addEventListener("mouseout", function() { 
        this.src = "assets/img/inst.png";  
    });

    document.getElementById("btx").addEventListener("mouseover", function() { 
        this.src = "assets/img/xhover.png"; 
        }); 
    document.getElementById("btx").addEventListener("mouseout", function() { 
        this.src = "assets/img/x.png";  
    });


    function verDetalhesJapao(){ 
        window.location.href = 'detalhespais.html?id=JP'; 
    }
    function verDetalhesAustralia(){ 
        window.location.href = 'detalhespais.html?id=AU'; 
    }





// });




// $(document).ready(function(){
//     $.ajax({
//         method: "GET",
//         url: "https://restcountries.com/v3.1/all",

//         const cardPais = document.getElementsByClassName('cardPaises');
//         cardPais.innerHTML = ''; // Limpa o contêiner antes de adicionar novos itens
//         // let cardPais = $(".cardPaises").clone();
//         // $(".cardPaises").html= "";
        
//         success: function(data) {
//             data.sort(() => 0.5 - Math.random());
//             for (let i = 0; i < 3; i++) { 
//                 let country = data[i]; 
//                 let countryCard = `
//                     <div class="col-md-4 cardPaises">
//                         <div class="card rounded-0 border-2">
//                         <img
//                             src="${country.flags.svg}"
//                             class="card-img-top p-4"
//                             alt="Bandeira de ${country.name.common}"
//                         />
//                         <div class="card-body">
//                             <h5 class="card-title text-center">${country.name.common}</h5>
//                         </div>
//                         </div>
//                     </div>
//             `;
//              $(".cardPaises").append(countryCard); }
//         },
//         error: function(error) {
//             console.log("Erro:", error); // Exibe erros no console
//         }
//     });
// });

