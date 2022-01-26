import { Espectador } from "./espectador";
import { Pelicula } from "./pelicula";
import { Cine } from "./cine";

// Array de nombres
let arrayNombres: string[] = ["Aarón", "Abdul", "Abel", "Abelardo", "Abraham", "Adam", "Adán", "Adolfo", "Adrián", "Adriano", "Agustín", "Aladino", "Alan", "Alberto", "Alejandro", "Alessandro", "Alexis", "Alfonso", "Alonso", "Alvaro", "Andrés", "Angel", "Antonio", "Ariel", "Armando", "Arturo", "Augusto", "Aurelio", "Baltazar", "Bartolomé", "Belisario", "Benjamín", "Benedicto", "Bernarndo", "Boris", "Braulio", "Brian", "Bruno", "Caín", "Camilo", "Carlos", "Casimiro", "César", "Christian", "Cristóbal", "Claudio", "Clemente", "Constancio", "Constantino", "Cristian", "Cristóbal", "Daniel", "Dario", "David", "Diego", "Domingo", "Edgar", "Eduardo", "Elías", "Emilio", "Enrique", "Ernesto", "Esteban", "Eugenio", "Ezequiel", "Fabián", "Federico", "Felipe", "Félix", "Fermín", "Fernando", "Fidel", "Francisco", "Gabriel", "Gerardo", "Germán", "Gilberto", "Giovanni", "Gonzalo", "Gregorio", "Guillermo", "Gustavo", "Héctor", "Heriberto", "Hugo", "Hilario", "Humberto", "Hilario", "Ignacio", "Isaac", "Ismael", "Iván", "Jacobo", "Jaime", "Jairo", "Javier", "Jesús", "Joaquín", "Jorge", "José", "Juan", "Julián", "Kevin", "Leandro", "Leonardo", "Leopoldo", "Lucas", "Luis", "Manuel", "Marcos", "Mario", "Martín", "Mateo", "Matías", "Maximiliano", "Máximo", "Miguel", "Nelson", "Néstor", "Nicolás", "Octavio", "Oier", "Omar", "Oscar", "Orlando", "Ovidio", "Pablo", "Paulo", "Patricio", "Pedro", "Rafael", "Ramiro", "Ramón", "Raúl", "Ricardo", "Roberto", "Rubén", "Salvador", "Samuel", "Santiago", "Sergio", "Simón", "Teodoro", "Tito", "Tobías", "Tomás", "Ulises", "Valentín", "Vicente", "Víctor", "Wilfredo", "William", "Zacarías"]

// Mezclar array de nombres (para más variedad ya que en el array están ordenados)
for(let i = 0; i < 500; i++) {
    let indice1: number = Math.round(Math.random() * (arrayNombres.length - 1));
    let indice2: number = Math.round(Math.random() * (arrayNombres.length - 1));
    if (indice1 != indice2) {
        [arrayNombres[indice1], arrayNombres[indice2]] = [arrayNombres[indice2], arrayNombres[indice1]];
    };
};

// Crear array con 95 espectadores (Cifra aceptable para los tests)
let arrayEspectadores: Espectador[] = [];
for(let i = 0; i < 95; i++) {
    let edadAleatoria = Math.round(Math.random() * 50) + 10 // Entre 10 y 60 años aleatoriamente
    let dineroAleatori = Math.round(Math.random() * 15 ) + 5 // Entre 5 y 20€ aleatoriamente
    arrayEspectadores.push(new Espectador(arrayNombres[i], edadAleatoria, dineroAleatori));
};

// Creamos una película de pruebas para el cine
let pelicula = new Pelicula("Pulp fiction", 125, 18, "Quentin Tarantino");
// Creamos el cine con esa película en emisión
let miCine: Cine = new Cine(pelicula, 8);
// Mostramos datos de la película que está en emisión
console.log(miCine.toString());
// Solicitamos asiento para el array de espectadores aleatorios mostrando el resultado (return del método);
for (let i = 0; i < arrayEspectadores.length; i++) {
    console.log(miCine.asignarAsiento(arrayEspectadores[i])); // Mostramos resultado de cada solicitud (por espectador)
};
// Mostramos la ocupación final
miCine.printOcupacion();

// Mostramos el nombre del espectador asignado al asiento especificado
miCine.espectadorAsiento("5F");