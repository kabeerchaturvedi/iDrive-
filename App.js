function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

window.onload = (event) => {
  renderData();
  document.getElementById("myForm").addEventListener("submit", (event) => {
    event.preventDefault();
    let nameElement = document.getElementById("name");
    let name = nameElement.value;

    let emailElement = document.getElementById("email");
    let email = emailElement.value;

    let passwordElement = document.getElementById("pwd");
    let password = passwordElement.value;

    let confirmPasswordElement = document.getElementById("pwd2");
    let confirmPassword = confirmPasswordElement.value;

    if (
      password != confirmPassword ||
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ) ||
      /^[a-zA-Z ]{2,30}$/.test(name) ||
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(passwordElement) ||
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(confirmPasswordElement)
    ) {
      alert("Passwords did not match");
      let errorMessage = document.createElement("div");
      let newContent = document.createTextNode("Value incorrect");
      errorMessage.appendChild(newContent);
      document.getElementById("error-msg").appendChild(errorMessage);
    } else {
      let confirmDetails = [];
      if (localStorage.getItem("finalDetails")) {
        confirmDetails = JSON.parse(localStorage.getItem("finalDetails"));
      }
      confirmDetails.push([name, email, password, confirmPassword]);
      localStorage.setItem("finalDetails", JSON.stringify(confirmDetails));
      renderData();
      nameElement.value = "";
      emailElement.value = "";
      passwordElement.value = "";
      confirmPasswordElement.value = "";
    }
  });
};

function renderData() {
  document.getElementById("tbody").innerHTML = "";
  //innderhtml = ""
  let confirmDetails = [];
  if (localStorage.getItem("finalDetails")) {
    confirmDetails = JSON.parse(localStorage.getItem("finalDetails"));
  }
  confirmDetails.forEach((element) => {
    let tr = document.createElement("tr");
    element.forEach((element1) => {
      let td = document.createElement("td");
      td.appendChild(document.createTextNode(element1));
      tr.appendChild(td);
    });
    document.getElementById("tbody").appendChild(tr);
  });
}
