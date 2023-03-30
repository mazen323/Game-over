const anchons = document.querySelectorAll(".nav-item a");
const loading = document.querySelector(".loading");
getGames("MMORPG");
for(let i=0 ; i<anchons.length ; i++)
{
    anchons[i].addEventListener("click", function(e){
        document.querySelector(".nav-item .active").classList.remove("active");
        e.target.classList.add("active");
        getGames(e.target.dataset.category);

    })
};
window.addEventListener("scroll", function () {
    if (scrollY > 50) {
       document.querySelector("nav").classList.add("fixed-top");
    } else {
       document.querySelector("nav").classList.remove("fixed-top");
    }
 });

async function getGames(depart){ 
    loading.classList.remove("d-none");
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '2d5a5a5a9dmsh15179b3230e1354p1d665fjsn1fd6f358f12d',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${depart}`, options);
    const response = await api.json();
    console.log(response);
    displayGame(response);
    
    loading.classList.add("d-none");
}

function displayGame(data) {
    let Box = ``;
   for (let i = 0; i < data.length; i++) {
      Box += `
      <div class="col">
      <div class="card h-100 bg-transparent" role="button" onclick="showDetails(${data[i].id})">
         <div class="card-body">
            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
            </figure>

            <figcaption>

               <div class="hstack justify-content-between">
                  <h3 class="h6 small text-light">${data[i].title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>

               <p class="card-text small text-center opacity-50 text-light">
                  ${data[i].short_description.split(" ", 8)}
               </p>

            </figcaption>
         </div>

         <footer class="card-footer small hstack justify-content-between">

            <span class="badge badge-color">${data[i].genre}</span>
            <span class="badge badge-color">${data[i].platform}</span>

         </footer>
      </div>
   </div>
      `
   };

document.getElementById("gameData").innerHTML = Box;
}

function showDetails(id){
   location.href=`./details.html?id=${id}`;
}






