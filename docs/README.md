Nick Mbugua
NASA Data API Image Gallery

This is my NASA API Image gallery With the description of the image. 

I am making a website that takes data from the NASA API’s and outputs and get it stylized with CSS.
The first page is the Astronomy Picture of the Day (APOD), I would like to have APOD come up automatically when the page is loaded.  Have the user be able to search the APOD from previous days.
The second is the NASA Image and Video Library. I would like to make a search area where a user can enter a keyword and have it search for any images tied to the keyword and put them in a gallery grid with a description if there is one.
For my 'in scope', I’d like to get the APOD working and stylized, as well as an image search (without the description but maybe added if it’s easily done ).
For my 'out of scope', I’d like to add the description to the image API if not done.  And not have a limit to the amount of pictures in the gallery grid. Add an API for the Mars Rover Photos. Have the user be able to search the APOD from previous days.


Rough estimate.

1.      Trello, about a 5 -10 minutes per day

2.      Wireframes about 1-2 hours

3.      HTML 2-4 Hours

4.      CSS 4-6+ Hours

5.      JS +6 Hours per day for at least 4-5days

6.      Test +6 Hours per day for at least 2-3days
------------------------------------------------------------

I didn't have any major unintuitive features. One feature that I found difficult to do was to subtract the date that wouldn't mess up when going to the next month or year. I originally kept getting I originally kept getting the wrong date by day. This is this is how I changed the date by one day

    console.log(result.date); // current date from the API ex..2022-05-17
    let dayCount = new Date(result.date.replace(/-/g, '\/')); // Without the Replace() console.logging this would show the previous date ex Mon May 16 2022 18:00:00 GMT-0600 (Mountain Daylight Time).
    // console.log(dayCount);// shows the date in ex.. Tue May 17 2022 00:00:00 GMT-0600 (Mountain Daylight Time) and not 2022-05-17 anymore.
    dayCount.setUTCDate(dayCount.getUTCDate() - 1); // Subtract by one day.
    //console.log(dayCount); // new date ex.. Mon May 16 2022 00:00:00 GMT-0600 (Mountain Daylight Time)
    let newDay= dayCount.toISOString(); // Changes the date to 2022-05-16T06:00:00.000Z method returns a string in simplified extended ISO format
    //console.log(newDay);
     newDay= dayCount.toISOString().substring(0,10); // Cut the date down back to the YYYY-MM-Format ex...2022-05-16
    //console.log(newDay);


The major problem I encountered was in the APOD page, where my click event listener for the button for either day, would double click or triple click and instead of changing days it looked like it would try to select the next day but then go back to the same day that started. The solution I found was to use an onclick event which did indeed fix the problem but as I discussed with James, using event listener would be the better choice. Blue solution with the event listener was to clone the button before and replace it with the existing button and then to declare the clone to the existing button. Is this seemed to stop the double click event. 
const clone = lastButtonApod.cloneNode(true);
    lastButtonApod.parentNode.replaceChild(clone, lastButtonApod);
    lastButtonApod = clone;
    lastButtonApod.addEventListener

---

Within the last day I was able to fix most of my bugs. Though I still do have some bugs, one of them being in a dynamic response anything between 660 pixels and 540 pixels my background image gets cut off and so does the header. The other bug I that I did not have time to get around to was the alt in the image, the title for the alt seems to get cut off all other words except the first word.