let id = "no";
var imgtext = "";
const alldata = getarrdata();
let getname = alldata.name;
//when there is nothing in local storage we willa ssign empty array.
if (getname == null) {
  let empty = [];
  let count = 0;
  localStorage.setItem("counter", JSON.stringify(count));
  setarrdata(empty, empty, empty, empty, empty)
}


selectData();
let inputs = document.getElementById('thumbnail');

inputs.addEventListener('change', (event) => {
  const image = event.target.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(image);
  reader.addEventListener('load', () => {
    imgtext = reader.result

  });
});
function manageData() {
  document.getElementById("msg").innerHTML = "";
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let description = document.getElementById("description").value;

  if (name == "" || price == "" || description == "" || imgtext == "") {
    document.getElementById("msg").innerHTML = "Please Fill The Field";
  } else if (/^-?\d+$/.test(price) != true) {
    document.getElementById("msg").innerHTML = "Price should be number";
  }
  else {
    name = capitlize(name);
    description = capitlize(description);
    name = capitlize(name);
    if (id == "no") {
      let count = JSON.parse(localStorage.getItem("counter"));
      count += 1;
      localStorage.setItem("counter", JSON.stringify(count));
      const alldata = getarrdata();
      let getname = alldata.name;
      let getimage = alldata.image;
      let getprice = alldata.price;
      let getdescription = alldata.description;
      let getid = alldata.pid
      getid.push(count)
      getname.push(name);
      getimage.push(imgtext);
      getprice.push(price);
      getdescription.push(description);
      setarrdata(getname, getimage, getprice, getdescription, getid);

      document.getElementById("name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("description").value = "";
      document.getElementById("thumbnail").value = "";

      document.getElementById("msg").innerHTML = "Data Added";
    } else {
      const alldata = getarrdata();
      let getname = alldata.name;
      let getimage = alldata.image;
      let getprice = alldata.price;
      let getdescription = alldata.description;
      let getid = alldata.pid;
      getname[id] = name;
      getimage[id] = imgtext;
      getprice[id] = price;
      getdescription[id] = description;
      document.getElementById("name").value = "";
      document.getElementById("thumbnail").value = "";
      document.getElementById("price").value = "";
      document.getElementById("description").value = "";
      document.getElementById("msg").innerHTML = "Data Updated";
      setarrdata(getname, getimage, getprice, getdescription, getid);
      id = "no";
    }
  }

  selectData();
}

function selectData() {
  const alldata = getarrdata();
  let getname = alldata.name;
  let getimage = alldata.image;
  let getprice = alldata.price;
  let getdescription = alldata.description;
  if (getname != null) {
    let html = "";
    let sno = 1;
    for (k in getname) {
      html = html + `<tr><td>${sno}</td><td>${getname[k]}</td>
            <td><img src="${getimage[k]}" alt="" height="20px"></td>
            <td>${getprice[k]}</td>
            <td>${getdescription[k]}</td>
            <td><a href="javascript:void(0)"
            onclick="editData(${k})">Edit</a>
            <a href="javascript:void(0)"
            onclick="deleteData(${k})">Delete</a></td></tr>`;
      sno++;
      document.getElementById("root").innerHTML = html;
    }
  }
}

function editData(rid) {
  id = rid;
  const alldata = getarrdata();
  let getname = alldata.name;
  let getimage = alldata.image;
  let getprice = alldata.price;
  let getdescription = alldata.description;

  document.getElementById("name").value = getname[rid];
  document.getElementById("price").value = getprice[rid];
  document.getElementById("description").value = getdescription[rid];
}

function deleteData(rid) {
  const alldata = getarrdata();
  let getname = alldata.name;
  let getimage = alldata.image;
  let getprice = alldata.price;
  let getdescription = alldata.description;
  let getid = alldata.pid
  getname.splice(rid, 1);
  getimage.splice(rid, 1);
  getprice.splice(rid, 1);
  getdescription.splice(rid, 1);
  getid.splice(rid, 1);
  setarrdata(getname, getimage, getprice, getdescription, getid);
  selectData();
}

function getarrdata() {
  let name = JSON.parse(localStorage.getItem("name"));
  let image = JSON.parse(localStorage.getItem("image"));
  let price = JSON.parse(localStorage.getItem("price"));
  let description = JSON.parse(localStorage.getItem("description"));
  let pid = JSON.parse(localStorage.getItem("idk"));
  return {
    name,
    image,
    price,
    description,
    pid
  }
}

function setarrdata(arr1, arr2, arr3, arr4, arr5) {
  localStorage.setItem("name", JSON.stringify(arr1));
  localStorage.setItem("image", JSON.stringify(arr2));
  localStorage.setItem("price", JSON.stringify(arr3));
  localStorage.setItem("description", JSON.stringify(arr4));
  localStorage.setItem("idk", JSON.stringify(arr5));

}

function capitlize(word) {
  const firstLetter = word.charAt(0)
  const firstLetterCap = firstLetter.toUpperCase()
  const remainingLetters = word.slice(1)
  let capitalizedWord = firstLetterCap + remainingLetters
  return capitalizedWord
}

function sorting() {
  let valu = document.getElementById("sortby");
  let value = valu.options[sortby.selectedIndex].text;
  const alldata = getarrdata();
  let getname = alldata.name;
  let getimage = alldata.image;
  let getprice = alldata.price;
  let getdescription = alldata.description;
  let getid = alldata.pid;
  //1) combine the arrays:
  var list = [];
  for (var j = 0; j < getname.length; j++)
    list.push({
      'name': getname[j], 'image': getimage[j]
      , 'price': getprice[j], 'description': getdescription[j], 'id': getid[j]
    });

  if (value == "Name") {
    list.sort(function (a, b) {
      return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
    });
  } else if (value == "Price") {
    list.sort(function (a, b) {
      return ((Number(a.price) < Number(b.price)) ? -1 : ((a.price == b.price) ? 0 : 1));
    });
  } else if (value == "Id") {
    list.sort(function (a, b) {
      return ((Number(a.id) < Number(b.id)) ? -1 : ((a.id == b.id) ? 0 : 1));
    });
  }
  for (var k = 0; k < list.length; k++) {
    getid[k] = list[k].id;
    getname[k] = list[k].name;
    getimage[k] = list[k].image;
    getprice[k] = list[k].price;
    getdescription[k] = list[k].description;
  }
  setarrdata(getname, getimage, getprice, getdescription, getid);
  selectData();
}