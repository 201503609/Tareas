var primero = 0;
var segundo = 0;
var tercero = 0;
var cuarto = 0;
var quinto = 0;
var sexto = 0;
var septimo = 0;
var octavo = 0;
var inicial = ["B", "DIRTY", "CLEAN"];

function getEstado(numEstado) {
  if (numEstado == 1) {
    return (window.document.getElementById("primero").innerHTML = primero);
  } else if (numEstado == 2) {
    return (window.document.getElementById("segundo").innerHTML = segundo);
  } else if (numEstado == 3) {
    return (window.document.getElementById("tercero").innerHTML = tercero);
  } else if (numEstado == 4) {
    return (window.document.getElementById("cuarto").innerHTML = cuarto);
  } else if (numEstado == 5) {
    return (window.document.getElementById("quinto").innerHTML = quinto);
  } else if (numEstado == 6) {
    return (window.document.getElementById("sexto").innerHTML = sexto);
  } else if (numEstado == 7) {
    return (window.document.getElementById("septimo").innerHTML = septimo);
  } else if (numEstado == 8) {
    return (window.document.getElementById("octavo").innerHTML = octavo);
  }
}

function graficas(arrayEstados) {
  if (arrayEstados[0] === "A") {
    if (arrayEstados[1] === "DIRTY" && arrayEstados[2] === "DIRTY") {
      primero++;
      getEstado(1);
    } else if (arrayEstados[1] === "DIRTY" && arrayEstados[2] === "CLEAN") {
      tercero++;
      getEstado(3);
    } else if (arrayEstados[1] === "CLEAN" && arrayEstados[2] === "DIRTY") {
      quinto++;
      getEstado(5);
    } else if (arrayEstados[1] === "CLEAN" && arrayEstados[2] === "CLEAN") {
      septimo++;
      getEstado(7);
    }
  } else if (arrayEstados[0] === "B") {
    if (arrayEstados[1] === "DIRTY" && arrayEstados[2] === "DIRTY") {
      segundo++;
      getEstado(2);
    } else if (arrayEstados[1] === "DIRTY" && arrayEstados[2] === "CLEAN") {
      cuarto++;
      getEstado(4);
    } else if (arrayEstados[1] === "CLEAN" && arrayEstados[2] === "DIRTY") {
      sexto++;
      getEstado(6);
    } else if (arrayEstados[1] === "CLEAN" && arrayEstados[2] === "CLEAN") {
      octavo++;
      getEstado(8);
    }
  }
}

function iniciar(inicial) {
  var location = inicial[0];
  var state = inicial[0] == "A" ? inicial[1] : inicial[2];
  var action_result = reflex_agent(location, state);
  let child = document.createElement("p");
  child.innerHTML = `Location: ${location} | Action ${action_result}`;
  document.getElementById("log").prepend(child);
  if (action_result == "CLEAN") {
    if (location == "A") inicial[1] = "CLEAN";
    else if (location == "B") inicial[2] = "CLEAN";
  } else if (action_result == "RIGHT") inicial[0] = "B";
  else if (action_result == "LEFT") inicial[0] = "A";
  if (
    primero >= 2 &&
    segundo >= 2 &&
    tercero >= 2 &&
    cuarto >= 2 &&
    quinto >= 2 &&
    sexto >= 2 &&
    septimo >= 2 &&
    octavo >= 2
  ) {
    alert("SE COMPLETARON 2 VECES LOS 8 ESTADOS");
    return;
  }
  setTimeout(function () {
    iniciar(inicial);
    random(inicial);
  }, 1500);
}

function random(inicial) {
  if (inicial[1] == "CLEAN" && Math.floor(Math.random() * 10) > 7) {
    inicial[1] = "DIRTY";
    document.getElementById("ABasura").classList.remove("d-none");
    let child = document.createElement("p");
    child.innerHTML = `Location: A | Action RANDOM`;
    document.getElementById("log").prepend(child);
  }
  if (inicial[2] == "CLEAN" && Math.floor(Math.random() * 10) < 5) {
    inicial[2] = "DIRTY";
    document.getElementById("BBasura").classList.remove("d-none");
    let child = document.createElement("p");
    child.innerHTML = `Location: B | Action RANDOM`;
    document.getElementById("log").prepend(child);
  }
  graficas(inicial);
}

function reflex_agent(location, state) {
  if (state == "DIRTY") {
    if (location == "A") {
      document.getElementById("ABasura").classList.add("d-none");
    } else {
      document.getElementById("BBasura").classList.add("d-none");
    }
    return "CLEAN";
  } else if (location == "A") {
    document.getElementById("BAspi").classList.remove("d-none");
    document.getElementById("AAspi").classList.add("d-none");
    return "RIGHT";
  } else if (location == "B") {
    document.getElementById("AAspi").classList.remove("d-none");
    document.getElementById("BAspi").classList.add("d-none");
    return "LEFT";
  }
}

iniciar(inicial);
