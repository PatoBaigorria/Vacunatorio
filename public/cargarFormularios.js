function cargarFormulario(url) {
	fetch(url)
		.then((response) => response.text())
		.then((html) => {
			document.getElementById("formulario-container").innerHTML = html;
		})
		.then(() => {
			if (url == "/formPersona") {
				fun();
			}
		})
		.catch((error) => {
			console.error("Error al cargar el formulario:", error);
		});
}

function fun() {
	document
		.querySelector("select#ocupacion")
		.addEventListener("change", () => {
			let mat = document.createElement("input");
			let m = document.createElement("label");

			mat.setAttribute("name", "matricula");
			m.innerText = "Matricula:";

			let div = document.querySelector("div#matricula");
			div.appendChild(m);
			div.appendChild(mat);
		});
}
