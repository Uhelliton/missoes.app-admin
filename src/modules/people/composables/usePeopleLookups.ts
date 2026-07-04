import { reactive, ref } from 'vue';

import { GenderService } from '../services/gender.service.ts';
import { PeopleCategoryService } from '../services/people-category.service.ts';
import { OriginService } from '../services/origin.service.ts';
import { MaritalStatusService } from '../services/marital-status.service.ts';
import { EducationLevelService } from '../services/education-level.service.ts';
import { MemberTypeService } from '../services/member-type.service.ts';
import { PositionService } from '../services/position.service.ts';
import { MinistryService } from '../services/ministry.service.ts';
import { extractLookupList } from '../utils/people-api.util.ts';
import type { ILookupItem } from '../interfaces/people.interface.ts';

/**
 * Serviços das listas de apoio (lookups) do formulário de pessoas,
 * indexados pela chave correspondente em `lookups`.
 */
const lookupServices = {
  genders: GenderService(),
  categories: PeopleCategoryService(),
  origins: OriginService(),
  maritalStatuses: MaritalStatusService(),
  educationLevels: EducationLevelService(),
  memberTypes: MemberTypeService(),
  positions: PositionService(),
  ministries: MinistryService(),
};

export type PeopleLookupKey = keyof typeof lookupServices;
export type PeopleLookups = Record<PeopleLookupKey, ILookupItem[]>;

/**
 * Centraliza o carregamento das listas de apoio (gêneros, categorias, origens, etc.)
 * que alimentam os selects do formulário de pessoas.
 *
 * As listas são carregadas uma única vez (guarda interna `loaded`); chamadas
 * subsequentes a `loadLookups` retornam imediatamente.
 */
export function usePeopleLookups() {
  const lookups = reactive<PeopleLookups>({
    genders: [],
    categories: [],
    origins: [],
    maritalStatuses: [],
    educationLevels: [],
    memberTypes: [],
    positions: [],
    ministries: [],
  });

  const loaded = ref(false);

  /** Carrega todas as listas de apoio em paralelo (no-op se já carregadas). */
  const loadLookups = async () => {
    if (loaded.value) return;

    const [
      genders,
      categories,
      origins,
      maritalStatuses,
      educationLevels,
      memberTypes,
      positions,
      ministries,
    ] = await Promise.all([
      lookupServices.genders.getAll(),
      lookupServices.categories.getAll(),
      lookupServices.origins.getAll(),
      lookupServices.maritalStatuses.getAll(),
      lookupServices.educationLevels.getAll(),
      lookupServices.memberTypes.getAll(),
      lookupServices.positions.getAll(),
      lookupServices.ministries.getAll(),
    ]);

    lookups.genders = extractLookupList(genders.data);
    lookups.categories = extractLookupList(categories.data);
    lookups.origins = extractLookupList(origins.data);
    lookups.maritalStatuses = extractLookupList(maritalStatuses.data);
    lookups.educationLevels = extractLookupList(educationLevels.data);
    lookups.memberTypes = extractLookupList(memberTypes.data);
    lookups.positions = extractLookupList(positions.data);
    lookups.ministries = extractLookupList(ministries.data);

    loaded.value = true;
  };

  return { lookups, loaded, loadLookups };
}
