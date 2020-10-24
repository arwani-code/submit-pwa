function getApi(){

  caches.match(`https://api.football-data.org/v2/competitions/2021/standings`)
  .then((response) => {
      if(response){
          response.json().then((response) => {
            console.log(response);
            let output = "";
            response.standings[0].table.forEach(data => {
              output += `
                          <div class="card">
                              <div class="card-image">
                                 <h4>${data.position}</h4>
                                  <img src="${data.team.crestUrl}">
                                  <a href="./detail.html?id=${data.team.id}" class="btn-floating detail-team halfway-fab waves-effect waves-light"><i class="material-icons">info</i></a>
                              </div>
                              <div class="card-content">
                                <h4>${data.team.name}</h4>
                              </div>
                          </div>
                              `
            });
            document.getElementById('teams').innerHTML = output;
          });
      }
  });

   fetch('https://api.football-data.org/v2/competitions/2021/standings', {
        headers: {'X-Auth-Token': "a393ff2bfc7b46e5a7d3663e201694b1"}
         }).then(response => response.json())
            .then(response => {
              let output = "";
              response.standings[0].table.forEach(data => {
                output += `
                            <div class="card">
                                <div class="card-image">
                                   <h4>${data.position}</h4>
                                    <img src="${data.team.crestUrl}"/>
                                    <a href="./detail.html?id=${data.team.id}" class="btn-floating detail-team halfway-fab waves-effect waves-light"><i class="material-icons">info</i></a>
                                </div>
                                <div class="card-content">
                                  <h4>${data.team.name}</h4>
                                </div>
                            </div>
                                `
              });
              document.getElementById('teams').innerHTML = output;
            })
}

function getSavedTeams(){
  getAll().then(teams => {
    console.log(teams);

    let output = "";
    teams.forEach(team => {
      output += `
            <div class=" medium">
            <a href="./detail.html?id=${team.id}&saved=true">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${team.crestUrl}" />
              </div>
            </a>
            <div class="card-content">
              <span class="card-title truncate">${team.name}</span>
            </div>
          </div>
      `
    });
    document.getElementById("body-content").innerHTML = output;
  })
}

