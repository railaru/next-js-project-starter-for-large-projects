import React from 'react';
import Link from 'next/link';
import { TRANSLATION_NAMESPACES, i18n } from 'next-18next.config';

import { ROUTES } from '../constants/routes';
import { E2E_TEST_DOM_ELEMENTS } from '../constants/e2e';
import Basic from '../components/layouts/Basic';
import { Locales } from '../models/localization';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Home() {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.HEAD,
    TRANSLATION_NAMESPACES.COMMON,
  ]);

  return (
    <Basic
      head={{
        title: t(`${TRANSLATION_NAMESPACES.HEAD}:homepage`),
      }}
    >
      <div className="flex justify-center items-center h-screen">
        <Link href={ROUTES.EXAMPLES}>
          <a data-test={E2E_TEST_DOM_ELEMENTS.EXAMPLES_LINK}>
            {t(`${TRANSLATION_NAMESPACES.COMMON}:examples_page`)}
          </a>
        </Link>
      </div>
    </Basic>
  );
}

export async function getServerSideProps({ locale }: { locale: Locales }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        [TRANSLATION_NAMESPACES.HEAD, TRANSLATION_NAMESPACES.COMMON],
        {
          i18n,
        }
      )),
    },
  };
}

export default Home;
