export interface MassagemResponse {
  id: string;
  nome: string;
  valor: number;
  descricao: string;
  duracao: number; // em minutos
}

export interface ApiError {
  message: string;
  status?: number;
}
