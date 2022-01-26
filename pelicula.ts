// Clase Pelicula
export class Pelicula {

    // Atributos privados
    private titulo: string;
    private duracion: number;
    private edadMinima: number;
    private director: string;

    // Constructor
    constructor(titulo: string, duracion: number, edadMinima: number, director: string) {
        this.titulo = titulo;
        this.duracion = duracion;
        this.edadMinima = edadMinima;
        this.director = director
    }

    // getters (solo lectura)
    public getTitulo(): string { return this.titulo };
    public getDuracion(): number { return this.duracion };
    public getEdadMinima(): number { return this.edadMinima };
    public getDirector(): string { return this.director };

    // Método público
    public toString(): string {
        return `Título: ${this.titulo} - Duración: ${this.duracion} - Edad mínima: ${this.edadMinima} - Director: ${this.director}`
    }
}
  