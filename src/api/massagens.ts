import { api } from './client';
import type { MassagemResponse } from '../types';

export const listarMassagens = () =>
  api.get<MassagemResponse[]>('/v1/massagens').then((r) => r.data);

export const buscarMassagem = (id: string) =>
  api.get<MassagemResponse>(`/v1/massagens/${id}`).then((r) => r.data);
