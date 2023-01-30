import Airtable from "airtable";

export const airtableDataBase = new Airtable({
  apiKey:process.env.AIRTABLE_API_KEY})
  .base(process.env.AIRTABLE_DATA_BASE);

