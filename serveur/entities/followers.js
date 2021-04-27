class Followers {

  // Constructeur de la classe Friends (instanciation): creation d'une table 'friends'
  // constituée des champs id (autoincremental), login, password, lastname (nom), firstname (prenom) A MODIFIER!!!!!!!!!
  constructor(db) {
    this.db = db

    const createFollowersTable = `CREATE TABLE IF NOT EXISTS "followers" (
      "id1"	INTEGER NOT NULL,
      "id2"	INTEGER NOT NULL,
      "entity" VARCHAR(50) NOT NULL,
      PRIMARY KEY("id1" , "id2", "entity")
    )`;
    db.exec(createFollowersTable, function(err){
      if(err){
        throw err;
      }
      console.log('Followers table ready');
    })
    
  }

  alreadyFollowed(id1,id2, entity) {
    return new Promise((resolve, reject) => {
      const selectFriends = `SELECT id1 FROM followers WHERE id1 = '${id1}' AND id2 = '${id2}' AND entity = '${entity}'`;
      this.db.get(selectFriends, function(err, row){
        if(err) {
          reject(err);
        } else {
          resolve(row != undefined);  
        }  
      })
    });
  }

  follow(id1, id2, entity) {
    return new Promise((resolve, reject) => {
      const sql_addF = `INSERT INTO followers (id1, id2, entity) VALUES ('${id1}', '${id2}', '${entity}')` ;
      this.db.exec(sql_addF, function(err, row){
        if(err) {
          reject(err);
        } else {
          resolve(id1);  
        }  
      })
    });
  }

  unFollow(id1, id2, entity) {
    return new Promise((resolve, reject) => {
      const sql_rejF = `DELETE FROM followers WHERE id1 = '${id1}' AND id2 = '${id2}' AND entity = '${entity}'` ;
      this.db.exec(sql_rejF, function(err, row){
        if(err) {
          reject(err);
        } else {
          resolve(id1);  
        }  
      })
    });
  }

  getFollowedList(id, entity) { 
    return new Promise((resolve, reject) => {
      const sql_FrList = `SELECT id1 FROM followers WHERE id2 = '${id}' AND entity = '${entity}'`;
      this.db.all(sql_FrList, function(err, rows){
        if(err) {
          reject(err);
        } else {
          var tab = [];
          if (rows != undefined){ 
            rows.forEach((row) => {
                tab.push(row.id1);
            })
            resolve(tab);
          }
        }
      });
    });
  }
}

exports.default = Followers;

