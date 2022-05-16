# Description

This app features a grid of dummy StarWars planets as well as a search tool. A JSON file is used instead of a real API call. The full description can be found in the document.

## Setup

The setup is easy, you will be up and running in a couple of steps

1. Clone this repo
2. Open your terminal and navigate to the folder
3. Run `npm i`
4. Run `npm start` and it should open the app automatically in your browswer. You could also visit [http://localhost:3000](http://localhost:3000) or whatever URL shows up in your terminal. It's going to start with `http:localhost`, but could be suffixed by any open port in your local machine.

## Testing

I wrote the code in TDD style (my preferred method these days), so please run the test and look over the test code, because some effort was put into it 😊 . Test coverage is 93.63 percent, and the only code that isn't covered is mostly code that couldn't be covered or isn't very valuable to test. To run the test, run `npm test` in your terminal or run `npm test -- --coverage --watchAll=false` to check code coverage without watching for file changes.

## State Management

The majority of the state can be managed locally, within the component, but I used Context API to make things easier to "follow." In a larger application, I would recommend Redux so that developers can quickly learn how the data flows in the application. To assist developers in getting under the flow quickly, I have attached a data-flow drawing in both .dio (which contains the old and latest design) and.png formats (which has only the latest design).

## Pagination

Pagination implementation is simple, and it would require some extra logic in order to improve the UX for larger number set.

## UI Design

The UI design is moderate and not overly sophisticated. Collaboration with a designer would be beneficial in improving the application's UI and UX.
Some UI states were left out, such as Sort and Filter selection, hover over buttons, sort and filter buttons, and so on.

## Page Responsiveness

The app is moderately responsive, but as with other aspects of the UI design, collaboration with a designer will be required to perfect it.
