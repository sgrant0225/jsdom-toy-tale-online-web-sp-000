
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollectionElement = document.querySelector("#toy-collection")
// did not use this varaible const likeButton = document.getElementsByClassName("like-btn")
let addToy = false;


document.addEventListener("DOMContentLoaded", () => {

     fetch('http://localhost:3000/toys')
      .then(res => res.json())
      .then(toys => {
         // next take the toy array and make html with them in order to add them to the DOM
             let toysHTML = toys.map(function(toy){
               return `
               <div class="card">
               <h2>${toy.name}</h2>
               <img src=${toy.image} class="toy-avatar" />
               <p>${toy.likes} Likes </p>
               <button data-id="${toy.id}" class="like-btn">Like <3</button>
               <button data-id="${toy.id}" class="delete-btn"> X Go back to the toy chest X</button>
             </div>
             `
             })
             toyCollectionElement.innerHTML += toysHTML 
      })
    
    toyFormContainer.addEventListener("submit", (e) => {
      e.preventDefault()
      //console.log(e.target.name)
      //grab the inputs from the form 
      const toyName = e.target.name.value 
      const toyImage = e.target.image.value 
       console.log(toyName, toyImage)

       fetch('http://localhost:3000/toys', {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           "Accept": "application/json"
         },
         body: JSON.stringify({
           name: toyName,
           image: toyImage,
           likes: 99
         })
       })
       .then(response => response.json())
       .then(newToy => {
          //fetch updated DB and update that to the DOM 
          //convert newToy from JSON to HTML in order to add to the DOM
           let newToyHTML = `
           <div class="card">
               <h2>${newToy.name}</h2>
               <img src=${newToy.image} class="toy-avatar" />
               <p>${newToy.likes} Likes </p>
               <button data-id="${newToy.id}" class="like-btn">Like <3</button>
             </div>
             `
           toyCollectionElement.innerHTML += newToyHTML 
           
       })
    }) 
    
      toyCollectionElement.addEventListener("click", (e) => {
          
           if (e.target.className === "like-btn"){
            let currentLikes =
              parseInt(e.target.previousElementSibling.innerText) 
              let newLikes = currentLikes + 1 
              e.target.previousElementSibling.innerText = newLikes + " likes"

              fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
                method: "PATCH", 
                headers: {
                  "Content-Type": "application/json",
                   "Accept": "application/json"
                },
                body: JSON.stringify({
                  likes: newLikes
                })
              })
           }
           if (e.target.className === "delete-btn"){
            fetch(`http://localhost:3000/toys/${e.target.dataset.id}`,{
                method: "DELETE"
            }) 
            .then(response => {
              e.target.parentElement.remove()
            })
               
        }
    })


  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
});



  

