const axios = require('axios');
const cheerio = require('cheerio');
const Language = require('../models/language'); // Import the Language model

// const parseTiobeHTML = (html) => {
//     const $ = cheerio.load(html); // Load the HTML into Cheerio for parsing
//     const languages = [];   // Initialize an array to hold the language data
//     $('#top20 tbody tr').each((index, element) => {
//         const ranking = parseInt($(element).find('td').eq(0).text().trim()); // Get the ranking from the first column and convert it to an integer
//         const pLang = $(element).find('td').eq(1).text().trim(); // Get the programming language name from the second column and trim whitespace
//         const imagePath = $(element).find('td').eq(1).find('img').attr('src'); // Get the image path for the language
//         languages.push({ ranking, pLang, imagePath }); // Add the language data to the array
//         const language = new Language({ ranking, pLang, imagePath }); // Create a new Language document using the Language model
//         language.save(); // Save the language document to the database
//     });
//     return languages;
// };

const parseTiobeHTML = (html) => {
    const $ = cheerio.load(html);
    const allRows = $('.table-top20 tbody tr');
    const rankingArray =[];
    allRows.each((index, element) => {
        const ranking = parseInt($(element).find('td').eq(0).text().trim()); // Get the ranking from the first column and convert it to an integer
        //.eq(0) selects the first td element, which contains the ranking. The text() method retrieves the text content of that td element, and trim() removes any leading or trailing whitespace. Finally, parseInt() converts the resulting string into an integer.
        const pLang = $(element).find('td').eq(4).text().trim(); // Get the programming language name from the second column and trim whitespace
        //.eq(4) selects the fifth td element, which contains the programming language name. The text() method retrieves the text content of that td element, and trim() removes any leading or trailing whitespace.
        const imagePath = $(element).find('td').eq(3).find('img').attr('src'); // Get the image path for the language
        //.eq(3) selects the fourth td element, which contains the programming language name. The find('img') method searches for an img element within that td element, and attr('src') retrieves the value of the src attribute of that img element, which is the path to the image.
        rankingArray.push({ ranking, pLang, imagePath }); // Add the language data to the array
        // Save the language data to the database
        const language = new Language({ ranking, pLang, imagePath }); // Create a new Language document using the Language model
        console.log(`Parsed language: ${pLang} with ranking: ${ranking} and image path: ${imagePath}`); // Log the parsed language data
        console.log(`Saving language: ${pLang} with ranking: ${ranking} and image path: ${imagePath}`); // Log the language data being saved
        language.save(); // Save the language document to the database
    });
    return rankingArray;    // Return the array of language data
};






// Function to fetch TIOBE rankings and save them to the database
// async function getTiobeRankings(req, res) {
//     try {
//         const response = await axios.get('https://www.tiobe.com/tiobe-index/'); // Fetch the TIOBE index page
//         const html = response.data; // Get the HTML content of the page
//         const $ = cheerio.load(html); // Load the HTML into Cheerio for parsing

//         // in this section we are selecting the table with id 'top20' and iterating through each row to extract the ranking, programming language name, and image path. We then save this data to the database using the Language model and send it as a JSON response.
//         const languages = []; // Initialize an array to hold the language data  
//         $('#top20 tbody tr').each((index, element) => { // Select each row in the top 20 table
//             const ranking = parseInt($(element).find('td').eq(0).text().trim()); // Get the ranking from the first column and convert it to an integer
//             const pLang = $(element).find('td').eq(1).text().trim(); // Get the programming language name from the second column and trim whitespace    
//             const imagePath = $(element).find('td').eq(1).find('img').attr('src'); // Get the image path for the language   
//             languages.push({ ranking, pLang, imagePath }); // Add the language data to the array
//             // Save the language data to the database
//             const language = new Language({ ranking, pLang, imagePath }); // Create a new Language document using the Language model
//             language.save(); // Save the language document to the database
//         });

//         res.json(languages); // Send the language data as a JSON response
//     } catch (error) {
//         console.error('Error fetching TIOBE rankings:', error); 
//         res.status(500).json({ error: 'Failed to fetch TIOBE rankings' }); // Send an error response if the fetch fails
//     }
// }

// module.exports = { getTiobeRankings }; // Export the getTiobeRankings function for use in other modules