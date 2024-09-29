document.addEventListener("DOMContentLoaded", function() {
    // Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyCDLNnvLODEFmW4rpZR75iG5f3resJNpQ4",
        authDomain: "app-lista-sm-6478b.firebaseapp.com",
        databaseURL: "https://app-lista-sm-6478b-default-rtdb.firebaseio.com/",
        projectId: "app-lista-sm-6478b",
        storageBucket: "app-lista-sm-6478b.appspot.com",
        messagingSenderId: "969418993762",
        appId: "1:969418993762:web:e2e257d1e388dd0ec9a13b"
    };

    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);

    // Função para carregar estados dos checkboxes do Firebase
    function carregarEstadosCheckboxes() {
        var database = firebase.database();
        database.ref('checkboxes').once('value').then(function(snapshot) {
            var estados = snapshot.val();
            if (estados) {
                Object.keys(estados).forEach(function(id) {
                    var checkbox = document.getElementById(id);
                    if (checkbox) {
                        checkbox.checked = estados[id].marcado;
                    }
                });
            }
        }).catch(function(error) {
            console.error("Falha ao carregar estados dos checkboxes: " + error.message);
        });
    }

    // Capturar todos os checkboxes com a classe "inputs"
    let checkboxes = document.getElementsByClassName("inputs");

    // Iterar sobre a coleção de checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        // Adicionar um listener de evento de clique para cada checkbox
        checkboxes[i].addEventListener('change', function() {
            console.log(`${this.id} está ${this.checked ? 'marcado' : 'desmarcado'}`);
            gravarEstadoCheckbox(this.id, this.checked);
        });
    }

    // Carregar estados dos checkboxes ao carregar a página
    carregarEstadosCheckboxes();

    // Escutar mudanças no Firebase em tempo real
    var database = firebase.database();
    database.ref('checkboxes').on('value', function(snapshot) {
        var estados = snapshot.val();
        if (estados) {
            Object.keys(estados).forEach(function(id) {
                var checkbox = document.getElementById(id);
                if (checkbox) {
                    checkbox.checked = estados[id].marcado;
                }
            });
        }
    });
});

function gravarEstadoCheckbox(id, checked) {
    // Função para gravar o estado do checkbox no Firebase
    var database = firebase.database();
    database.ref('checkboxes/' + id).set({
        marcado: checked
    }).then(function() {
        console.log("Estado do checkbox salvo com sucesso!");
    }).catch(function(error) {
        console.error("Falha ao salvar estado do checkbox: " + error.message);
    });
}




if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(error => {
        console.log('Falha ao registrar o Service Worker:', error);
    });
}


//Barra de pesquisa v1 >>>by Caio Dev<<<

    

function aparecer(){
    document.getElementById('barra-pesquisa').style.display = 'block';
}
function esconder(){
    document.getElementById('barra-pesquisa').style.display = 'none';
}

document.getElementById('pesquisar').addEventListener('click', function(){
    const displayBarraPesquisa = document.getElementById('barra-pesquisa').style.display;
    
    if (displayBarraPesquisa === 'none'){
        aparecer();
    }  else {
        esconder();
    }
});


function pesquisar(){ 
    const termoPesquisa = document.getElementById('barra-pesquisa').value.toLowerCase(); // Recebe oque estiver escrito no input
    const itens = document.querySelectorAll('.labelcheck');// cria um vetor que recebe todos os itens que estao na classe labecheck (usei o Labelcheck porque é uma classe que está em todos os itens)
    let found = false;
    

    itens.forEach(function (item) { // executa os codigos a seguir para cada item do vetor
        if (item.textContent.toLowerCase().includes(termoPesquisa)) { // compara o item com o termo de pesquisa
            item.scrollIntoView({behavior: 'smooth', block: 'center'});// vai ate o item
            item.style.backgroundColor = '#ffff99';
            found = true;//o item foi encontrado
        }else {
            item.style.backgroundColor = '';
        }



        
    }); 
    
    if(!found){ // verifica se o item foi encontrado
            alert("Nenhum item foi encontrado!");
        }

    document.getElementById('barra-pesquisa').value = '';    
}

document.getElementById('barra-pesquisa').addEventListener('keyup', function(event){
            if(event.key === 'Enter'){ // buscar ao precionar enter
                esconder();
                pesquisar();
            }
        });
/*---------------------------------------------------------------------
               update v2 by Caio Dev  menu sanduiche                                       */
            document.getElementById('btn-hamburguer').addEventListener('click', function(){
                let menu = document.getElementById('menu');
                
                if(menu.style.display === "flex"){
                    menu.style.display = 'none';
                }else{
                    menu.style.display = 'flex';
                }
            });

// Contador de itens _________________________________________________________

// Função para adicionar span após cada label dinamicamente
const labels = document.querySelectorAll('label');

labels.forEach(function(label) {
    const span = document.createElement("span");
    span.className = "quantity";
    span.textContent = "";
    label.insertAdjacentElement('afterend', span);
    console.log("Deu certo adiconar o span apos a label");


});
//Função para criar O Pop-up ao clicar na box
function askQuantity(checkbox) {
    const quantitySpan = checkbox.nextElementSibling.nextElementSibling;


    if(checkbox.checked) {
        const quantity = prompt("Quantos você gostaria de comprar?");
        if(quantity !== null && quantity.trim() !== "") {
            quantitySpan.textContent = ` - Quantidade: ${quantity}`;
        } else{
            checkbox.checked = false;
        }
    } else {
        quantitySpan.textContent = "";
    }
}
// EventeListener para saber se as checkbox foram clicadas ou não
function ClickEventToCheckBox() {
    const checkbox = document.querySelectorAll('input[type="checkbox"]');
    checkbox.forEach(function(checkbox){
        checkbox.onclick = function() {
            askQuantity(checkbox);
        };
    });
}
document.addEventListener("DOMContentLoaded", ClickEventToCheckBox);