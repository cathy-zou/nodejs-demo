var UserSQL = {
    insert:'INSERT INTO UserList(id,name,age,gender,birthday,viplevel,description,account,mobile,address,email) VALUES(?,?,?,?,?,?,?,?,?,?,?)',
    queryAll:'SELECT * FROM UserList',
    getUserById:'SELECT * FROM UserList WHERE id = ? ',
    updateUserById: 'UPDATE UserList SET name = ?,age = ?,gender = ?,birthday = ?,viplevel = ?,description = ?,account = ?,mobile = ?,address = ?,email = ? WHERE Id = ?',
    deleteById: 'DELETE FROM UserList where id= ?'
};
module.exports = UserSQL;
