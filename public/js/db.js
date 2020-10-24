let dbPromised = idb.open("teams", 1, function(upgradeDb) {
                let teamsObjectStore = upgradeDb.createObjectStore("teams", {
                keyPath: "id"
                });
                teamsObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(data) {
        dbPromised
          .then(function(db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(data);
            store.put(data);
            return tx.complete;
          })
          .then(function() {
            console.log("team berhasil di simpan.");
        })
}

function deleteItem(data) {
        dbPromised
          .then(function(db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(data);
            store.delete(data.id);
            return tx.complete;
          })
          .then(function() {
            console.log("team berhasil di hapus.");
        })
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}      
