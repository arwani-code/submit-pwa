function getDetailTeam(){
    //window search save
    const isFromSaved = new URLSearchParams(window.location.search).get("saved");
    //Init dom element
    const save = document.getElementById("save");
    const deleteBtn = document.getElementById("delete");
    //Check saved
    if(isFromSaved){
      save.style.display = 'none';
      saveData();
    } else{
      let item = getDataTeam();
    }
    //Funtion get detail data team
    getDataTeam();
    //Add save event
    save.addEventListener("click", saveData);
    //Delete item from database
    deleteBtn.addEventListener("click", delItem);
}

function getDataTeam(){

  return new Promise((resolve, reject) => {
    const idParam = new URLSearchParams(window.location.search).get("id");

    if("caches" in window){
      caches.match(`https://api.football-data.org/v2/teams/${idParam}`)
          .then((response) => {
              if(response){
                  response.json().then((data) => {
                          let detailTeam = `
                          <div class="row">
                          <div class="col s12 m7">
                            <div class="card">
                              <div class="card-image">
                                <img src="${data.crestUrl}">
                                <span class="card-title">${data.name}</span>
                              </div>
                              <div class="card-content">
                               <p>Address:  ${data.address}</p>
                               <p>Phone:  ${data.phone}</p>
                               <p>E-mail:  ${data.email}</p>
                               <p>Address:  ${data.address}</p>
                               <p>Vanue:  ${data.vanue}</p>
                              </div>
                              <div class="card-action">
                                <a href="${data.wesite}">more info</a>
                              </div>
                            </div>
                          </div>
                        </div> 
                          `
                       document.getElementById('body-content').innerHTML = detailTeam;
                       resolve(data);
                      });
              }
          });
    }

    fetch(`https://api.football-data.org/v2/teams/${idParam}`, { headers: {"X-Auth-Token": "a393ff2bfc7b46e5a7d3663e201694b1"} })
    .then(response => response.json())
    .then(data => {
        let detailTeam = `
                        <div class="row">
                        <div class="col s12 m7">
                          <div class="card">
                            <div class="card-image">
                              <img src="${data.crestUrl}">
                              <span class="card-title black">${data.name}</span>
                            </div>
                            <div class="card-content">
                             <p>Address:  ${data.address}</p>
                             <p>Phone:  ${data.phone}</p>
                             <p>E-mail:  ${data.email}</p>
                             <p>Address:  ${data.address}</p>
                             <p>Venue:  ${data.venue}</p>
                            </div>
                            <div class="card-action">
                              <a href="${data.website}">more info</a>
                            </div>
                          </div>
                        </div>
                      </div> 
                        `
                     document.getElementById('body-content').innerHTML = detailTeam;
                     resolve(data);
                    })
  })
}

function saveData(){
  console.log("Tombol FAB di klik");
  const items = getDataTeam();
  items.then(data => saveForLater(data));
}

function delItem(){
  console.log("Berhasil di hapus");
  const teams = getDataTeam();
  teams.then(data => deleteItem(data));
}

document.addEventListener('DOMContentLoaded', getDetailTeam);

