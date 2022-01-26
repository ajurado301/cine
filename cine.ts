import { Espectador } from "./espectador";
import { Pelicula } from "./pelicula";

// Clase Cine
// Podría haber creado un atributo array de películas y elegir a cual queremos ir pero por falta de tiempo lo dejo así
export class Cine {

    // Atributos
    private peliActual: Pelicula;
    private precioEntrada: number;
    private arrayAsientosOcupados: boolean[][] = [];
    private arrayEspectadoresSentados: string[][] = [];
    private letraAsiento: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]

    // Constructor
    constructor(peliActual: Pelicula, precioEntrada: number) {
        this.peliActual = peliActual;
        this.precioEntrada = precioEntrada;
        // todos los asientos no ocupados
        for (let i = 0; i < 8; i++) {
            let ocupacionFila: boolean[] = [];
            let nombresFila: string[] = []
            for (let j = 0; j < 9; j++) {
                ocupacionFila.push(false);
                nombresFila.push("");
            }
            this.arrayAsientosOcupados.push(ocupacionFila);
            this.arrayEspectadoresSentados.push(nombresFila);
        }
    }

    // setters (solo escritura por si se quiere cambiar la película/precio)
    public setPeliActual(peliActual: Pelicula): void { this.peliActual = peliActual };
    public setPrecioEntrada(precioEntrada: number): void { this.precioEntrada = precioEntrada };

    // Métodos
    // Método para asignar asiento
    // Recibe un espectador y devuelve un string con el asiento asignado o el motivo del rechazo
    public asignarAsiento(espectador: Espectador): string {
        let result: string = "";
        // Condiciones para poder asignar asiento (cumpleEdad, tieneDinero y qeudaSitio)
        let cumpleEdad: boolean = espectador.getEdad() >= this.peliActual.getEdadMinima();
        let tieneDinero: boolean = espectador.getDinero() >= this.precioEntrada;
        // Creamos un array con los índices de las filas llenas
        // Esto nos permite saber si el cine está lleno para la condición quedaSitio
        // y descartarlas dichas filas en el random para que sea más eficiente
        let arrayFilasLlenas: number[] = [];
        this.arrayAsientosOcupados.forEach((fila, indice) => {
            if (!fila.includes(false)) {
                arrayFilasLlenas.push(indice)
            }
        });
        let quedaSitio: boolean = arrayFilasLlenas.length < 8;
        // Comprobamos condiciones
        if (!quedaSitio) {
            result = `${espectador.getNombre()} => No quedan sitios disponibles`;
        } else if (!cumpleEdad) {
            result += `${espectador.getNombre()} => Edad: ${espectador.getEdad()} - Mínima: ${this.peliActual.getEdadMinima()}`
        } else if (!tieneDinero) {
            result += `${espectador.getNombre()} => Dinero: ${espectador.getDinero()} - Precio: ${this.precioEntrada}`
        } else { // Asignamos asiento aleatoriamente
            let asignado = false;
            while (!asignado) {
                let filaAleatoria: number = Math.round(Math.random() * 7);
                if (!arrayFilasLlenas.includes(filaAleatoria)) { // Si esa fila no está llena buscamos asiento aleatorio
                    while (!asignado) {
                        let letraAleatoria: number = Math.round(Math.random() * 8);
                        if (!this.arrayAsientosOcupados[filaAleatoria][letraAleatoria]) { // Cuando encuantra uno no ocupado actualiza arrays ocupacio y nombres
                            this.arrayAsientosOcupados[filaAleatoria][letraAleatoria] = true;
                            this.arrayEspectadoresSentados[filaAleatoria][letraAleatoria] = espectador.getNombre();
                            asignado = true;
                            result = `${espectador.getNombre()} => ${filaAleatoria + 1}${this.letraAsiento[letraAleatoria]}`;
                        }
                    }
                }
            }
        }
        return result;
    }

    // Método para mostrar La información del la película enemisón
    public toString(): string {
        let result: string = `\nEl cine está emitiendo `;
        result += `${this.peliActual.getTitulo()}, `;
        result += `dura ${this.peliActual.getDuracion()} minutos, `;
        result += `es para mayores de ${this.peliActual.getEdadMinima()} años, `;
        result += `está dirigida por ${this.peliActual.getDirector()} `;
        result += `y el precio de la entrada es de ${this.precioEntrada}€\n`;
        return result
    }

    // Método para mostrar el estado actual de la ocupación
    public printOcupacion(): void {
        for (let i = 7; i >= 0; i--) {
            let fila: string = "";
            let ocupacionFila: string = "";
            for (let j = 0; j < 9; j++) { // Los espacios en blanco son para cuadrar una anchura fija de 12 caracteres por columna.
                fila += (i + 1).toString() + this.letraAsiento[j] + "          ";
                if (this.arrayAsientosOcupados[i][j]) {
                    ocupacionFila += "\u001b[31m" + (this.arrayEspectadoresSentados[i][j] + "            ").substring(0, 11) + " \u001b[39m";
                } else {
                    ocupacionFila += "\u001b[32m" + "Libre       " + "\u001b[39m";
                };
            }
            console.log(fila);
            console.log(ocupacionFila);
        }
    }

    // Metodo para mostrar el nombre de la persona de un determinado asiento
    public espectadorAsiento(asiento: string): boolean {
        let result: boolean = true;
        if (asiento.length == 2 && (asiento[0] >= "1" && asiento[0] <= "8") && (asiento[1] >= "A" && asiento[1] <= "I")){
            let indice1: number = parseInt(asiento[0]) - 1;
            let indice2: number = this.letraAsiento.indexOf(asiento[1]);
            if (this.arrayAsientosOcupados[indice1][indice2]) {
                console.log(`El asiento ${asiento} está ocupado por ${this.arrayEspectadoresSentados[indice1][indice2]}`)
            }else {
                console.log(`El asiento ${asiento} está libre`);
            };
        }else {
            result = false;
        }
        return result
    }
}
