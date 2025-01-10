// api/getVulnerabilities.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';

/**
 * Este endpoint serverless maneja las peticiones al API de Notion,
 * evitando problemas de CORS y protegiendo el token de Notion.
 */

// 1. Inicializamos el cliente Notion usando la variable de entorno
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID; 

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Habilitamos CORS para que el front-end (localhost o tu dominio) pueda llamar sin error
  // Ajusta orígenes si deseas más seguridad
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Soporte para OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Llamamos a Notion con la base de datos configurada en la variable
  try {
    const response = await notion.databases.query({
      database_id: databaseId || '',
      // Aquí puedes meter "sorts", "page_size", "filters", etc.
      sorts: [
        { property: "Creation Date", direction: "descending" }
      ],
      page_size: 10,
    });

    // 3. Retornamos la data parseada (o sin parsear)
    return res.status(200).json({
      results: response.results,
      has_more: response.has_more,
      next_cursor: response.next_cursor
    });
  } catch (error) {
    // Si algo falla, capturamos el error y enviamos un 500
    console.error("Error en getVulnerabilities:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}