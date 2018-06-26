/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined and not empty', function() {
            //
            allFeeds.forEach(function(item) {
                //passes this check if url is defined
                expect(item.url).toBeDefined();
                //passes this check if url is not empty
                expect(item.url).not.toBe({});
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined and not empty', function() {
            allFeeds.forEach(function(item) {
                //passes this check if name is defined
                expect(item.name).toBeDefined();
                //passes this check if name is not empty
                expect(item.name.length).not.toEqual(0);
            });
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('menu', function() {
        //menu element
        let menu = document.body;

        //menu Icon
        let menuIcon = document.querySelector('.icon-list');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        //passes if the 'menu' is hidden by default
        it('hidden by default', function() {
            expect(menu.className).toEqual('menu-hidden');
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when menu icon is clicked', function() {
            //clicking the menu icon to show the menu
            menuIcon.click();

            //menu shold not be hidden
            expect(menu.className).not.toEqual('menu-hidden');

            //click the menu icon again to hide it
            menuIcon.click();

            //menu should be hidden
            expect(menu.className).toEqual('menu-hidden');
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //these varibales are used to verify that there is at least one entry in the feed.
        let numberOfEntryElementsInFeedContainer;

        beforeEach(function(done) {
            loadFeed(0, function() {
                numberOfEntryElementsInFeedContainer = $('.feed .entry').length;
                done();
            });
        });

        //when async is 'done', 'it' will test it
        it('there is at least a single .entry element within the .feed container.', function(done) {
            // at least a single, .entry element within the feed container
            //lenght of entry class elements inside feed container is greater than zero
            expect(numberOfEntryElementsInFeedContainer).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        //variable that will contain the contents of the first and second feeds loaded
        let firstFeed,
            secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                //store the first feed's content into a variable for later comparision
                firstFeed = $('.feed').html();
                done();
            });
        });

        it('should change feed content after loading feed', function(done) {
            loadFeed(1, function() {
                //store this newly load feed's content into a variable for later comparision
                secondFeed = $('.feed').html();
                //compare the whole first loaded feed's content to the second loaded feed's
                //content
                //if they are the same then a new feed was most likely not loaded
                expect(firstFeed).not.toEqual(secondFeed);
                done();
            });
        });
    });
}());