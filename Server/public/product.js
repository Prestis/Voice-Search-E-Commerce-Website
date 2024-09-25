//Product Loader
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getSpecificItem')
    .then(response => response.json())
    .then(data => loadSpecificProductCard(data['data']));
})


function loadSpecificProductCard(data){
    if (Object.keys(data).length === 0) {
        console.log("The JSON file is empty.");
        let cardHTML = "";
        let counter = 1;
        let card = document.querySelector(`#product-card-${counter}`)

        cardHTML += `<div class="card-body">`;
        cardHTML += `<p class="card-text">No Items Were Found. Try Again </p>`;
        cardHTML += "</div>";


        card.innerHTML = cardHTML;
        cardHTML = "";

    } else {
        let cardHTML = "";
        let counter = 1;
            data.forEach(function ({brand, product_id, name, description, file_name}) {
                
                let card = document.querySelector(`#product-card-${counter}`)
        
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
    }
    
    
    
      
    //card.innerHTML = cardHTML;
    //console.log(data)
}