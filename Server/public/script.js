//Total Loader
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => loadFrontPageCards(data['data']));
})
//Cases Loader
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getCases')
    .then(response => response.json())
    .then(data => loadCasesPageCards(data['data']));
})
//CPU Loader
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getCPU')
    .then(response => response.json())
    .then(data => loadCPUPageCards(data['data']));
})
//GPU Loader
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getGPU')
    .then(response => response.json())
    .then(data => loadGPUPageCards(data['data']));
})
//PSU Loader
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getPSU')
    .then(response => response.json())
    .then(data => loadPSUPageCards(data['data']));
})
//Motherboard Loader
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getMotherboard')
    .then(response => response.json())
    .then(data => loadMotherboardPageCards(data['data']));
})

//RAM Loader
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getRAM')
    .then(response => response.json())
    .then(data => loadRAMPageCards(data['data']));
})

//HTML Card loading functions
function loadFrontPageCards(data){

    let cardHTML = "";
    let counter = 1;

    data.forEach(function ({brand, product_id, name, description, file_name}) {
        
        if(counter > 6){
            return;
        }else {
        let card = document.querySelector(`#home-card-${counter}`)

        cardHTML += `<img class="card-img-top" src="Resources/Images/${file_name}" alt="Card image cap">`;
        cardHTML += `<div class="card-body">`;
        cardHTML += `<h5 class="card-title">`;
        cardHTML += `${brand} - ${name} </h5>` ;
        cardHTML += `<p class="card-text">${description}</p>`;
        cardHTML += `<button data-id=${product_id} class="btn btn-primary">Add to cart</button>`;
        cardHTML += "</div>";


        card.innerHTML = cardHTML;
        cardHTML = "";
        counter = counter + 1;
        }
    })
      
    //card.innerHTML = cardHTML;
    //console.log(data)
}
function loadCasesPageCards(data){

    let cardHTML = "";
    let counter = 1;

    data.forEach(function ({brand, product_id, name, description, file_name}) {
        
        let card = document.querySelector(`#cases-card-${counter}`)

        cardHTML += `<img class="card-img-top" src="../Resources/Images/${file_name}" alt="Card image cap">`;
        cardHTML += `<div class="card-body">`;
        cardHTML += `<h5 class="card-title">`;
        cardHTML += `${brand} - ${name} </h5>` ;
        cardHTML += `<p class="card-text">${description}</p>`;
        cardHTML += `<button data-id=${product_id} class="btn btn-primary">Add to cart</button>`;
        cardHTML += "</div>";


        card.innerHTML = cardHTML;
        cardHTML = "";
        counter = counter + 1;
    })
      
    //card.innerHTML = cardHTML;
    //console.log(data)
}
function loadCPUPageCards(data){

    let cardHTML = "";
    let counter = 1;

    data.forEach(function ({brand, product_id, name, description, file_name}) {
        
        let card = document.querySelector(`#cpu-card-${counter}`)

        cardHTML += `<img class="card-img-top" src="../Resources/Images/${file_name}" alt="Card image cap">`;
        cardHTML += `<div class="card-body">`;
        cardHTML += `<h5 class="card-title">`;
        cardHTML += `${brand} - ${name} </h5>` ;
        cardHTML += `<p class="card-text">${description}</p>`;
        cardHTML += `<button data-id=${product_id} class="btn btn-primary">Add to cart</button>`;
        cardHTML += "</div>";


        card.innerHTML = cardHTML;
        cardHTML = "";
        counter = counter + 1;
    })
      
    //card.innerHTML = cardHTML;
    //console.log(data)
}
function loadGPUPageCards(data){

    let cardHTML = "";
    let counter = 1;

    data.forEach(function ({brand, product_id, name, description, file_name}) {
        
        let card = document.querySelector(`#gpu-card-${counter}`)

        cardHTML += `<img class="card-img-top" src="../Resources/Images/${file_name}" alt="Card image cap">`;
        cardHTML += `<div class="card-body">`;
        cardHTML += `<h5 class="card-title">`;
        cardHTML += `${brand} - ${name} </h5>` ;
        cardHTML += `<p class="card-text">${description}</p>`;
        cardHTML += `<button data-id=${product_id} class="btn btn-primary">Add to cart</button>`;
        cardHTML += "</div>";


        card.innerHTML = cardHTML;
        cardHTML = "";
        counter = counter + 1;
    })
      
    //card.innerHTML = cardHTML;
    //console.log(data)
}
function loadMotherboardPageCards(data){

    let cardHTML = "";
    let counter = 1;

    data.forEach(function ({brand, product_id, name, description, file_name}) {
        
        let card = document.querySelector(`#motherboard-card-${counter}`)

        cardHTML += `<img class="card-img-top" src="../Resources/Images/${file_name}" alt="Card image cap">`;
        cardHTML += `<div class="card-body">`;
        cardHTML += `<h5 class="card-title">`;
        cardHTML += `${brand} - ${name} </h5>` ;
        cardHTML += `<p class="card-text">${description}</p>`;
        cardHTML += `<button data-id=${product_id} class="btn btn-primary">Add to cart</button>`;
        cardHTML += "</div>";


        card.innerHTML = cardHTML;
        cardHTML = "";
        counter = counter + 1;
    })
      
    //card.innerHTML = cardHTML;
    //console.log(data)
}
function loadPSUPageCards(data){

    let cardHTML = "";
    let counter = 1;

    data.forEach(function ({brand, product_id, name, description, file_name}) {
        
        let card = document.querySelector(`#psu-card-${counter}`)

        cardHTML += `<img class="card-img-top" src="../Resources/Images/${file_name}" alt="Card image cap">`;
        cardHTML += `<div class="card-body">`;
        cardHTML += `<h5 class="card-title">`;
        cardHTML += `${brand} - ${name} </h5>` ;
        cardHTML += `<p class="card-text">${description}</p>`;
        cardHTML += `<button data-id=${product_id} class="btn btn-primary">Add to cart</button>`;
        cardHTML += "</div>";


        card.innerHTML = cardHTML;
        cardHTML = "";
        counter = counter + 1;
    })
      
    //card.innerHTML = cardHTML;
    //console.log(data)
}
function loadRAMPageCards(data){

    let cardHTML = "";
    let counter = 1;

    data.forEach(function ({brand, product_id, name, description, file_name}) {
        
        let card = document.querySelector(`#ram-card-${counter}`)

        cardHTML += `<img class="card-img-top" src="../Resources/Images/${file_name}" alt="Card image cap">`;
        cardHTML += `<div class="card-body">`;
        cardHTML += `<h5 class="card-title">`;
        cardHTML += `${brand} - ${name} </h5>` ;
        cardHTML += `<p class="card-text">${description}</p>`;
        cardHTML += `<button data-id=${product_id} class="btn btn-primary">Add to cart</button>`;
        cardHTML += "</div>";


        card.innerHTML = cardHTML;
        cardHTML = "";
        counter = counter + 1;
    })
      
    //card.innerHTML = cardHTML;
    //console.log(data)
}




