

export class ValidacaoPilaDTO {
  id!: number;
  dataAcao!: Date;
  pilaBlocoJson!: Map<string, Object>;
  nonce!: string;
  chaveCriador!: string;
  tipoPilaBloco!: string;
  isOutroUsuario!: boolean;
}
