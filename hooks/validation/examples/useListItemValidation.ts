import * as yup from 'yup';
import { TRANSLATION_NAMESPACES } from '../../../next-18next.config';
import { useTranslation } from 'next-i18next';

const { COMMON } = TRANSLATION_NAMESPACES;

export function useListItemValidation() {
  const { t } = useTranslation([COMMON]);

  const minimumNumberOfCharacters = 4;

  const minimumTranslation = t(`${COMMON}:minimum`);
  const charactersTranslation = t(`${COMMON}:characters`);
  const fieldIsRequiredTranslation = t(`${COMMON}:field_is_required`);

  return yup.object({
    title: yup
      .string()
      .min(
        minimumNumberOfCharacters,
        `${minimumTranslation} ${minimumNumberOfCharacters} ${charactersTranslation}`
      )
      .required(fieldIsRequiredTranslation),
    description: yup
      .string()
      .min(
        minimumNumberOfCharacters,
        `${minimumTranslation} ${minimumNumberOfCharacters} ${charactersTranslation}`
      )
      .required(fieldIsRequiredTranslation),
  });
}
