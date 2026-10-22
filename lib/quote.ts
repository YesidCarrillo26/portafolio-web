import {
  accountsOptions,
  designOptions,
  extras,
  projectTypes,
  rushOptions,
  type AccountsLevel,
  type DesignChoice,
  type ExtraOption,
  type ProjectType,
  type ProjectTypeId,
} from '@/content/calculadora';
import { estimate, type Estimate, type Rush } from './pricing';

export interface Answers {
  type: ProjectTypeId | null;
  accounts: AccountsLevel;
  extras: string[];
  design: DesignChoice;
  rush: Rush;
}

export const initialAnswers: Answers = { type: null, accounts: 'none', extras: [], design: 'own', rush: 'normal' };

export interface QuoteLine {
  label: string;
  hours: number;
}

export interface Quote {
  type: ProjectType;
  lines: QuoteLine[];
  estimate: Estimate;
  rushLabel: string;
}

/** Extras que se ofrecen para un tipo de proyecto (según web/app y lo que ya incluye la base). */
export function availableExtras(typeId: ProjectTypeId | null): ExtraOption[] {
  const type = projectTypes.find((t) => t.value === typeId);
  if (!type) return [];
  return extras.filter((e) => e.kinds.includes(type.kind) && !e.includedIn?.includes(type.value));
}

/** Quita las respuestas que ya no aplican al cambiar de tipo (p. ej. "Notificaciones push" al pasar de app a web). */
export function normalize(a: Answers): Answers {
  const allowed = new Set(availableExtras(a.type).map((e) => e.value));
  return { ...a, extras: a.extras.filter((v) => allowed.has(v)) };
}

export function buildQuote(a: Answers): Quote | null {
  const type = projectTypes.find((t) => t.value === a.type);
  if (!type) return null;

  const lines: QuoteLine[] = [{ label: type.title, hours: type.hours }];

  const accounts = accountsOptions.find((o) => o.value === a.accounts);
  if (accounts && accounts.hours[type.kind] > 0) lines.push({ label: accounts.title, hours: accounts.hours[type.kind] });

  for (const extra of availableExtras(a.type)) {
    if (a.extras.includes(extra.value)) lines.push({ label: extra.title, hours: extra.hours });
  }

  const design = designOptions.find((o) => o.value === a.design);
  if (design && design.hours[type.kind] > 0) lines.push({ label: 'Diseño de pantallas', hours: design.hours[type.kind] });

  const hours = lines.reduce((sum, l) => sum + l.hours, 0);
  const rushLabel = rushOptions.find((r) => r.value === a.rush)?.title ?? 'Sin afán';
  return { type, lines, estimate: estimate(hours, a.rush), rushLabel };
}
