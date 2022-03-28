const bringUsers = () => {
  const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log("exito");
      let responseinjson = JSON.parse(xhr.responseText);
      responseinjson.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `Name: ${el.name}  \n  Username: ${el.username}`;
        $fragment.appendChild($li);
      });
      $xhr.appendChild($fragment);
    } else {
      console.log("fracaso");
      let message = xhr.statusText || "Hubo un error :c";
      $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
    }
  });

  xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
  xhr.send();
}