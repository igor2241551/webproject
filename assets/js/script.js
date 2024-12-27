$(document).ready(function() {
    $.ajax({
        method: "GET",
        url: "https://restcountries.com/v3.1/all",
        // type: "GET",
        success: function(data) {
            data.sort(() => 0.5 - Math.random());
            $("#countryCards").html('');
            for (let i = 0; i < 3; i++) {
                let country = data[i];
                let countryCard = `
                    <div class="col-md-4 ">
                    <div class="card rounded-0 border-2">
                    <div class="imagemCard">
                        <img
                            src="${country.flags.svg}"
                            class=" card-img-top p-4 object-fit-scale"
                            alt="Bandeira de ${country.name.common}"
                        />
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-center">${country.name.common}</h5>
                    </div>
                    </div>
                    </div>
                `;
                $("#countryCards").append(countryCard);
            }
        },
        error: function(error) {
            console.log("Erro:", error);
        }
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
});




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
