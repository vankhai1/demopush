var URL = 'https://63f58d3c2213ed989c565c3d.mockapi.io/Student';

function GetUser(callback) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(URL, options)
        .then(function (repos) {
            return repos.json();
        }).then(callback)
}
function CreateUser(data, callback) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(URL, options)
        .then(function (repos) {
            return repos.json();
        }).then(callback)
}
function CreateHandle() {
    var name = document.getElementById("name").value;
    var CreateTime = Date.now;
    var avatar = document.getElementById("avatar").value;
    var phoneNumber = document.getElementById("phone").value;
    var obj = {
        name: name,
        createAt: CreateTime,
        avatar: avatar,
        phoneNumber: phoneNumber
    }
    CreateUser(obj, function () {
        GetUser(ShowUser);
    });
}

function ShowUser(data) {
    var tableUser = document.getElementById("tableUser");
    var Users = data.map(function (user) {
        return ` <tr>
        <td>${user.id}</td>
        <td>${user.MSSV}</td>
        <td>${user.Hoten}</td>
        <td>${user.CreateAt}</td>
        <td>${user.AnhDaiDien}</td>
        <td>${user.SDT}</td>
        <td>${user.GPA}</td>

        <td> <button onclick="DeleteUser(${user.id})" >Xoa</button></td>
        <td> <button onclick="UpdateUser(${user.id})" >Update</button></td>
    </tr>`;
    });
    tableUser.innerHTML = Users.join(' ');
    // console.log();
}
function UpdateUser(id) {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(URL + '/' + id, options)
        .then(function (repos) {
            return repos.json();
        }).then(function (data) {
            var UpdateBtn = document.getElementById("Savebtn");
            UpdateBtn.style.display = "inline";
            document.getElementById("mssv").value= data.MSSV;
            document.getElementById("name").value= data.Hoten;
            document.getElementById("avatar").value = data.AnhDaiDien;
            document.getElementById("phone").value = data.SDT;
            UpdateBtn.onclick = function(){
                var name = document.getElementById("mssv").value;
                var name = document.getElementById("name").value;
                var CreateTime = data.createAt;
                var avatar = document.getElementById("avatar").value;
                var phoneNumber = document.getElementById("phone").value;
                var obj = {
                    name: name,
                    createAt: CreateTime,
                    avatar: avatar,
                    phoneNumber: phoneNumber
                }
                let optionsPUT = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                }
                fetch(URL+ '/' + id, optionsPUT)
                    .then(function (repos) {
                        return repos.json();
                    }).then(function(){
                        GetUser(ShowUser);
                        UpdateBtn.style.display = "none";
                    })
            } 
        })
}
function DeleteUser(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(data)
    }
     alert(' Xoa '+id)
    fetch(URL + '/' + id, options)
        .then(function (repos) {
            return repos.json();
        }).then(function () {
            GetUser(ShowUser);
        })
}
GetUser(ShowUser);