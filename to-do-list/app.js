let input = document.getElementById("in");
let list = document.getElementById("list");
let mintext = 3;
let i = 1;
function textfilter(x) {
  if (x) {
    if (x.length >= mintext) {
      return x;
    } else {
      alert("the text is not enough");
      return false;
    }
  } else {
    alert(
      "there is no text in the box, pls fill something in the to-do list box"
    );
    return false;
  }
}
function showlist(text) {
  let span = document.createElement("span");
  let span1 = document.createElement("span");
  let btn1 = document.createElement("button");
  let btn2 = document.createElement("button");
  let li = document.createElement("li");
  let txt = document.createTextNode(text);
  let txt1 = document.createTextNode("edit");
  let txt2 = document.createTextNode("delete");
  span.appendChild(txt);
  span.classList = "span-one";
  span.id = `spantext${i}`;
  li.appendChild(span);
  li.appendChild(span1);
  span1.appendChild(btn1);
  span1.appendChild(btn2);
  span1.classList = "span-two";
  li.classList = "animate__animated animate__fadeInUp";
  li.id = `list${i}`;
  list.appendChild(li);
  btn1.appendChild(txt1);
  btn1.setAttribute("onclick", `editlist(${i})`);
  btn1.classList = "btn-one";
  // li.appendChild(btn1);
  btn2.appendChild(txt2);
  btn2.setAttribute("onclick", `deletelist(${i})`);
  btn2.classList = "btn-two";
  // li.appendChild(btn2);
  i++;
}
function editlist(listId) {
  let current = document.getElementById(`spantext${listId}`);
  let newtext = prompt("say something", current.innerHTML);
  if (textfilter(newtext)) {
    current.innerHTML = newtext;
  }
}
function deletelist(i) {
  let current = document.getElementById(`list${i}`);
  let currentText = document.getElementById(`spantext${i}`).innerHTML;
  let deletelist = confirm(`Are you sure to delete the list'${currentText}'`);
  if (deletelist) {
    list.removeChild(current);
  } else {
    console.log("delete cancel");
  }
}
function btn() {
  let inputText = textfilter(input.value);
  if (inputText) {
    showlist(inputText);
    input.value = "";
  }
}
