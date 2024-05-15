import {IProjeto} from "@/interfaces/IProjeto";

export default interface ITarefa {
    id: string | number;
    duracaoEmSegundos: number;
    descricao: string;
    projeto: IProjeto;
}