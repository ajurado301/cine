// Clase Espectador
export class Espectador {

    // Atributos privador
    private nombre: string;
    private edad: number;
    private dinero: number;

    // Constructor
    constructor(nombre: string, edad: number, dinero: number) {
        this.nombre = nombre;
        this.edad = edad;
        this.dinero = dinero
    }

    // geters (Solo lectura)
    public getNombre(): string { return this.nombre };
    public getEdad(): number { return this.edad };
    public getDinero(): number { return this.dinero };

    // Método público
    public toString(): string {
        return `Nombre: ${this.nombre} - Edad: ${this.edad} - Dinero: ${this.dinero}`
    }
}