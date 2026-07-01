import { GoogleAuth } from 'google-auth-library';
import fetch from 'node-fetch';

async function main() {
  const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  try {
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    const spreadsheetId = '1EtwmDT0nwUhMTXTPTQsHRdWWi-ehLgib3dBwpXUp0Nc';
    
    // First, let's get spreadsheet metadata to see sheet names
    const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}`;
    console.log('Fetching metadata from:', metadataUrl);
    
    const metaResponse = await fetch(metadataUrl, {
      headers: {
        'Authorization': `Bearer ${token.token}`,
      }
    });

    if (!metaResponse.ok) {
      const errText = await metaResponse.text();
      throw new Error(`Failed to fetch metadata: ${metaResponse.status} ${errText}`);
    }

    const metadata = await metaResponse.json();
    console.log('Sheet metadata:', JSON.stringify(metadata, null, 2));

    // For each sheet, let's dump the first 100 rows
    for (const sheet of metadata.sheets) {
      const sheetName = sheet.properties.title;
      console.log(`\n--- Data for sheet: ${sheetName} ---`);
      const rangeUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}!A1:Z100`;
      
      const valResponse = await fetch(rangeUrl, {
        headers: {
          'Authorization': `Bearer ${token.token}`,
        }
      });
      
      if (valResponse.ok) {
        const valData = await valResponse.json();
        console.log(JSON.stringify(valData.values, null, 2));
      } else {
        console.error(`Failed to fetch data for sheet ${sheetName}:`, valResponse.status);
      }
    }
  } catch (error) {
    console.error('Error reading sheet:', error);
  }
}

main();
