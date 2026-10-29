import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import {
  useDoc,
  useDocsData,
  useDocsVersion,
} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';

const titleCollator = new Intl.Collator('en-GB', {sensitivity: 'base'});

export default function PaperList(): ReactNode {
  const {metadata} = useDoc();
  const version = useDocsVersion();
  const docsData = useDocsData(version.pluginId);
  const dates = usePluginData('paper-update-dates') as Record<string, Record<string, Record<string, number | null>>>;
  const versionDates = dates[version.pluginId]?.[version.version] ?? {};
  const routes = docsData.versions.find(
    (candidate) => candidate.name === version.version,
  );

  if (!routes) {
    throw new Error(`Document routes are unavailable for version ${version.version}.`);
  }

  const papers = routes.docs
    .flatMap((route) => {
      const doc = version.docs[route.id];

      if (!doc || doc.id === metadata.id || route.unlisted) {
        return [];
      }

      return [{...doc, path: route.path}];
    })
    .sort(
      (a, b) => {
        const aDate = versionDates[a.id] ?? null;
        const bDate = versionDates[b.id] ?? null;
        if (aDate === null && bDate !== null) return 1;
        if (aDate !== null && bDate === null) return -1;
        return (
          (bDate ?? 0) - (aDate ?? 0) ||
          titleCollator.compare(a.title, b.title) ||
          a.id.localeCompare(b.id, 'en-GB')
        );
      },
    );

  if (papers.length === 0) {
    return <p>No papers are available yet.</p>;
  }

  return (
    <>
      {papers.map((paper) => (
        <section key={paper.id}>
          <Heading as="h2" id={paper.id}>
            <Link to={paper.path}>{paper.title}</Link>
          </Heading>
          {paper.description && <p>{paper.description}</p>}
        </section>
      ))}
    </>
  );
}
