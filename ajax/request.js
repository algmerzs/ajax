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
};

const bringCommentsWithFetch = () => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();

  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`${res.status}: ${res.statusText}`);
    })
    .then((json) => {
      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.name} from ${el.email}`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
    })
    .catch((e) => {
      const $b = document.createElement("b");
      $b.innerHTML = e !== undefined ? e : "Error imprevisto";
      $fetch.appendChild($b);
    });
};

const fetchAsync = () => {
  const $fetch = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

  const getData = async () => {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/post"),
        json = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          statusText: response.statusText,
        };
      }

      json.forEach((el) => {
        const $li = document.createElement("li");
        $li.innerHTML = `${el.title} --> ${el.body}`;
        $fragment.appendChild($li);
      });
      $fetch.appendChild($fragment);
    } catch (error) {
      
      let message = `${error.status}: ${error.statusText !== "" ? error.statusText : "Ocurrió un error" }`;
      $fetch.innerHTML = message;
    }
  };

  getData();
};
