// .env support
const dotenv = require('dotenv')
dotenv.config()

// set up Notion stuff
const Client = require('@notionhq/client').Client
const notion = new Client({ auth: process.env.NOTION_KEY })
const databaseId = process.env.NOTION_DATABASE_ID

// Set up the function
async function addItem(text) {
  try {
    await notion.request({
      path: "pages",
      method: "POST",
      body: {
        parent: { database_id: databaseId },
        properties: {
          title: {
            title:[
              {
                "text": {
                  "content": text
                }
              }
            ]
          }
        }
      },
    })
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

// Call the function
addItem("New item")