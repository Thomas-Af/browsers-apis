const EcvCoords = {
  latitude: 44.86,
  longitude: -0.55,
};

const title = document.getElementById("title");

function error() {
  title.innerHTML = "Nous n'avons pas vos coordonées";
}

function success(pos) {
  const crd = pos.coords;

  if (
    EcvCoords.latitude === Math.round(crd.latitude * 100) / 100 &&
    EcvCoords.longitude === Math.round(crd.longitude * 100) / 100
  ) {
    title.innerHTML = "Vous êtes à l'ECV";
  } else {
    title.innerHTML = "Vous n'êtes pas à l'ECV";
  }
}

navigator.geolocation.getCurrentPosition(success, error);
