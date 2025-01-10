import { Client } from '@notionhq/client';

const notion = new Client({
  auth: import.meta.env.VITE_NOTION_TOKEN,
});

interface NotionVuln {
  id: string;
  title: string;
  url: string;
  description: string;      // "Long Text" en Notion
  creationDate: string;     // "Creation Date"
  lastUpdated: string;      // "Last Updated"
  status: string;           // "Status"
}

/**
 * Devuelve las 10 vulnerabilidades más recientes
 */
export async function fetchLastTenVulnerabilities(): Promise<NotionVuln[]> {
  const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID || '';

  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'Creation Date',
        direction: 'descending',
      },
    ],
    page_size: 10,
  });

  return mapNotionResponse(response.results);
}

/**
 * Devuelve todas las vulnerabilidades (para la sección History)
 */
export async function fetchAllVulnerabilities(): Promise<NotionVuln[]> {
  const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID || '';
  let results: any[] = [];
  let hasMore = true;
  let startCursor: string | undefined = undefined;

  while (hasMore) {
    const resp = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Creation Date',
          direction: 'descending',
        },
      ],
      start_cursor: startCursor,
      page_size: 50,
    });
    results = [...results, ...resp.results];
    hasMore = resp.has_more;
    startCursor = resp.next_cursor || undefined;
  }

  return mapNotionResponse(results);
}

/**
 * Mapea la respuesta "raw" de Notion a nuestro modelo NotionVuln
 */
function mapNotionResponse(rawPages: any[]): NotionVuln[] {
  return rawPages.map((page: any) => {
    const props = page.properties;

    // Toma las propiedades con un approach condicional
    // Title
    const titleObj = props["Title"] && props["Title"].title
      ? props["Title"].title
      : [];
    const title = titleObj[0] && titleObj[0].plain_text
      ? titleObj[0].plain_text
      : '';

    // URL
    const urlObj = props["URL"] && props["URL"].url
      ? props["URL"].url
      : '';
    const url = urlObj;

    // Long Text -> description
    const longTextArr = props["Long Text"] && props["Long Text"].rich_text
      ? props["Long Text"].rich_text
      : [];
    const description = longTextArr[0] && longTextArr[0].plain_text
      ? longTextArr[0].plain_text
      : '';

    // Creation Date
    const creationDateObj = props["Creation Date"] && props["Creation Date"].date
      ? props["Creation Date"].date
      : null;
    const creationDate = creationDateObj && creationDateObj.start
      ? creationDateObj.start
      : '';

    // Last Updated
    const lastUpdatedObj = props["Last Updated"] && props["Last Updated"].date
      ? props["Last Updated"].date
      : null;
    const lastUpdated = lastUpdatedObj && lastUpdatedObj.start
      ? lastUpdatedObj.start
      : '';

    // Status
    const statusObj = props["Status"] && props["Status"].select
      ? props["Status"].select
      : null;
    const status = statusObj && statusObj.name ? statusObj.name : '';

    return {
      id: page.id,
      title,
      url,
      description,
      creationDate,
      lastUpdated,
      status
    };
  });
}
