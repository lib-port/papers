import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TagsListInline from '@theme/TagsListInline';
import EditMetaRow from '@theme/EditMetaRow';

export default function DocItemFooter(): ReactNode {
  const {metadata: {editUrl, tags, slug, lastUpdatedAt}} = useDoc();
  const paperLastUpdatedAt = slug === '/' ? undefined : lastUpdatedAt;
  if (!tags.length && !editUrl && paperLastUpdatedAt == null) return null;
  return (
    <footer className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}>
      {tags.length > 0 && (
        <div className={clsx('row margin-top--sm', ThemeClassNames.docs.docFooterTagsRow)}>
          <div className="col"><TagsListInline tags={tags} /></div>
        </div>
      )}
      {(editUrl || paperLastUpdatedAt != null) && (
        <EditMetaRow
          className={clsx('margin-top--sm', ThemeClassNames.docs.docFooterEditMetaRow)}
          editUrl={editUrl}
          lastUpdatedAt={paperLastUpdatedAt}
          lastUpdatedBy={undefined}
        />
      )}
    </footer>
  );
}
