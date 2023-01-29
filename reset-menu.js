'use strict';

import {Client} from "@notionhq/client"

const notion = new Client({auth: process.env.NOTION_KEY})

const databaseId = process.env.NOTION_DATABASE_ID

async function cleanMenu(text) {

        const pages = await notion.databases.query({database_id: databaseId})

        await Promise.all(
            pages.results.map(page => notion.pages.update({
                    page_id: page.id,
                    properties: {
                        Recette: {
                            rich_text: [
                                {
                                    text: {
                                        content: ''
                                    }
                                }
                            ]
                        },
                        URL: {
                            rich_text: [
                                {
                                    text: {
                                        content: ''
                                    }
                                }
                            ]
                        },
                        Tags: {
                            select: {
                                name: '👫'
                            }
                        },
                    }
                })
            )
        );
}


export const reset_menu = async (event) => {

    try {
        await cleanMenu("Yurts in Big Sur, California")

        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    message: 'Menu reseted',
                    input: event,
                },
                null,
                2
            ),
        };

    } catch (e) {
        return {
            statusCode: e.statusCode,
            body: JSON.stringify(
                {
                    message: e.message,
                    input: event,
                },
                null,
                2
            ),
        };
    }


};
